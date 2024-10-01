import React from 'react';

interface Episode {
  episode_id: number | null;
  episode_name: string;
  play_url: string;
}

interface EpisodeSelectorProps {
  episodes: Episode[]; // Accept episodes as a prop
}

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({ episodes }) => {
  return (
    <div className="mt-4 px-4 py-2 bg-[#2b2b2b] text-white">
      <div className="flex justify-between items-center">
        <span>选集</span>
        <button className="text-sm text-gray-400">展开全部</button>
      </div>
      <div className="flex gap-2 mt-2 overflow-x-scroll">
        {episodes.map((episode) => (
          <button key={episode.episode_id} className="px-3 py-1 rounded-md">
            {episode.episode_name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EpisodeSelector;