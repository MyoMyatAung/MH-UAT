import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

interface Episode {
  episode_id: number | null;
  episode_name: string;
  play_url: string;
}

interface Source {
  name: string;
  videos: string;
  description: string;
}

interface ModalComponentProps {
  onClose: () => void;
  source: "episodes" | "sources";
  episodes: Episode[];
  onEpisodeSelect: (episode: Episode) => void;
  sources: Source[];
  defaultEpisodeId: number | null; // Pass the default selected episode ID
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  onClose,
  source,
  episodes,
  onEpisodeSelect,
  sources,
  defaultEpisodeId,
}) => {
  const [activeTab, setActiveTab] = useState<"episodes" | "sources">(
    source || "episodes"
  );
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(
    defaultEpisodeId
  ); // Track the selected episode based on ID
  const [selectedSource, setSelectedSource] = useState(0); // Track the selected source

  // Handle episode selection and update the state
  const handleEpisodeClick = (episode: Episode) => {
    setSelectedEpisodeId(episode.episode_id); // Update selected episode by ID
    onEpisodeSelect(episode); // Call the function to select the episode
  };

  // Sync default episode selection when the component mounts or when defaultEpisodeId changes
  useEffect(() => {
    setSelectedEpisodeId(defaultEpisodeId);
  }, [defaultEpisodeId]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="bg-black/70 backdrop-blur-md w-full max-w-md h-[65vh] rounded-t-xl p-4 text-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6 overflow-x-auto m-auto">
            {/* Episode Tab */}
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "episodes"
                  ? "border-orange-500 text-orange-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("episodes")}
            >
              Episodes
            </button>
            {/* Source Tab */}
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "sources"
                  ? "border-orange-500 text-orange-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("sources")}
            >
              Sources
            </button>
          </div>
          <button onClick={onClose} className="text-white">
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
          </button>
        </div>

        <div className="h-[calc(100%-60px)] overflow-y-auto">
          {activeTab === "episodes" && (
            <div>
              <div className="grid grid-cols-2 gap-2">
                {episodes.map((episode, index) => (
                  <button
                    key={episode.episode_id || index}
                    onClick={() => handleEpisodeClick(episode)} // Handle episode selection
                    className={`py-2 text-center rounded-lg ${
                      episode.episode_id !== selectedEpisodeId
                        ? "bg-gray-800 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {episode.episode_name}
                    {episode?.episode_id === selectedEpisodeId && (
                      <span className="transform -translate-x-1/2 loader ml-5 -mt-1.5">
                        <div></div>
                        <div></div>
                        <div></div>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "sources" && (
            <div>
              {sources.map((source, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center bg-[#3B3B3B] p-3 rounded-lg mb-2 cursor-pointer ${
                    index === selectedSource ? "border border-orange-500" : ""
                  }`}
                  onClick={() => setSelectedSource(index)}
                >
                  <div>
                    <h4 className="text-white">{source.name}</h4>
                    <p className="text-gray-400 text-xs">{source.videos}</p>
                    <p className="text-gray-400 text-xs">
                      {source.description}
                    </p>
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
