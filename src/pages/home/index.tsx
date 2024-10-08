import { useEffect, useState } from "react";
import Movies from "../../components/home/Movies";
import Banner from "../../components/home/Banner";
import { useGetRecommendedMoviesQuery } from "./services/homeApi";
import Loader from "../search/components/Loader";
import ContinueWatching from "../../components/home/ContinueWatching";

const Home: React.FC = () => {
  const { data, isLoading } = useGetRecommendedMoviesQuery();
  console.log(data);
  return (
    <>
      {data && !isLoading ? (
        <div className="bg-background text-text min-h-screen pb-32 flex flex-col gap-10">
          {data?.data?.map((movieData: any, index: any) => {
            if (movieData?.layout === "index_recommend_carousel") {
              return (
                <>
                  <Banner key={index} list={movieData?.list} />{" "}
                  <div className="">
                    <h1 className="text-sm uppercase text-white font-semibold flex items-center px-3">
                      <span className="text-white font-headerFont">
                        Continue Watching
                      </span>
                    </h1>
                    <ContinueWatching />
                  </div>
                </>
              );
            } else if (movieData?.layout === "base") {
              return <Movies key={index} movieData={movieData} />;
            }
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-background">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Home;
