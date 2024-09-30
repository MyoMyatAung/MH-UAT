import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShareAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';

const DetailSection: React.FC = () => {
  return (
    <div className="p-4 text-white bg-[#1C1C1C]">
      {/* Title and Basic Info */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">双城之战 第一季</h2>
        <p className="text-xs text-gray-400">简介</p>
      </div>
      <p className="text-sm text-gray-400 mb-4">电视剧 / 2021 / 剧情 / 动作</p>

      {/* Action Buttons */}
      <div className="flex justify-between mb-4">
        <button className="flex items-center space-x-1">
          <FontAwesomeIcon icon={faBookmark} />
          <span className="text-sm">收藏</span>
        </button>
        <button className="flex items-center space-x-1">
          <FontAwesomeIcon icon={faStar} />
          <span className="text-sm">反馈/求片</span>
        </button>
        <button className="flex items-center space-x-1">
          <FontAwesomeIcon icon={faShareAlt} />
          <span className="text-sm">分享</span>
        </button>
      </div>

      {/* Warning Banner */}
      <div className="bg-[#3B3B3B] text-gray-400 text-xs p-2 rounded mb-4">
        切勿相信视频中任何广告，谨防上当受骗！
      </div>

      {/* Ads Section */}
      <div className="bg-[#3B3B3B] text-white text-center p-4 rounded-lg flex items-center justify-center">
        Ads
      </div>
    </div>
  );
};

export default DetailSection;
