import { FC } from 'react';
import logo from '../assets/logo.svg';

const Header: FC = () => {
  return (
    <header className="bg-header py-4 px-8 flex items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-10 mr-4" // Adjust height as needed
        />
        <span className="text-text text-2xl font-bold">电影手</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 ml-8">
        <div className="relative rounded-full bg-white bg-opacity-20 px-4 py-2">
          <input
            type="text"
            placeholder="觉醒年代"
            className="bg-transparent text-text placeholder-gray-400 w-full focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg
              className="h-6 w-6 text-text"
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
