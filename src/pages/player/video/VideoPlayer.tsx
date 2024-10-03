import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExpand } from '@fortawesome/free-solid-svg-icons'; // Import fullscreen icon
import floatingScreen from '../../../assets/floatingScreen.png';

interface VideoPlayerProps {
  videoUrl: string;
  onBack: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // For the custom progress bar
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  // Set up HLS for .m3u8 files
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
          console.log('Video is ready to play');
          setDuration(formatTime(videoRef.current?.duration || 0));
        });

        hlsRef.current = hls;
      } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari or browsers with native HLS support
        videoRef.current.src = videoUrl;
      }
    };

    if (videoUrl && videoRef.current) {
      initHls();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoUrl]);

  // Helper function to format time (e.g., 1:05)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Toggle play/pause state
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Update progress bar and current time
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
      setCurrentTime(formatTime(currentTime));
    }
  };

  // Seek video using custom progress bar
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  // Function to enable Picture-in-Picture (PiP)
  const handlePictureInPicture = () => {
    if (videoRef.current) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture().catch((error) => {
          console.error("Failed to exit PiP:", error);
        });
      } else {
        videoRef.current.requestPictureInPicture().catch((error) => {
          console.error("Failed to enter PiP:", error);
        });
      }
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
    <div className="relative bg-black h-full w-full">
      {/* The video player */}
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        controls={false}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(formatTime(videoRef.current?.duration || 0))}
        style={{ objectFit: 'contain', minHeight: '40vh' }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Back button */}
      <div className="absolute top-0 left-0 p-4 z-10">
        <button onClick={onBack} className="text-white">
          <FontAwesomeIcon icon={faArrowLeft} size="1x" />
        </button>
      </div>

      {/* Custom Play/Pause Button */}
      <div className="absolute inset-0 flex justify-center items-center">
        <button onClick={handlePlayPause} className="text-white/50 text-xl">
          {isPlaying ? '❚❚' : '►'}
        </button>
      </div>

      {/* Custom Progress Bar and Fullscreen button */}
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

      {/* Picture-in-Picture button */}
      <div className="absolute top-0 right-0 p-4 z-10">
        <button onClick={handlePictureInPicture} className="text-white">
          <img src={floatingScreen} alt="PiP" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;