import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Tab1 = () => {
  const [exploreList, setExploreList] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

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

  // Function to handle click and navigate to player with movie ID
  const handleMovieClick = (id: string) => {
    navigate(`/player/${id}`); // Navigate to player with movie id as a route parameter
  };

  return (
    <div className="pb-32 mt-5">
      <div className="grid grid-cols-3 gap-2">
        {exploreList.map((list: any) => (
          <div className="" key={list.cover} onClick={() => handleMovieClick(list.id)}>
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