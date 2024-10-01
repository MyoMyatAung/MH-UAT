// import React, { useEffect, useState } from "react";
// import { useGetTagsQuery } from "../services/searchApi";

// interface FilterProps {
//   resActive: string;
//   setresActive: React.Dispatch<React.SetStateAction<string>>;
//   setsortActive: React.Dispatch<React.SetStateAction<string>>;
//   sortActive: string;
//   settypeActive: React.Dispatch<React.SetStateAction<string>>;
//   typeActive: string;
// }

// const Filter: React.FC<FilterProps> = ({
//   resActive,
//   setresActive,
//   setsortActive,
//   sortActive,
//   settypeActive,
//   typeActive,
// }) => {
//   const { data, isLoading, isFetching } = useGetTagsQuery();

//   const [showTabs, setShowTabs] = useState(false);

//   const handleFilterClick = () => {
//     setShowTabs((prevShowTabs) => !prevShowTabs);
//   };

//   const handleCloseTabs = () => {
//     setShowTabs(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       if (scrollPosition > 10) {
//         setShowTabs(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   if (isLoading || isFetching) return <></>;

//   const res_type = data?.data?.movie_search_screen?.res_type;
//   const sort = data?.data?.movie_search_screen?.sort;
//   const type = data?.data?.movie_search_screen?.type;

//   return (
//     <div>
//       {/* Filter Button */}
//       <div className="flex items-center mt-[60px] justify-center relative">
//         <button
//           onClick={handleFilterClick}
//           className="flex gap-1 items-center relative z-1"
//         >
//           <span className="filter-title">按电影名称</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="9"
//             height="8"
//             viewBox="0 0 9 8"
//             fill="none"
//           >
//             <path
//               d="M5.36603 7.5C4.98113 8.16667 4.01887 8.16667 3.63397 7.5L0.169873 1.5C-0.215027 0.833334 0.266099 0 1.0359 0L7.9641 0C8.7339 0 9.21503 0.833333 8.83013 1.5L5.36603 7.5Z"
//               fill="white"
//               fillOpacity="0.6"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Overlay (Only below the tabs) */}
//       {showTabs && (
//         <div
//           className="fixed inset-x-0 top-[150px] bottom-0 bg-black bg-opacity-50 z-10"
//           onClick={handleCloseTabs}
//         />
//       )}

//       {/* Tabs Container */}
//       <div
//         className={`overflow-hidden transition-all duration-500 ease-in-out fixed top-[55px] left-0 w-full tab-main text-white z-20 rounded-lg ${
//           showTabs ? "max-h-52" : "max-h-0"
//         }`}
//       >
//         {/* Tabs Content */}
//         <div className="p-3 gap-4 flex flex-col my-2">
//           {/* First row */}
//           <div className="flex items-center gap-2 overflow-x-scroll max-w-full whitespace-nowrap scrollbar-hide">
//             {res_type?.map((res: any, index: any) => (
//               <button
//                 className={`tab-btn ${res.name == resActive ? "active" : ""}`}
//                 key={index}
//                 onClick={() =>
//                   setresActive(res.name === resActive ? "" : res.name)
//                 }
//               >
//                 {res.name}
//               </button>
//             ))}
//           </div>

//           {/* Second row */}
//           <div className="flex items-center gap-2 overflow-x-scroll max-w-full whitespace-nowrap scrollbar-hide">
//             {sort?.map((res: any, index: any) => (
//               <button
//                 className={`tab-btn ${res.name == sortActive ? "active" : ""}`}
//                 key={index}
//                 onClick={() =>
//                   setsortActive(res.name === sortActive ? "" : res.name)
//                 }
//               >
//                 {res.name}
//               </button>
//             ))}
//           </div>

//           {/* Third row */}
//           <div className="flex items-center gap-2 overflow-x-scroll max-w-full whitespace-nowrap scrollbar-hide">
//             {type?.map((res: any, index: any) => (
//               <button
//                 className={`tab-btn ${res.name == typeActive ? "active" : ""}`}
//                 key={index}
//                 onClick={() =>
//                   settypeActive(res.name === typeActive ? "" : res.name)
//                 }
//               >
//                 {res.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;

