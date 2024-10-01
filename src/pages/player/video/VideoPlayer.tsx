import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const initHls = () => {
      if (Hls.isSupported()) {
        // Destroy the previous instance if it exists
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        const hls = new Hls({
          // Buffer and Bitrate Tuning for High-Quality Streams
          maxBufferLength: 8, // Reduced buffer length for smoother performance
          maxMaxBufferLength: 20, // Maximum buffer length
          lowLatencyMode: true, // Enable low latency for better responsiveness
          maxBufferSize: 50 * 1000 * 1000, // Reduce buffer size to avoid memory overload
          maxBufferHole: 0.2, // Reduced buffer hole tolerance for quicker seeking

          // Start at a lower quality to allow for smoother playback initially
          startLevel: 1, // Start at a lower level for faster playback
          autoStartLoad: true, // Automatically start loading the video

          // Cap the maximum bitrate for smoother performance with high-quality videos
          abrMaxWithRealBitrate: true, // Use real bitrate instead of theoretical to cap
          capLevelToPlayerSize: true, // Cap quality level to the size of the player
        });

        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current as HTMLMediaElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('Video is ready to play');
        });

        // Error handling to recover from media or network errors
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error("A network error occurred", data);
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("A media error occurred", data);
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                console.error("A fatal error occurred", data);
                break;
            }
          }
        });

        hlsRef.current = hls; // Store the hls instance
      } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari and native HLS support
        videoRef.current.src = videoUrl;
      }
    };

    if (videoUrl && videoRef.current) {
      initHls();
    }

    return () => {
      // Cleanup HLS.js when the component is unmounted or the URL changes
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoUrl]);

  return (
    <div>
      {videoUrl ? (
        <video
          ref={videoRef}
          width="100%"
          height="auto"
          controls
          controlsList="nodownload"
          style={{ objectFit: 'fill' }}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video available.</p>
      )}
    </div>
  );
};

export default VideoPlayer;