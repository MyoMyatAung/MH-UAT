import React, { useState } from 'react';

const tabs = ['详情', '评论 99+', '发弹幕'];

const TabNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="flex justify-around border-b border-gray-700 text-white">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`py-2 px-4 ${activeTab === index ? 'border-b-2 border-orange-500' : ''}`}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
