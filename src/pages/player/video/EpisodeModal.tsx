import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

const ModalComponent: React.FC<{ onClose: () => void, source: 'episodes' | 'sources' }> = ({ onClose, source }) => {
  const [activeTab, setActiveTab] = useState<'episodes' | 'sources'>(source || 'episodes');
  const [activeEpisodeRange, setActiveEpisodeRange] = useState('1-50'); // Default episode range
  const [selectedSource, setSelectedSource] = useState(0); // Track the selected source

  // Example episode and source data
  const episodes = Array.from({ length: 18 }, (_, i) => `Episode ${i + 1}`);
  const sources = [
    { name: '555 Blue Light', videos: '32 videos', description: 'No ads / High resolution' },
    { name: 'Duoduo Source', videos: '40 videos', description: 'No ads / Fast streaming' },
    { name: 'Xiaomi Source', videos: '40 videos', description: 'No ads / Fast streaming' },
    { name: 'Bull Source', videos: '32 videos', description: 'No ads / High resolution' }
  ];

  // Handle switching between episode ranges (tabs)
  const handleEpisodeRangeClick = (range: string) => {
    setActiveEpisodeRange(range); // Update the active episode range
  };

  // Handle selecting a source (channel)
  const handleSourceSelect = (index: number) => {
    setSelectedSource(index); // Update the selected source
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      {/* Modal takes up half the screen height */}
      <div className="bg-[#1C1C1C] w-full max-w-md h-[65vh] rounded-t-lg p-4 text-white">
        {/* Modal Header: Tabs and Close Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6 overflow-x-auto">
            {/* Episode Tab */}
            <button
              className={`pb-2 border-b-2 ${
                activeTab === 'episodes' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400'
              }`}
              onClick={() => setActiveTab('episodes')}
            >
              Episodes
            </button>
            {/* Source Tab */}
            <button
              className={`pb-2 border-b-2 ${
                activeTab === 'sources' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400'
              }`}
              onClick={() => setActiveTab('sources')}
            >
              Sources
            </button>
          </div>
          {/* Close Button */}
          <button onClick={onClose} className="text-white">
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
          </button>
        </div>

        {/* Container for both Episodes and Sources, with same height */}
        <div className="h-[calc(100%-60px)] overflow-y-auto">
          {/* Episode List */}
          {activeTab === 'episodes' && (
            <div>
              {/* Episode Tab navigation with horizontal scroll */}
              <div className="flex justify-between mb-3 text-sm text-gray-400 overflow-x-auto">
                <div className="flex space-x-4">
                  <button
                    className={`border-b-2 ${
                      activeEpisodeRange === '1-50' ? 'border-orange-500 text-orange-500' : 'border-transparent'
                    }`}
                    onClick={() => handleEpisodeRangeClick('1-50')}
                  >
                    1-50 Episodes
                  </button>
                  <button
                    className={`border-b-2 ${
                      activeEpisodeRange === '50-100' ? 'border-orange-500 text-orange-500' : 'border-transparent'
                    }`}
                    onClick={() => handleEpisodeRangeClick('50-100')}
                  >
                    50-100
                  </button>
                  <button
                    className={`border-b-2 ${
                      activeEpisodeRange === '100-150' ? 'border-orange-500 text-orange-500' : 'border-transparent'
                    }`}
                    onClick={() => handleEpisodeRangeClick('100-150')}
                  >
                    100-150
                  </button>
                  <button
                    className={`border-b-2 ${
                      activeEpisodeRange === '150-189' ? 'border-orange-500 text-orange-500' : 'border-transparent'
                    }`}
                    onClick={() => handleEpisodeRangeClick('150-189')}
                  >
                    150-189
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {episodes.map((episode, index) => (
                  <button
                    key={index}
                    className={`py-2 text-center rounded-lg ${
                      index === 3 ? 'bg-orange-500 text-white' : 'bg-[#3B3B3B] text-gray-300'
                    }`}
                  >
                    {episode}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Source List */}
          {activeTab === 'sources' && (
            <div>
              {sources.map((source, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center bg-[#3B3B3B] p-3 rounded-lg mb-2 cursor-pointer ${
                    index === selectedSource ? 'border border-orange-500' : ''
                  }`}
                  onClick={() => handleSourceSelect(index)}
                >
                  <div>
                    <h4 className="text-white">{source.name}</h4>
                    <p className="text-gray-400 text-xs">{source.videos}</p>
                    <p className="text-gray-400 text-xs">{source.description}</p>
                  </div>
                  {index === selectedSource && (
                    <span className="text-orange-500">
                      <FontAwesomeIcon icon={faCheck} className="text-lg" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;