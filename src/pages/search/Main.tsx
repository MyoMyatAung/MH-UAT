import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Filter from "./components/Filter";
import {
  useGetAdsQuery,
  useGetSearchMovieQuery,
  useGetTagsQuery,
} from "./services/searchApi";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHistoryData } from "./slice/HistorySlice";
import Loader from "./components/Loader";

const Main = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {
    data: ads,
    isLoading: adLoading,
    isFetching: adFetching,
  } = useGetAdsQuery();
  const {
    data: tabs,
    isLoading: tabLoading,
    isFetching: tabFetching,
  } = useGetTagsQuery();

  const res_type = tabs?.data?.movie_search_screen?.res_type;
  const sort = tabs?.data?.movie_search_screen?.sort;
  const type = tabs?.data?.movie_search_screen?.type;

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
      <div className="lg:container lg:mx-auto lg:px-[100px]">
        <Filter
          res_type={res_type}
          sort={sort}
          type={type}
          resActive={resActive}
          setresActive={setresActive}
          sortActive={sortActive}
          setsortActive={setsortActive}
          typeActive={typeActive}
          settypeActive={settypeActive}
        />

        {/* Display the Movies or Loading/Error state */}
        {(tabLoading && tabFetching) || (isFetching && currentPage === 1) ? (
          <div className="flex justify-center h-[80vh] items-center text-center text-white">
            <Loader />
          </div>
        ) : (
          <>
            <Movies
              movies={movies}
              advert={advert}
              adFetching={adFetching}
              adLoading={adLoading}
            />
            {isFetching && (
              <div className="text-white flex justify-center pb-4 items-center text-center">
                <Loader />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Main;
