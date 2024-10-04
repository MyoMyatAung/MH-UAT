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
  from_code: string;
}

interface PlayFrom {
  name: string;
  total: number | null;
  tips: string;
  code: string;
}

interface MovieDetail {
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
  play_from: {
    name: string;
    code: string;
    list: Episode[];
    total: number | null;
    tips: string;
  }[];
  members: {name: string, type: number}[]
}

interface AdsData {
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
}
const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [adsData, setAdsData] = useState<AdsData | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedSource, setSelectedSource] = useState(0); // Track the selected source

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

  const handleSelectedSource = async(ind: number) => {
    const code = movieDetail?.play_from[ind]?.code;
    const res = await fetch(`https://cc3e497d.qdhgtch.com:2345/api/v1/movie_addr/list?from_code=${code}&movie_id=${id}`);
    const data = await res.json();
    if(data.data[0].ready_to_play) {
    setSelectedSource(ind);
    }
  }

  const getEpisodes = async (code: string) => {
    const res = await fetch(`https://cc3e497d.qdhgtch.com:2345/api/v1/movie_addr/list?from_code=${code}&movie_id=${id}`);
    const data = await res.json();
    console.log('data is=>', data);
    if(data.data[0].ready_to_play) {
      setCurrentEpisode(data.data[0]);
      setEpisodes(data.data);
    } else {
      setSelectedSource(selectedSource)
      alert('Channel Unavailable');
    }
    // setMovieDetail(data?.data);

    // if (data?.data?.play_from?.[0]?.list?.[0]) {
    //   setCurrentEpisode(data.data.play_from[0].list[0]); // Set the first episode as default
    // }
  };
  useEffect(() => {
    if (id) {
      getMovieDetail();
      getAdsData();
    }
  }, [id]);

  const getAdsData = async () => {
    const res = await fetch(
      "https://cc3e497d.qdhgtch.com:2345/api/v1/advert/config"
    );
    const data = await res.json();
    setAdsData(data);
    console.log('data is=>', data);
  }
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

  const changeSource = (playfrom: PlayFrom) => {
    if(movieDetail?.play_from) {
      const ind: number = movieDetail?.play_from.findIndex(x => x.code === playfrom.code);
      if(ind >= 0) {
        getEpisodes(movieDetail?.play_from[ind]?.code || '');
        if (movieDetail?.play_from[ind]?.list?.[0]) {
          setCurrentEpisode(movieDetail.play_from[ind].list[0]); // Set the first episode as default
          setSelectedEpisode(movieDetail.play_from[ind].list[0]); // Set the first episode as default
        }
      }
    }
  }

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
        selectedEpisode={selectedEpisode || currentEpisode}
      />
      <DetailSection
        adsData = {adsData}
        movieDetail = {movieDetail} // Pass movie details to DetailSection
      />
      <SourceSelector
        changeSource={changeSource}
        episodes={episodes && episodes.length > 0 ? episodes : (movieDetail.play_from[0]?.list || [])}
        onEpisodeChange={handleEpisodeChange}
        onEpisodeSelect={handleEpisodeSelect}
        selectedEpisode={selectedEpisode || currentEpisode }
        movieDetail = {movieDetail} // Pass movie details to DetailSection
        selectedSource={selectedSource}
        setSelectedSource={handleSelectedSource}
      />
      <EpisodeSelector
        episodes={episodes && episodes.length > 0 ? episodes : (movieDetail.play_from[0]?.list || [])}
        onEpisodeSelect={handleEpisodeSelect}
        selectedEpisode={selectedEpisode || currentEpisode }
      />
      </>}
    </div>
  );
};

export default DetailPage;