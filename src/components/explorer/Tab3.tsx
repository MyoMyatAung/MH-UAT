import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Tab3 = () => {
  const [topicData, setTopicData] = useState([]);
  const getMovieTopicList = async () => {
    const res = await fetch(
      "https://cc3e497d.qdhgtch.com:2345/api/v1/movie/topic"
    );
    const data = await res.json();
    console.log(data?.data, "topic data");
    setTopicData(data?.data?.list);
  };
  useEffect(() => {
    getMovieTopicList();
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-32 pt-5 min-h-screen">
      {topicData?.map((item: any) => (
        <Link to={`/explorer/${item?.id}`} key={item?.id}>
          <Card item={item} />
        </Link>
      ))}
    </div>
  );
};

export default Tab3;

const Card = ({ item }: any) => {
  return (
    <div className="">
      <div className="relative">
        <img
          src={item?.cover}
          alt=""
          className="h-[110px] md:h-[180px] w-full object-cover object-center rounded-tl-[8px] rounded-tr-[8px]"
        />
        <p className="text-white text-[14px] absolute bottom-2 left-2">
          {item?.name}
        </p>
      </div>
      <div className="flex text-[12px] text-gray-500 bg-gray-800 p-3 gap-3 items-center rounded-bl-[8px] rounded-br-[8px]">
        <p>影片 {item?.movie_count}</p>
        <p>|</p>
        <p>浏览 {item?.view}+</p>
      </div>
    </div>
  );
};
