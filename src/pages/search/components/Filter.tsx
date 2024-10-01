import React, { useState } from "react";

const Filter = () => {
  const [showTabs, setShowTabs] = useState(false);

  const handleFilterClick = () => {
    setShowTabs((prevShowTabs) => !prevShowTabs);
  };

  const handleCloseTabs = () => {
    setShowTabs(false);
  };
  return (
    <div>
      {/* Filter Button */}
      <div className="flex items-center mt-[60px] justify-center relative">
        <button
          onClick={handleFilterClick}
          className="flex gap-1 items-center relative z-1"
        >
          <span className="filter-title">按电影名称</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="8"
            viewBox="0 0 9 8"
            fill="none"
          >
            <path
              d="M5.36603 7.5C4.98113 8.16667 4.01887 8.16667 3.63397 7.5L0.169873 1.5C-0.215027 0.833334 0.266099 0 1.0359 0L7.9641 0C8.7339 0 9.21503 0.833333 8.83013 1.5L5.36603 7.5Z"
              fill="white"
              fillOpacity="0.6"
            />
          </svg>
        </button>
      </div>

      {/* Overlay (Only below the tabs) */}
      {showTabs && (
        <div
          className="fixed inset-x-0 top-[150px] bottom-0 bg-black bg-opacity-50 z-10"
          onClick={handleCloseTabs}
        />
      )}

      {/* Tabs Container */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out fixed top-[55px] left-0 w-full tab-main text-white z-20 rounded-lg ${
          showTabs ? "max-h-52" : "max-h-0"
        }`}
      >
        {/* Tabs Content */}
        <div className="p-3 gap-4 flex flex-col my-2">
          {/* First row */}
          <div className="flex items-center gap-2 overflow-x-scroll max-w-full whitespace-nowrap scrollbar-hide">
            <button className="tab-btn active">按电影名称</button>
            <button className="tab-btn">按演员姓名</button>
            <button className="tab-btn">类别</button>
            <button className="tab-btn">按演员姓名</button>
            <button className="tab-btn">类别</button>
            <button className="tab-btn">按演员姓名</button>
            <button className="tab-btn">类别</button>
          </div>

          {/* Second row */}
          <div className="flex items-center gap-2 overflow-x-scroll max-w-full whitespace-nowrap scrollbar-hide">
            <button className="tab-btn active">电影</button>
            <button className="tab-btn">电视剧</button>
            <button className="tab-btn">动漫</button>
            <button className="tab-btn">综艺节目</button>
            <button className="tab-btn">排序</button>
            <button className="tab-btn">按演员姓名</button>
            <button className="tab-btn">类别</button>
            <button className="tab-btn">按演员姓名</button>
            <button className="tab-btn">类别</button>
          </div>

          {/* Third row */}
          <div className="flex items-center gap-2 overflow-x-scroll max-w-full whitespace-nowrap scrollbar-hide">
            <button className="tab-btn active">最新的</button>
            <button className="tab-btn">最热门</button>
            <button className="tab-btn">等级</button>
            <button className="tab-btn">按演员姓名</button>
            <button className="tab-btn">类别</button>
            <button className="tab-btn">按演员姓名</button>
            <button className="tab-btn">类别</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
