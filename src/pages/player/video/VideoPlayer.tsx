import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import floatingScreen from '../../../assets/floatingScreen.png';

interface VideoPlayerProps {
  videoUrl: string;
  onBack: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

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

  return (
    <div className="relative bg-gray-800">
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        controls
        controlsList="nodownload"
        style={{ objectFit: 'contain'}}
      >
        Your browser does not support the video tag.
      </video>

      {/* Back button */}
      <div className="absolute top-0 left-0 p-4">
        <button onClick={onBack} className="text-white">
          <FontAwesomeIcon icon={faArrowLeft} size="1x" />
        </button>
      </div>

      {/* Picture-in-Picture button */}
      <div className="absolute top-0 right-0 p-4">
        <button onClick={handlePictureInPicture} className="text-white">
          {/* <FontAwesomeIcon icon={faExternalLinkAlt} size="1x" /> */}
          <img
              src={floatingScreen}
              alt=""
              className="h-5 w-5"
            />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;