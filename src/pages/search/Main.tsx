import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Filter from "./components/Filter";
import { useGetAdsQuery, useGetSearchMovieQuery } from "./services/searchApi";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHistoryData } from "./slice/HistorySlice";

const Main = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {
    data: ads,
    isLoading: adLoading,
    isFetching: adFetching,
  } = useGetAdsQuery();

  const advert = ads?.data?.search_result_up?.data;

  // Get the "query" parameter from the URL
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery); // Initialize from URL
  const [resActive, setresActive] = useState("");
  const [sortActive, setsortActive] = useState("");
  const [typeActive, settypeActive] = useState("");
  const [currentPage, setcurrentPage] = useState(1); // Track the current page
  const [movies, setMovies] = useState<any[]>([]); // Store movies data

  // Fetch movies based on the current page and other filters
  const { data, error, isLoading, isFetching, refetch } =
    useGetSearchMovieQuery(
      {
        keyword: query,
        page: currentPage,
        sort: sortActive,
        type_id: typeActive,
        res_type: resActive,
      },
      { skip: !query } // Skip the API call if query is empty
    );

  // Handle the search button click
  const handleSearch = () => {
    if (query.trim()) {
      dispatch(setHistoryData({ data: query.trim() }));
    }

    setMovies([]); // Reset movies when a new search is initiated
    setcurrentPage(1); // Reset the page
    refetch(); // Explicitly refetch data when search is triggered
  };

  // Load more movies when the user reaches the bottom of the page
  const loadMoreMovies = () => {
    setcurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setcurrentPage(1);
  }, [sortActive, typeActive, resActive, query]);

  useEffect(() => {
    if (data) {
      console.log(data.data.list);
      if (currentPage === 1) {
        setMovies([]);
        setMovies(data.data.list); // Replace movies for a new search
      } else {
        setMovies((prevMovies: any[]) => [...prevMovies, ...data.data.list]); // Append movies for pagination
      }
    }
  }, [data]);

  // Handle infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        if (!isFetching && !isLoading) {
          if (data?.data?.list.length !== 0) {
            console.log("a");
            loadMoreMovies();
          }
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
      {isFetching && currentPage === 1 ? (
        <div className="flex justify-center items-center text-center text-white">
          Loading...
        </div>
      ) : error ? (
        <div>Error fetching data</div>
      ) : (
        <>
          <Movies
            movies={movies}
            advert={advert}
            adFetching={adFetching}
            adLoading={adLoading}
          />
          {isFetching && (
            <div className="text-white text-center">Loading more...</div>
          )}
        </>
      )}
    </>
  );
};

export default Main;
