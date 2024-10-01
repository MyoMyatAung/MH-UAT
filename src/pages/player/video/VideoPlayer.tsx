import React, { useEffect, useState } from 'react';

interface MovieDetail {
  name: string;
  area: string;
  year: string;
  score: string;
  cover: string;
  tags: { tag_id: number | null; name: string }[];
  play_from: {
    name: string;
    code: string;
    list: { episode_id: number | null; episode_name: string; play_url: string }[];
  }[];
}

const VideoPlayer: React.FC = () => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // Store the resolved video URL

  const getMovieDetail = async () => {
    const id = '204269';
    const res = await fetch(
      `https://cc3e497d.qdhgtch.com:2345/api/v1/movie/detail?id=${id}`
    );
    const data = await res.json();
    console.log(data?.data, 'movie data');
    setMovieDetail(data?.data);

    // Assume there's an endpoint or function to resolve the play_url
    const resolvedUrl = await resolvePlayUrl(data?.data?.play_from?.[0]?.list?.[0]?.play_url);
    setVideoUrl(resolvedUrl);
  };

  // Mock function to resolve the play_url, replace with actual parsing logic or API call
  const resolvePlayUrl = async (encodedUrl: string | undefined): Promise<string | null> => {
    if (!encodedUrl) return null;
    
    // Assuming there's an API or service to decode the play_url
    const res = await fetch(`https://example.com/parse?url=${encodedUrl}`);
    const data = await res.json();
    return data?.resolvedUrl; // Assuming the resolved URL comes back here
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <div className="p-4">
      {/* Video Player */}
      {videoUrl ? (
        <video width="100%" height="auto" controls controlsList="nodownload">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video available.</p>
      )}

      {/* Movie Details */}
      {movieDetail && (
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{movieDetail.name}</h1>
          <p className="text-gray-600">Year: {movieDetail.year}</p>
          <p className="text-gray-600">Score: {movieDetail.score}</p>
          <div className="flex gap-2 mt-2">
            {movieDetail.tags.map((tag) => (
              <span key={tag.tag_id} className="px-2 py-1 bg-gray-800 text-white rounded">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;