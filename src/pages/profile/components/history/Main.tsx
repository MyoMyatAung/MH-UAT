import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: string;
  name: string;
  last_episodeid: string;
  progress_time: number;
  cover: string;
}

interface MainProps {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const Main: React.FC<MainProps> = ({
  isEditMode,
  setIsEditMode,
  movies,
  setMovies,
}) => {
  const [filterToggle, setFilterToggle] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState<any[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleToggle = () => {
    setFilterToggle((prev) => !prev);
  };

  const handleMovieSelect = (movieId: string) => {
    setSelectedMovies((prevSelected) =>
      prevSelected.includes(movieId)
        ? prevSelected.filter((id) => id !== movieId)
        : [...prevSelected, movieId]
    );
  };

  const updateLocalStorageAfterDelete = (updatedMovies: Movie[]) => {
    const watchHistory = localStorage.getItem("watchHistory");
    if (watchHistory) {
      const parsedData = JSON.parse(watchHistory);
      console.log("deletemovies", updatedMovies);
      // Remove the movies from localStorage that are no longer in the updatedMovies state
      updatedMovies.forEach((movie) => {
        const movieEntry = Object.keys(parsedData).find(
          (key) => parsedData[key]?.movieDetail?.movieDetail?.id === movie
        );
        console.log(movieEntry);
        if (movieEntry) {
          delete parsedData[movieEntry];
        }
      });

      console.log("p", parsedData);

      // Save the updated data back to localStorage
      localStorage.setItem("watchHistory", JSON.stringify(parsedData));
    }
  };

  const confirmDelete = () => {
    const updatedMovies = movies.filter(
      (movie) => !selectedMovies.includes(movie.id)
    );
    setMovies(updatedMovies);
    setSelectedMovies([]);
    setIsEditMode(false);
    setShowConfirmation(false);

    // Update localStorage after movies are deleted
    updateLocalStorageAfterDelete(selectedMovies);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="bg-[#161619] pb-[100px]">
      <div className="mt-3">
        <div className="flex items-center justify-between bg-[#1B1B1F] px-5 py-1">
          <div className="history-text">Today</div>
          <div className="flex gap-2 items-center">
            <p className="filter-text">Filter the watched videos</p>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filterToggle}
                onChange={handleToggle}
                className="sr-only peer"
              />
              <div
                className={`w-9 h-5 bg-[#606060] hover:bg-[#606060] peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                  filterToggle
                    ? "peer-checked:bg-[#F54100] hover:peer-checked:bg-[#F54100]"
                    : "peer-checked:bg-[#606060]"
                }`}
              ></div>
            </label>
          </div>
        </div>

        <div className="py-3">
          {/* Movie Cards */}
          {movies.map((movie, index) => (
            <div
              key={index}
              className="history-card flex items-center justify-between transition-all duration-300 ease-in-out"
              onClick={(e) => {
                if (isEditMode) {
                  // In edit mode, allow selection
                  if (!(e.target as HTMLElement).closest("input")) {
                    handleMovieSelect(movie.id);
                  }
                } else {
                  // Not in edit mode, redirect to player
                  navigate(`/player/${movie.id}`);
                }
              }}
            >
              {/* Checkbox for Edit Mode */}
              <div
                className={`custom-checkbox transition-transform duration-500 ease-in-out transform ${
                  isEditMode ? "translate-x-0" : "-translate-x-[50px]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedMovies.includes(movie.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleMovieSelect(movie.id);
                  }}
                  className="h-5 w-5 text-[#F54100] border-2 border-gray-600 rounded-full focus:ring-0 focus:outline-none"
                />
              </div>

              <div
                className={`${
                  isEditMode ? "ml-0" : "-ml-7"
                } transition-all duration-300 ease-in-out`}
              >
                <img
                  src={movie.cover}
                  alt={movie.name}
                  className="h-[80px] max-w-[116px]"
                />
              </div>

              <div className="flex justify-between w-full">
                <div>
                  <h1 className="text-[16px] font-semibold">{movie.name}</h1>
                  <p className="text-sm text-gray-400">
                    {movie.last_episodeid}, Viewed {movie.progress_time}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`fixed z-10 bottom-0 gap-3 w-full bg-[#1B1B1F] p-6 flex justify-between items-center  transition-transform duration-300 ease-in-out ${
            isEditMode ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            className="w-[50%] cancel-all"
            onClick={() => setSelectedMovies([])}
          >
            Cancel all
          </button>
          <button
            className="delete-all w-[50%]"
            onClick={handleDelete}
            disabled={selectedMovies.length === 0}
          >
            Delete {selectedMovies.length > 0 && `${selectedMovies.length}`}
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 z-20 bg-black bg-opacity-80 flex justify-center items-center">
            <div className="bg-[#242428] confirm rounded-2xl mx-10 text-center shadow-lg">
              <h2 className="p-5">
                Are you sure you want to clear all History?
              </h2>
              <div className="flex justify-between">
                <button
                  className="text-white w-[50%] p-3 border-t-[1px] border-r-[1px] border-gray-500"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="text-[#f54100] w-[50%] p-3 border-t-[1px] border-gray-500"
                  onClick={confirmDelete}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
