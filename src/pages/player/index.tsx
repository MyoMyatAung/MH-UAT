import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from './video/VideoPlayer';  // Assuming you have this component
import SourceSelector from './video/SourceSelector';
import DetailSection from './video/DetailSection';
import EpisodeSelector from './video/EpisodeSelector';

interface Episode {
  episode_id: number | null;
  episode_name: string;
  play_url: string;
}

interface MovieDetail {
  name: string;
  area: string;
  year: string;
  score: string;
  play_from: {
    name: string;
    code: string;
    list: Episode[];
  }[];
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get id from URL params
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null); // Track the current episode
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  // Fetch the movie details based on the provided id
  const getMovieDetail = async () => {
    const res = await fetch(`https://cc3e497d.qdhgtch.com:2345/api/v1/movie/detail?id=${id}`);
    const data = await res.json();
    setMovieDetail(data?.data); // Save fetched movie data

    // Set the first episode as the default episode to play
    if (data?.data?.play_from?.[0]?.list?.[0]) {
      setCurrentEpisode(data.data.play_from[0].list[0]);
    }
  };

  useEffect(() => {
    if (id) {
      getMovieDetail(); // Fetch movie details when id changes
    }
  }, [id]);

  // Function to handle episode change from Modal
  const handleEpisodeChange = (episode: Episode) => {
    setCurrentEpisode(episode); // Update the current episode
  };

  const handleEpisodeSelect = (episode: Episode) => {
    setSelectedEpisode(episode); // Set the selected episode
  };
  if (!movieDetail || !currentEpisode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#1b1b1b] overflow-y-scroll" style={{ height: 'calc(100vh - 166px)' }}>
      {/* VideoPlayer plays the current episode */}
      <VideoPlayer videoUrl={selectedEpisode?.play_url || ''} />
      {/* Details Section */}
      <DetailSection />

      {/* Pass episode data to EpisodeSelector */}
      <EpisodeSelector episodes={movieDetail.play_from[0]?.list || []} />
      {/* Pass the episode list and callback to change episodes */}
      <SourceSelector episodes={movieDetail.play_from[0]?.list || []} onEpisodeChange={handleEpisodeChange} onEpisodeSelect={handleEpisodeSelect}
      selectedEpisode={selectedEpisode}/>
    </div>
  );
};

export default DetailPage;