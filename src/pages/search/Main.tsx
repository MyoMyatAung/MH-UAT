// import React, { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import Movies from "./components/Movies";
// import Filter from "./components/Filter";
// import { useGetSearchMovieQuery } from "./services/searchApi";

// const Main = () => {
//   const [query, setQuery] = useState("");
//   const [resActive, setresActive] = useState("");
//   const [sortActive, setsortActive] = useState("");
//   const [typeActive, settypeActive] = useState("");
//   const [currentPage, setcurrentPage] = useState(1);

//   // Create a state to track if the search is triggered
//   const [searchTrigger, setSearchTrigger] = useState(false);

//   // Trigger the API call only when searchTrigger is true
//   const { data, error, isLoading } = useGetSearchMovieQuery(
//     {
//       keyword: query,
//       page: currentPage,
//       sort: sortActive,
//       type_id: typeActive,
//       res_type: resActive,
//     },
//     { skip: !searchTrigger } // Skip API call until search is triggered
//   );

//   // Handle the search button click
//   const handleSearch = () => {
//     setSearchTrigger(true); // Trigger the search
//   };

//   // Reset search trigger when search is completed
//   useEffect(() => {
//     if (searchTrigger && data) {
//       setSearchTrigger(false); // Reset trigger after search completes
//     }
//   }, [data, searchTrigger]);
//   console.log(data);

//   return (
//     <>
//       <div className="search-bg"></div>
//       <Navbar query={query} setQuery={setQuery} onSearch={handleSearch} />
//       <Filter
//         resActive={resActive}
//         setresActive={setresActive}
//         sortActive={sortActive}
//         setsortActive={setsortActive}
//         typeActive={typeActive}
//         settypeActive={settypeActive}
//       />

//       {/* Display the Movies or Loading/Error state */}
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error fetching data</div>
//       ) : (
//         <Movies movies={data?.data?.list} />
//       )}
//     </>
//   );
// };

// export default Main;

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Filter from "./components/Filter";
import { useGetSearchMovieQuery } from "./services/searchApi";

const Main = () => {
  const [query, setQuery] = useState("");
  const [resActive, setresActive] = useState("");
  const [sortActive, setsortActive] = useState("");
  const [typeActive, settypeActive] = useState("");
  const [currentPage, setcurrentPage] = useState(1); // Track the current page
  const [movies, setMovies] = useState<any[]>([]); // Store movies data
  const [isFetching, setIsFetching] = useState(false); // Track if data is being fetched

  // Fetch movies based on the current page and other filters
  const { data, error, isLoading } = useGetSearchMovieQuery(
    {
      keyword: query,
      page: currentPage,
      sort: sortActive,
      type_id: typeActive,
      res_type: resActive,
    },
    { skip: !isFetching } // Skip the API call until the user scrolls
  );

  // Handle the search button click
  const handleSearch = () => {
    setMovies([]); // Reset movies when a new search is initiated
    setcurrentPage(1); // Reset the page
    setIsFetching(true); // Start fetching
  };

  // Load more movies when the user reaches the bottom of the page
  const loadMoreMovies = () => {
    setcurrentPage((prevPage) => prevPage + 1);
    setIsFetching(true); // Start fetching more data
  };

  // Append fetched movies to the existing list when data is available
  useEffect(() => {
    if (data && isFetching) {
      setMovies((prevMovies: any[]) => [...prevMovies, ...data.data.list]);
      setIsFetching(false); // Stop fetching once data is added
    }
  }, [data, isFetching]);

  // Handle infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        if (!isFetching && !isLoading) {
          loadMoreMovies(); // Load more when the user scrolls to the bottom
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, isLoading]);

  return (
    <>
      <div className="search-bg"></div>
      <Navbar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <Filter
        resActive={resActive}
        setresActive={setresActive}
        sortActive={sortActive}
        setsortActive={setsortActive}
        typeActive={typeActive}
        settypeActive={settypeActive}
      />

      {/* Display the Movies or Loading/Error state */}
      {isLoading && currentPage === 1 ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error fetching data</div>
      ) : (
        <>
          <Movies movies={movies} />
          {isFetching && <div>Loading more...</div>}
        </>
      )}
    </>
  );
};

export default Main;
