import React from 'react';
import VideoPlayer from './video/VideoPlayer';
import DetailSection from './video/DetailSection';
import SourceSelector from './video/SourceSelector';
import EpisodeSelector from './video/EpisodeSelector';

const DetailPage: React.FC = () => {
  return (
    <div className="bg-[#141414] min-h-screen overflow-y-scroll">
      {/* Video Player Section */}
      <VideoPlayer />

      {/* Tab Navigation */}
      <div className="flex justify-around border-b border-gray-700 text-white text-sm py-3">
        <button className="border-b-2 border-[#D26F36] py-2">详情</button>
        <button>评论 99+</button>
        <button>发弹幕</button>
      </div>

      {/* Details Section */}
      <DetailSection />

      {/* Source Selector */}
      <SourceSelector />

      {/* Episode Selector */}
      <EpisodeSelector />
    </div>
  );
};

export default DetailPage;
