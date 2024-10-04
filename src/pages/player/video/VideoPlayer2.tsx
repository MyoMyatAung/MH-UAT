import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faExpand,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import floatingScreen from "../../../assets/floatingScreen.png";

// Your models (kept as is)
interface Episode {
  episode_id: number | null;
  episode_name: string;
  play_url: string;
  from_code: string;
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
    total: number | null;
    tips: string;
  }[];
}

interface VideoPlayerProps {
  videoUrl: string;
  onBack: () => void;
  movieDetail: MovieDetail;
  selectedEpisode?: Episode | null;
}

// Helper function to format time (e.g., 1:05) (unchanged)
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Detect if the device is running iOS (iPhone, iPad)
const isIOS = () => {
  return true;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onBack,
  movieDetail,
  selectedEpisode,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const STORAGE_KEY = "watchHistory"; // Main key for storing watch history

  // Save progress logic (unchanged)
  const saveProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const savedHistory = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      );
      if (!savedHistory[movieDetail.name]) {
        savedHistory[movieDetail.name] = {};
      }
      savedHistory[movieDetail.name][`episode_${selectedEpisode?.episode_id}`] =
        {
          progressTime: currentTime,
        };
      savedHistory[movieDetail.name]["movieDetail"] = { movieDetail };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedHistory));
    }
  };

  // Load progress logic (unchanged)
  const loadProgress = () => {
    const savedHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (
      savedHistory[movieDetail.name] &&
      savedHistory[movieDetail.name][`episode_${selectedEpisode?.episode_id}`]
    ) {
      const savedTime =
        savedHistory[movieDetail.name][`episode_${selectedEpisode?.episode_id}`]
          .progressTime;
      if (videoRef.current && savedTime) {
        videoRef.current.currentTime = savedTime || 0;
      }
    }
  };

  // Set up HLS or native iOS playback (with minimal change)
  useEffect(() => {
    if (videoUrl && videoRef.current) {
      // Use HLS.js for non-iOS devices
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current as HTMLMediaElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setDuration(formatTime(videoRef.current?.duration || 0));
          loadProgress();
          const canPlayHandler = () => {
            setIsBuffering(true);
            videoRef.current?.play().then(() => {
              setIsPlaying(true);
              setIsBuffering(false);
            });
          };
          videoRef.current?.addEventListener("canplay", canPlayHandler);
        });

        hlsRef.current = hls;
      }
    }

    return () => {
      saveProgress(); // Save progress on unmount
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoUrl, selectedEpisode]);

  // Handle hiding controls after 3 seconds of inactivity (unchanged)
  const hideControls = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  };

  // Handle showing controls on interaction (unchanged)
  const showControls = () => {
    setControlsVisible(true);
    hideControls(); // Start timeout to hide again
  };

  // Update progress bar without saving every second (unchanged)
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
      setCurrentTime(formatTime(currentTime));
    }
  };

  // Save progress on back button click (unchanged)
  const handleBack = () => {
    saveProgress();
    onBack();
  };

  // Toggle play/pause state (unchanged)
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        setIsBuffering(true); // Show buffering icon while resuming
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsBuffering(false); // Hide buffering icon after resuming
          })
          .catch((error) => {
            setIsBuffering(false); // Hide buffering icon on error
          });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        saveProgress(); // Save progress on pause
      }
    }
  };

  // Seek video using custom progress bar (unchanged)
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime =
        (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  // Fullscreen functionality (unchanged)
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
      onMouseMove={showControls} // Show controls on mouse move or touch
      onTouchStart={showControls} // Show controls on touch
    >
      <div className={`top-0 left-0 p-2 z-10 sticky`}>
        <button onClick={handleBack} className="text-white">
          <FontAwesomeIcon icon={faArrowLeft} size="1x" />
        </button>
      </div>
      {/* Use default controls for iOS, and HLS.js for other devices */}
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        controls={isIOS()} // Only show native controls on iOS
        playsInline // Ensure iOS plays inline
        webkit-playsinline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() =>
          setDuration(formatTime(videoRef.current?.duration || 0))
        }
        style={{ objectFit: "contain", minHeight: "40vh" }}
        autoPlay
      >
        Your browser does not support the video tag.
      </video>

      <>
        {/* <div className={`absolute top-0 left-0 p-2 z-10`}>
            <button onClick={handleBack} className="text-white">
              <FontAwesomeIcon icon={faArrowLeft} size="1x" />
            </button>
          </div> */}

        {/* Buffering Icon */}
        {isBuffering && (
          <div className="absolute inset-0 flex justify-center items-center">
            <FontAwesomeIcon
              icon={faSpinner}
              size="1x"
              spin
              className="text-playerNavigator"
            />
          </div>
        )}
      </>
      {/* Show your custom UI controls for non-iOS devices */}
      {!isIOS() && (
        <>
          {/* Back button */}
          <div className={`absolute top-0 left-0 p-4 z-10`}>
            <button onClick={handleBack} className="text-white">
              <FontAwesomeIcon icon={faArrowLeft} size="1x" />
            </button>
          </div>

          {/* Buffering Icon */}
          {isBuffering && (
            <div className="absolute inset-0 flex justify-center items-center">
              <FontAwesomeIcon
                icon={faSpinner}
                size="1x"
                spin
                className="text-playerNavigator"
              />
            </div>
          )}

          {/* Custom Play/Pause Button */}
          {controlsVisible && (
            <div className="absolute inset-0 flex justify-center items-center">
              <button
                onClick={handlePlayPause}
                className="text-white/60 text-3xl"
              >
                {!isBuffering && (isPlaying ? "❚❚" : "►")}
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
                    background: `linear-gradient(to right, #F54100 ${progress}%, gray 0%)`,
                  }}
                />
                <button
                  onClick={handleFullscreenToggle}
                  className="ml-2 text-white"
                >
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
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
