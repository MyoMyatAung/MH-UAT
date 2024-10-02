import React, { useState } from "react";
import share from "../../../assets/share.png";
import star from "../../../assets/star.png";
import info from "../../../assets/info.png";

interface DetailSectionProps {
  movieDetail: {
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
  };
}

const DetailSection: React.FC<DetailSectionProps> = ({ movieDetail }) => {
  const [activeTab, setActiveTab] = useState("tab-1");
  console.log("movieDetail is=>", movieDetail);
  return (
    <div className="flex flex-col w-full bg-black">
      {/* Tabs */}
      <div className="flex px-2 justify-between items-center">
        <div className="flex">
          <div
            className={`px-4 py-3 bg-black text-gray-400 rounded-t-lg cursor-pointer relative ${
              activeTab === "tab-1" ? "text-white z-10" : ""
            }`}
            onClick={() => setActiveTab("tab-1")}
          >
            <span className="text-white">详情</span>
            {activeTab === "tab-1" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
            )}
          </div>
          <div
            className={`px-4 py-3 bg-black text-gray-400 rounded-t-lg cursor-pointer relative ${
              activeTab === "tab-2" ? "text-white z-10" : ""
            }`}
            onClick={() => setActiveTab("tab-2")}
          >
            <span>评论</span>
            <span className="text-gray-500">
              {" "}
              {movieDetail.comments_count || "0"}
            </span>
            {activeTab === "tab-2" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
            )}
          </div>
        </div>

        {/* Buttons aligned to the right */}
        <div className="flex mr-2 space-x-1">
          <button className="px-4 py-2 bg-gray-800 text-white font-bold rounded-l-3xl">
            发起申
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white font-bold rounded-r-3xl flex items-center">
            弹<span className="text-sm text-orange-600">✔</span>
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-black p-5 rounded-b-lg">
        {activeTab === "tab-1" && (
          <div id="tab-1" className="block">
            {/* Movie Title and Info */}
            <div className="movie-info mb-4">
              <h2 className="text-2xl font-bold text-white">
                {movieDetail.name || "暂无标题"}
              </h2>
              <div className="info text-gray-400 text-sm flex flex-wrap items-center space-x-2 mt-2">
                {/* Rating (Dynamic flame based on score or popularity) */}
                <div className="rating flex items-center">
                  <div className="flames flex">
                    {/* Show flames based on the popularity score */}
                    {Array(Math.max(1, movieDetail.popularity_score))
                      .fill("🔥")
                      .map((flame, index) => (
                        <span key={index} className="text-xl mr-1">
                          {flame}
                        </span>
                      ))}
                  </div>
                </div>
                <span>{movieDetail.year}</span>
                <span>/</span>
                <span>{movieDetail.area}</span>
                <span>/</span>
                <span>{movieDetail.type_name}</span>
                {movieDetail.tags && movieDetail.tags.length > 0 && (
                  <>
                    {movieDetail.tags.map((tag, index) => (
                      <React.Fragment key={index}>
                        <span>/</span>
                        <span>{tag.name || "暂无标签"}</span>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="actions flex justify-between my-4">
              <button className="action-btn px-4 py-2 rounded-md">
                <img src={star} alt="" className="h-7" />
                <span className="text-gray-200">收藏</span>
              </button>
              <button className="px-4 py-2 rounded-md">
                <img src={info} alt="" className="h-7" />
                <span className="text-gray-200">求片</span>反馈/
              </button>
              <button className="action-btn px-4 py-2 rounded-md">
                <img src={share} alt="" className="h-7" />
                <span className="text-gray-200">分享</span>
              </button>
            </div>

            {/* Warning Message */}
            <div className="warning p-2 bg-gray-800 rounded-md text-sm text-white text-center">
              切勿相信视频中的任何广告，谨防上当受骗！
            </div>
          </div>
        )}

        {activeTab === "tab-2" && (
          <div id="tab-2" className="block">
            {/* Comment section or other content */}
          </div>
        )}
        <div className="bg-gray-800 text-white text-center p-10 rounded-lg flex items-center mt-5 justify-center">
        Ads
      </div>
      </div>
    </div>
  );
};

export default DetailSection;
