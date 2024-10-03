import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExpand } from '@fortawesome/free-solid-svg-icons';
import floatingScreen from '../../../assets/floatingScreen.png';

interface Episode {
  episode_id: number | null;
  episode_name: string;
  play_url: string;
}

interface MovieDetail {
  name: string;
  area: string;
  year: string;
  score: string;
  content: string;
  cover: string;
  type_name: string;
  tags: { name: string }[];
  comments_count: string;
  popularity_score: number;
  play_from: {
    name: string;
    code: string;
    list: Episode[];
  }[];
}

interface VideoPlayerProps {
  videoUrl: string;
  onBack: () => void;
  movieDetail: MovieDetail;
  selectedEpisode?: Episode | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onBack, movieDetail, selectedEpisode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [controlsVisible, setControlsVisible] = useState(true);

  const STORAGE_KEY = 'watchHistory'; // Main key for storing watch history

  // Helper function to format time (e.g., 1:05)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Save the movie progress when back button or episode change happens
  const saveProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime; // Get the correct time
      const savedHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

      if (!savedHistory[movieDetail.name]) {
        savedHistory[movieDetail.name] = {};
      }

      savedHistory[movieDetail.name][`episode_${selectedEpisode?.episode_id}`] = {
        progressTime: currentTime,
        movieDetail: movieDetail
      };

      console.log('Saving progress:', currentTime); // Log to verify
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedHistory));
    }
  };

  // Load saved progress if available
  const loadProgress = () => {
    const savedHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (savedHistory[movieDetail.name] && savedHistory[movieDetail.name][`episode_${selectedEpisode?.episode_id}`]) {
      const savedTime = savedHistory[movieDetail.name][`episode_${selectedEpisode?.episode_id}`].progressTime;
      if (videoRef.current && savedTime) {
        console.log('Resuming from:', savedTime);
        videoRef.current.currentTime = savedTime || 0;
      }
    }
  };

  // Set up HLS for .m3u8 files and handle auto play with progress loading
  useEffect(() => {
    const initHls = () => {
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current as HTMLMediaElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setDuration(formatTime(videoRef.current?.duration || 0));

          // Load the saved progress after HLS manifest is parsed
          loadProgress();

          // Ensure video plays after it can play
          videoRef.current?.addEventListener('canplay', () => {
            if (videoRef.current) {
              videoRef.current.play().then(() => {
                console.log('Video started playing');
                setIsPlaying(true);
              }).catch((error) => {
                console.error('Video play failed:', error);
              });
            }
          });
        });

        hlsRef.current = hls;
      } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoUrl;
        videoRef.current?.addEventListener('canplay', () => {
          loadProgress();
          videoRef.current?.play().then(() => {
            console.log('Video started playing');
            setIsPlaying(true);
          }).catch((error) => {
            console.error('Video play failed:', error);
          });
        });
      }
    };

    if (videoUrl && videoRef.current) {
      initHls();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      // Save progress when switching episodes or unmounting the component
      saveProgress();
    };
  }, [videoUrl, selectedEpisode]); // Re-run when selectedEpisode changes

  // Update progress bar without saving every second
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
      setCurrentTime(formatTime(currentTime));
    }
  };

  // Save progress on back button click
  const handleBack = () => {
    saveProgress();
    onBack();
  };

  // Toggle play/pause state
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Video play failed:', error);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        saveProgress(); // Save progress on pause
      }
    }
  };

  // Seek video using custom progress bar
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  // Fullscreen functionality
  const handleFullscreenToggle = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      className="relative bg-black h-full w-full"
      onMouseMove={() => setControlsVisible(true)} // Show controls on mouse move or touch
      onTouchStart={() => setControlsVisible(true)} // Show controls on touch
    >
      {/* The video player */}
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        controls={false}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(formatTime(videoRef.current?.duration || 0))}
        style={{ objectFit: 'contain', minHeight: '40vh' }}
        autoPlay // Autoplay the video
      >
        Your browser does not support the video tag.
      </video>

      {/* Back button */}
      <div className="absolute top-0 left-0 p-4 z-10">
        <button onClick={handleBack} className="text-white">
          <FontAwesomeIcon icon={faArrowLeft} size="1x" />
        </button>
      </div>

      {/* Custom Play/Pause Button */}
      {controlsVisible && (
        <div className="absolute inset-0 flex justify-center items-center">
          <button onClick={handlePlayPause} className="text-white/60 text-3xl">
            {isPlaying ? '❚❚' : '►'}
          </button>
        </div>
      )}

      {/* Custom Progress Bar and Fullscreen button */}
      {controlsVisible && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-between items-center text-white mb-2">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <input
              type="range"
              className="w-full h-2 bg-gray-600 cursor-pointer"
              value={progress}
              onChange={handleProgressChange}
              style={{
                background: `linear-gradient(to right, #F54100 ${progress}%, gray 0%)`
              }}
            />
            {/* Fullscreen button */}
            <button onClick={handleFullscreenToggle} className="ml-2 text-white">
              <FontAwesomeIcon icon={faExpand} size="lg" />
            </button>
          </div>
        </div>
      )}

      {/* Picture-in-Picture button */}
      <div className="absolute top-0 right-0 p-4 z-10">
        <button className="text-white">
          <img src={floatingScreen} alt="PiP" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;