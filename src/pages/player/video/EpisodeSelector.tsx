import React, { useState } from 'react';

const episodes = ['第1集', '第2集', '第3集', '第4集', '第5集'];

const EpisodeSelector: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number>(2); // Default to 第3集

  return (
    <div className="flex space-x-2 px-4 pb-4 overflow-x-auto">
      {episodes.map((episode, index) => (
        <button
          key={index}
          className={`px-4 py-2 text-sm rounded ${
            selectedEpisode === index
              ? 'bg-[#D26F36] text-white'
              : 'bg-[#3B3B3B] text-gray-300'
          }`}
          onClick={() => setSelectedEpisode(index)}
        >
          {episode}
        </button>
      ))}
    </div>
  );
};

export default EpisodeSelector;
