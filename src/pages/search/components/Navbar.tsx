import React from "react";

interface NavbarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void; // Add onSearch prop to trigger search
}

const Navbar: React.FC<NavbarProps> = ({ query, setQuery, onSearch }) => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length !== 0) {
      onSearch(); // Trigger the search
    } else {
      console.log("need query");
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className="flex gap-4 w-full py-2 pt-3 px-5 z-10 input-bg fixed items-center justify-between"
      >
        <div className="absolute left-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
          >
            <path
              d="M14.0482 14.0737L17 17.0248L16.0248 18L13.0737 15.0482C11.9757 15.9285 10.6099 16.4072 9.20262 16.4052C5.77877 16.4052 3 13.6265 3 10.2026C3 6.77877 5.77877 4 9.20262 4C12.6265 4 15.4052 6.77877 15.4052 10.2026C15.4072 11.6099 14.9285 12.9757 14.0482 14.0737ZM12.6657 13.5624C13.5404 12.6629 14.0289 11.4572 14.0269 10.2026C14.0269 7.53687 11.8677 5.37836 9.20262 5.37836C6.53687 5.37836 4.37836 7.53687 4.37836 10.2026C4.37836 12.8677 6.53687 15.0269 9.20262 15.0269C10.4572 15.0289 11.6629 14.5404 12.5624 13.6657L12.6657 13.5624Z"
              fill="white"
              fillOpacity="0.6"
            />
          </svg>
        </div>

        <div className="w-full">
          <input
            value={query}
            type="text"
            className="search-input"
            placeholder="觉醒年代"
            onChange={(e) => setQuery(e.target.value)} // Update the query state on input change
          />
        </div>
        <div className="w-[40px]">
          <button className="search-btn" type="submit">
            搜索
          </button>
        </div>
      </form>
    </div>
  );
};

export default Navbar;
