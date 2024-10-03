import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from './video/VideoPlayer';
import SourceSelector from './video/SourceSelector';
import DetailSection from './video/DetailSection';
import EpisodeSelector from './video/EpisodeSelector';
import Loader from '../search/components/Loader';

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
  content: string;
  cover: string;
  type_name: string;
  tags: { name: string }[];
  comments_count: string;
  popularity_score: number;
  play_from: {
    name: string;
    code: string;
    list: Episode[];
  }[];
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  const navigate = useNavigate();

  // Fetch the movie details based on the provided id
  const getMovieDetail = async () => {
    const res = await fetch(`https://cc3e497d.qdhgtch.com:2345/api/v1/movie/detail?id=${id}`);
    const data = await res.json();
    setMovieDetail(data?.data);

    if (data?.data?.play_from?.[0]?.list?.[0]) {
      setCurrentEpisode(data.data.play_from[0].list[0]); // Set the first episode as default
    }
  };

  useEffect(() => {
    if (id) {
      getMovieDetail();
    }
  }, [id]);

  const handleEpisodeChange = (episode: Episode) => {
    setCurrentEpisode(episode);
  };

  const handleEpisodeSelect = (episode: Episode) => {
    setSelectedEpisode(episode);
  };

  const navigateBackFunction = () => {
    navigate(-1); // Go back to the previous page
  };

  // if (!movieDetail || !currentEpisode) {
  //   return <div className="flex justify-center items-center mt-52 bg-black w-full" style={{height: '100vh'}}>
  //   <Loader />
  // </div>;
  // }

  return (
    <div className="bg-black overflow-y-scroll min-h-screen">
      {!movieDetail || !currentEpisode ? <div className="flex justify-center items-center mt-52 bg-black">
    <Loader />
  </div> :
  <>
      <VideoPlayer
        videoUrl={selectedEpisode?.play_url || currentEpisode?.play_url || ''}
        onBack={navigateBackFunction}
        movieDetail={movieDetail} // Pass movie details to DetailSection
        selectedEpisode={selectedEpisode}
      />
      <DetailSection
        movieDetail={movieDetail} // Pass movie details to DetailSection
      />
      <SourceSelector
        episodes={movieDetail.play_from[0]?.list || []}
        onEpisodeChange={handleEpisodeChange}
        onEpisodeSelect={handleEpisodeSelect}
        selectedEpisode={selectedEpisode || movieDetail.play_from[0]?.list[0]}
      />
      <EpisodeSelector
        episodes={movieDetail.play_from[0]?.list || []}
        onEpisodeSelect={handleEpisodeSelect}
        selectedEpisode={selectedEpisode || movieDetail.play_from[0]?.list[0]}
      />
      </>}
    </div>
  );
};

export default DetailPage;