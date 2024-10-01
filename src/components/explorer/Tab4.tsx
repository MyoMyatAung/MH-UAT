import { useEffect, useState } from "react";
import rate from "../../assets/rate.svg";
const Tab4 = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [rankingData, setRankingData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const getRankingData = async () => {
    const res = await fetch(
      "https://cc3e497d.qdhgtch.com:2345/api/v1/movie/ranking/list"
    );
    const data = await res.json();
    console.log(data, "data");
    setRankingData(data?.data);
  };

  useEffect(() => {
    getRankingData();
  }, []);

  return (
    <div className="pb-32 min-h-screen">
      <div className="w-full">
        <nav className="flex overflow-x-scroll no-scrollbar pb-5 gap-3">
          {rankingData.map((item: any, index) => (
            <div className="relative" onClick={() => setActiveTab(index)}>
              <p
                key={index}
                className={`${
                  activeTab === index ? "text-white" : "text-gray-800"
                } whitespace-nowrap py-2 rounded-lg hover:text-white transition-colors`}
              >
                {item?.title}
              </p>
              <div
                className={`w-[29px] h-[3px] bg-[#F54100] absolute left-[20px] ${
                  activeTab === index ? "opacity-1" : "opacity-0"
                }`}
              ></div>
            </div>
          ))}
        </nav>
      </div>
      <div className="">
        {rankingData[activeTab]?.movie_data?.length ? (
          rankingData[activeTab]?.movie_data?.map((item: any, index: any) => (
            <div className="flex my-5 gap-5 items-center">
              <div className="relative">
                <img
                  src={item?.cover}
                  className="w-52 h-auto rounded-md object-cover"
                  alt=""
                />
                <div className="absolute top-0 left-0 bg-orange-600 rounded-tl-md rounded-br-md text-white px-3 py-1">
                  {index + 1}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex w-full items-center ml-auto flex-wrap">
                  <h1 className="text-white text-[16px]">{item?.name}</h1>
                  <div className="flex ml-auto">
                    {index >= 5 ? (
                      <img src={rate} alt="" />
                    ) : (
                      Array.from(
                        { length: 5 - index },
                        (_, index) => index
                      ).map((ri) => <img key={ri} src={rate} alt="" />)
                    )}

                    {/* <img src={rate} alt="" />
                    <img src={rate} alt="" />
                    <img src={rate} alt="" />
                    <img src={rate} alt="" /> */}
                  </div>
                </div>
                <div className="flex gap-1">
                  <p className="px-2 py-[2px] text-[12px] bg-gray-800 rounded-md">
                    {item?.year}
                  </p>
                  {item?.tags?.map((tag: any) => (
                    <p
                      className="px-2 py-[2px] text-[12px] bg-gray-800 rounded-md"
                      key={tag?.id}
                    >
                      {tag?.name}
                    </p>
                  ))}
                </div>
                <p className="text-gray-500 text-[12px]">
                  13岁的女孩小美（姜晋安
                  配音）成长于一个典型的亚裔家庭之中，经营着一间作为旅游景点。
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>Not Found</h1>
        )}
      </div>
    </div>
    // <div className="pt-5 pb-32">
    //   <div className="w-full">
    //     <nav className="flex overflow-x-scroll no-scrollbar pb-5 gap-3">
    //       {rankingData.map((item: any, index) => (
    //         <div className="relative" onClick={() => setActiveTab(index)}>
    //           <p
    //             key={index}
    //             className={`${
    //               activeTab === index ? "text-white" : "text-gray-800"
    //             } whitespace-nowrap py-2 rounded-lg hover:text-white transition-colors`}
    //           >
    //             {item?.title}
    //           </p>
    //           <div
    //             className={`w-[29px] h-[3px] bg-[#F54100] absolute left-[20px] ${
    //               activeTab === index ? "opacity-1" : "opacity-0"
    //             }`}
    //           ></div>
    //         </div>
    //       ))}
    //     </nav>
    //   </div>
    //   <div className="flex flex-col gap-4">
    //     <Card />
    //     <Card />
    //     <Card />
    //     <Card />
    //     <Card />
    //     <Card />
    //     <Card />
    //     <Card />
    //     <Card />
    //   </div>
    // </div>
  );
};

export default Tab4;
