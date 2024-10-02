import { useEffect, useState } from "react";
import Movies from "../../components/home/Movies";
import Banner from "../../components/home/Banner";

const Home: React.FC = () => {
  const [baseMovieData, setBaseMovieData] = useState([]);
  const [carouselMovieData, setCarouselMovieData] = useState([]);

  const getRecommendedList = async () => {
    const res = await fetch(
      "https://cc3e497d.qdhgtch.com:2345/api/v1/movie/index_recommend"
    );
    const data = await res.json();
    const filteredBaseData = data?.data?.filter(
      (list: any) => list?.layout === "base"
    );
    const filteredCarouselData = data?.data?.filter(
      (list: any) => list?.layout === "index_recommend_carousel"
    );
    setBaseMovieData(filteredBaseData);
    setCarouselMovieData(filteredCarouselData);
  };
  // console.log(carouselMovieData, "cmd");
  useEffect(() => {
    getRecommendedList();
  }, []);
  return (
    <div className="bg-background text-text min-h-screen pb-32 flex flex-col gap-10">
      {carouselMovieData && <Banner list={carouselMovieData} />}
      {baseMovieData?.map((movieData: any, index: any) => (
        <Movies key={index} movieData={movieData} />
      ))}
    </div>
  );
};

export default Home;
