import React, { useState } from "react";
import share from "../../../assets/share.png";
import star from "../../../assets/star.png";
import info from "../../../assets/info.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faTimes,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import CommentComponent from "./CommentSection";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModel } from "../../../features/login/ModelSlice";
interface DetailSectionProps {
  movieDetail: {
    code: string;
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
    members: { name: string; type: number }[];
  };
  adsData: {
    [key: string]: {
      type: number;
      location_id: number;
      channel: string;
      remarks: string;
      data: {
        image: string;
        url: string;
      };
    };
  } | null;
  id: string;
}

const DetailSection: React.FC<DetailSectionProps> = ({
  movieDetail,
  adsData,
  id,
}) => {
  const adEntries = adsData && adsData.data ? Object.values(adsData.data) : []; // Extracting all the ads
  const [activeTab, setActiveTab] = useState("tab-1");
  const [showModal, setShowModal] = useState(false); // For triggering modal
  const dispatch = useDispatch();

  const handleDetailClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTabClick = async(tab: string) => {
    const loginResponse = await localStorage.getItem("authToken");
    if(!loginResponse || (loginResponse && loginResponse.includes('errorCode'))) {
      localStorage.removeItem('authToken');
      dispatch(setAuthModel(true));
      return;
    }
    const loginInfo = JSON.parse(loginResponse);
    alert(loginInfo.token_type);
    if(tab === 'star') {
    } else if (tab === 'info') {

    } else {
      
    }
  }
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
        {/* <div className="flex mr-2 space-x-1 mt-3">
          <button className="px-4 py-2 bg-gray-800 text-white font-bold rounded-l-3xl">
            发起申
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white font-bold rounded-r-3xl flex items-center">
            弹<span className="text-sm text-orange-600">✔</span>
          </button>
        </div> */}
      </div>

      {/* Tab content */}
      <div className="bg-black p-5 rounded-b-lg">
        {activeTab === "tab-1" && (
          <div id="tab-1" className="block">
            {/* Movie Title and Info */}
            <div className="movie-info mb-4 flex-auto overflow-x-scroll">
              <h2 className="text-2xl font-bold text-white">
                {movieDetail.name || "暂无标题"}
              </h2>
              <div className="info text-gray-400 text-sm flex justify-between items-start overflow-x-auto space-x-2 mt-2">
                {/* Left Section: Flames, year, area, and tags */}
                <div className="left-section flex items-start flex-wrap space-x-2 max-w-[80%]">
                  <div className="rating flex items-center">
                    <div className="flames flex">
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

                {/* Right Section: 简介 and Chevron Icon */}
                <div
                  className="right-section flex items-center"
                  onClick={handleDetailClick}
                >
                  <span className="font-semibold text-sm">简介</span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-md ml-1"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="actions flex justify-between my-4">
              <button onClick={()=>handleTabClick('start')} className="action-btn flex flex-col items-center px-4 py-2 rounded-md">
                <img src={star} alt="" className="h-7 mb-2" />
                <span className="text-gray-200">收藏</span>
              </button>

              <button onClick={()=>handleTabClick('info')} className="flex flex-col items-center px-4 py-2 rounded-md">
                <img src={info} alt="" className="h-7 mb-2" />
                <span className="text-gray-200">反馈/求片</span>
              </button>

              {/* Trigger modal on share button */}
              <button onClick={()=>handleTabClick('share')} className="action-btn flex flex-col items-center px-4 py-2 rounded-md">
                <img src={share} alt="" className="h-7 mb-2" />
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
            <CommentComponent movieId={id} />
          </div>
        )}
        <div className="bg-gray-800 text-white text-center rounded-lg flex flex-col items-center mt-5 justify-center overflow-y-scroll h-52">
          {adEntries.length > 0
            ? (() => {
                const randomIndex = Math.floor(
                  Math.random() * adEntries.length
                );
                const ad: any = adEntries[randomIndex % adEntries.length];
                return ad && ad.data && ad.data.image && ad.data.url ? (
                  <a
                    href={ad.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={ad.data.image}
                      alt={`Ad ${randomIndex}`}
                      className="w-auto h-52 rounded-md"
                    />
                  </a>
                ) : null;
              })()
            : null}{" "}
          {/* Don't render if no ad data */}
        </div>
      </div>

      {/* Modal for sharing */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="bg-black backdrop-blur-md w-full max-w-md h-[60vh] bottom-0 rounded-lg p-6 text-white overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Introduction</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-300 hover:text-white"
              >
                <FontAwesomeIcon icon={faTimes} className="text-lg" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {/* Movie Title and Information */}
              <h2 className="text-2xl font-bold mb-2">
                {movieDetail.name || "Unknown Title"}
              </h2>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <span className="text-orange-500 flex items-center">
                  <FontAwesomeIcon icon={faFire} className="mr-1" />
                  {movieDetail.popularity_score || 0}
                </span>
                <span className="mx-2">|</span>
                <span>{movieDetail.type_name || "Unknown Type"}</span>
                <span className="mx-2">/</span>
                <span>{movieDetail.year || "Unknown Year"}</span>
                <span className="mx-2">/</span>
                <span>{movieDetail.area || "Unknown Area"}</span>
              </div>

              {/* Cast Section */}
              <h3 className="text-lg font-semibold mt-4">Cast</h3>
              <div className="text-gray-400 text-sm mt-2">
                <div className="flex space-x-4">
                  {/* Director */}
                  <span>
                    Director:{" "}
                    <span className="text-white">
                      {movieDetail?.members?.find((member) => member.type === 3)
                        ?.name || "Unknown"}
                    </span>
                  </span>
                  {/* Screenwriter */}
                  <span>
                    Screenwriter:{" "}
                    <span className="text-white">
                      {movieDetail?.members?.find((member) => member.type === 2)
                        ?.name || "Unknown"}
                    </span>
                  </span>
                </div>
                {/* Actors */}
                <div className="mt-2">
                  <span>Actor(s): </span>
                  {movieDetail?.members
                    ?.filter((member) => member.type === 1)
                    .map((actor, index) => (
                      <span key={index} className="text-white">
                        {actor.name || "Unknown"}
                        {index <
                        movieDetail.members.filter(
                          (member) => member.type === 1
                        ).length -
                          1
                          ? ", "
                          : ""}
                      </span>
                    )) || <span className="text-white">Unknown</span>}
                </div>
              </div>

              {/* Introduction Section */}
              <h3 className="text-lg font-semibold mt-6">Introduction</h3>
              <p className="text-gray-300 mt-2 leading-relaxed">
                {movieDetail.content || "No description available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailSection;