import React, { useEffect, useState } from "react";
import { useGetTagsQuery } from "../services/searchApi";

interface FilterProps {
  resActive: string;
  setresActive: React.Dispatch<React.SetStateAction<string>>;
  setsortActive: React.Dispatch<React.SetStateAction<string>>;
  sortActive: string;
  settypeActive: React.Dispatch<React.SetStateAction<string>>;
  typeActive: string;
}

const Filter: React.FC<FilterProps> = ({
  resActive,
  setresActive,
  setsortActive,
  sortActive,
  settypeActive,
  typeActive,
}) => {
  const { data, isLoading, isFetching } = useGetTagsQuery();

  const [showTabs, setShowTabs] = useState(false);

  const handleFilterClick = () => {
    setShowTabs((prevShowTabs) => !prevShowTabs);
  };

  const handleCloseTabs = () => {
    setShowTabs(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setShowTabs(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading || isFetching) return <></>;

  const res_type = data?.data?.movie_search_screen?.res_type;
  const sort = data?.data?.movie_search_screen?.sort;
  const type = data?.data?.movie_search_screen?.type;
  console.log(type);
  return (
    <div>
      {/* Filter Button */}
      <div className="flex items-center mt-[60px] justify-center relative">
        <button
          onClick={handleFilterClick}
          className="flex gap-1 items-center relative z-1"
        >
          <span className="filter-title">按电影名称</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="8"
            viewBox="0 0 9 8"
            fill="none"
          >
            <path
              d="M5.36603 7.5C4.98113 8.16667 4.01887 8.16667 3.63397 7.5L0.169873 1.5C-0.215027 0.833334 0.266099 0 1.0359 0L7.9641 0C8.7339 0 9.21503 0.833333 8.83013 1.5L5.36603 7.5Z"
              fill="white"
              fillOpacity="0.6"
            />
          </svg>
        </button>
      </div>

      {/* Overlay (Only below the tabs) */}
      {showTabs && (
        <div
          className="fixed inset-x-0 top-[150px] bottom-0 bg-black bg-opacity-50 z-10"
          onClick={handleCloseTabs}
        />
      )}

      {/* Tabs Container */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out fixed top-[55px] left-0 w-full tab-main text-white z-20 rounded-lg ${
          showTabs ? "max-h-52" : "max-h-0"
        }`}
      >
        {/* Tabs Content */}
        <div className="p-3 gap-4 flex flex-col my-2">
          {/* First row (Res Type) */}
          <div className="flex items-center gap-2 overflow-x-scroll max-w-full whitespace-nowrap scrollbar-hide">
            {res_type?.map((res: any, index: any) => (
              <button
                className={`tab-btn ${res.value === resActive ? "active" : ""}`}
                key={index}
                onClick={() =>
                  setresActive(res.value === resActive ? "" : res.value)
                }
              >
                {res.name}
              </button>
            ))}
          </div>

          {/* Second row (Sort) */}
          <div className="flex items-center gap-2 overflow-x-scroll max-w-full whitespace-nowrap scrollbar-hide">
            {sort?.map((res: any, index: any) => (
              <button
                className={`tab-btn ${
                  res.value === sortActive ? "active" : ""
                }`}
                key={index}
                onClick={() =>
                  setsortActive(res.value === sortActive ? "" : res.value)
                }
              >
                {res.name}
              </button>
            ))}
          </div>

          {/* Third row (Type) */}
          <div className="flex items-center gap-2 overflow-x-scroll max-w-full whitespace-nowrap scrollbar-hide">
            {type?.map((res: any, index: any) => (
              <button
                className={`tab-btn ${res.id === typeActive ? "active" : ""}`}
                key={index}
                onClick={() =>
                  settypeActive(res.id === typeActive ? "" : res.id)
                }
              >
                {res.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
