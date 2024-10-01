import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from './EpisodeModal';

interface Episode {
  episode_id: number | null;
  episode_name: string;
  play_url: string;
}

interface SourceSelectorProps {
  episodes: Episode[];             // Episodes list
  onEpisodeChange: (episode: Episode) => void; // Callback to change the current episode
  onEpisodeSelect: (episode: Episode) => void;
  selectedEpisode: Episode | null;
}

const SourceSelector: React.FC<SourceSelectorProps> = ({ episodes, onEpisodeChange, onEpisodeSelect, selectedEpisode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [source, setSource] = useState<'episodes' | 'sources'>('episodes'); // Modal state

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-[#1C1C1C] p-4 mb-4">
      {/* Section header with title and expand all */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-white text-base font-bold">Episodes</h4>

        {/* Expand All (展开全部) button triggers the modal */}
        <div className="flex items-center text-gray-400 text-sm">
          <button onClick={() => { openModal(); setSource('episodes'); }} className="flex items-center">
            <span>Expand All</span>
            <FontAwesomeIcon icon={faChevronRight} className="ml-1 text-xs" />
          </button>
        </div>
      </div>

      {/* Source Selector Area */}
      <div className="bg-[#C8A370] p-4 flex justify-between items-center rounded-lg shadow-sm">
        <div className="text-black leading-tight">
          <h4 className="font-bold text-base">Duo Duo Source</h4>
          <p className="text-sm">29 videos</p>
        </div>

        {/* Right Side: Switch resource (切换资源) button triggers the modal */}
        <button className="text-[#4B4B4B] flex items-center" onClick={() => { openModal(); setSource('sources'); }}>
          <span className="text-base font-semibold">Switch Resource</span>
          <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-md" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalComponent
          onClose={closeModal}
          source={source}
          episodes={episodes}
          onEpisodeSelect={onEpisodeSelect}
          defaultEpisodeId={selectedEpisode?.episode_id || null} // Pass current episode ID as default
          sources={[]} // You can add real sources here if needed
        />
      )}
    </div>
  );
};

export default SourceSelector;