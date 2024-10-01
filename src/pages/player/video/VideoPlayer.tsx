import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoPlayer: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  // Function to handle back navigation
  const handleBackClick = () => {
    navigate(-1);
  };

  // Function to handle full-screen changes
  const handleFullscreenChange = () => {
    const isFullscreenMode =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||  // Added 'as any' to safely handle webkit-prefixed property
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement;

    setIsFullscreen(!!isFullscreenMode);
  };

  // Handle speed changes when in full-screen mode
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  useEffect(() => {
    // Attach event listeners for full-screen change
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  return (
    <div className="relative bg-black">
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 z-10 text-white"
        onClick={handleBackClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Video Player */}
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        controls
        controlsList="nodownload"
      >
        <source src={require(`../../../assets/video.mp4`)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Speed Control in Full-Screen Mode Only */}
      {isFullscreen && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-gray-800 p-2 rounded-lg z-10">
          <span className="text-white text-sm">Speed:</span>
          <button
            onClick={() => handleSpeedChange(1.0)}
            className={`${
              playbackSpeed === 1.0 ? 'bg-orange-500' : 'bg-gray-600'
            } text-white px-3 py-1 rounded`}
          >
            1x
          </button>
          <button
            onClick={() => handleSpeedChange(1.25)}
            className={`${
              playbackSpeed === 1.25 ? 'bg-orange-500' : 'bg-gray-600'
            } text-white px-3 py-1 rounded`}
          >
            1.25x
          </button>
          <button
            onClick={() => handleSpeedChange(1.5)}
            className={`${
              playbackSpeed === 1.5 ? 'bg-orange-500' : 'bg-gray-600'
            } text-white px-3 py-1 rounded`}
          >
            1.5x
          </button>
          <button
            onClick={() => handleSpeedChange(2.0)}
            className={`${
              playbackSpeed === 2.0 ? 'bg-orange-500' : 'bg-gray-600'
            } text-white px-3 py-1 rounded`}
          >
            2x
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;