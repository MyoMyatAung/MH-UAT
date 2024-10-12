import React from "react";
import MovieCard from "../../../components/home/MovieCard";

const RecommendedList = ({ data }: any) => {
  // console.log(data?.recommendList, "rdrd");
  return (
    <div className="pb-20 px-3">
      <h1 className="text-white mb-3 my-5 text-[16px]">相关推荐</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {data?.recommendList?.map((movie: any) => (
          <MovieCard movie={movie} height={"200px"} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedList;
