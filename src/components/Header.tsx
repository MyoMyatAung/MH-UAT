import { FC } from 'react';
import logo from '../assets/logo.svg';

const Header: FC = () => {
  return (
    <header className="bg-gray-900 py-5 px-4 flex items-center justify-between shadow-md">
      {/* Logo Section */}
      <div className="flex items-center flex-shrink-0 space-x-2"> {/* Flexbox for horizontal alignment */}
        <img
          src={logo}
          alt="Logo"
          className="h-10" // Reduced size to fit better on mobile screens
        />
        <span className="text-white text-lg font-semibold leading-none">电影手</span> {/* Adjusted text size for mobile */}
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-xs ml-4"> {/* Adjust max-width to make it responsive on mobile */}
        <div className="relative rounded-full bg-gray-800 px-3 py-2 shadow-inner">
          <input
            type="text"
            placeholder="搜索影片..."
            className="bg-transparent text-white placeholder-gray-400 text-sm w-full focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;