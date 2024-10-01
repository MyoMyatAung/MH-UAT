import { useEffect, useState } from "react";

const Tab1 = () => {
  const [exploreList, setExploreList] = useState([]);
  const getExploreList = async () => {
    const res = await fetch(
      "https://cc3e497d.qdhgtch.com:2345/api/v1/movie/explore/list"
    );
    const data = await res.json();
    console.log(data);
    setExploreList(data?.data?.list);
  };

  useEffect(() => {
    getExploreList();
  }, []);

  return (
    <div className="pb-32 mt-5">
      <div className="grid grid-cols-3 gap-2">
        {exploreList.map((list: any) => (
          <div className="" key={list.cover}>
            <div className="">
              <img src={list?.cover} alt="" className="h-[114px] w-full object-cover" />
            </div>
            <p className="truncate text-[14px] py-3">{list?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab1;
