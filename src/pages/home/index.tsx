import MoviesByTopic from "../../components/MoviesByTopic";
import MovieCard from "../../components/MovieCard";
import { useState } from "react";

const Home: React.FC = () => {
  const [movieData, setMovieData] = useState({});
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-text">
      <MoviesByTopic movieData={movieData} />
    </div>
  );
};

export default Home;
