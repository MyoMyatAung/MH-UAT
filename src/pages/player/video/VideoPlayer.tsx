import React from 'react';

const VideoPlayer: React.FC = () => {
  return (
    <div>
      <video width="100%" height="auto" controls controlsList="nodownload">
        <source src={require(`../../../assets//video.mp4`)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
