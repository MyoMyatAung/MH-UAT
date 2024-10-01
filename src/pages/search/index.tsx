import React, { useState } from "react";
import "./search.css";
import Navbar from "./components/Navbar";
import Ads from "./components/Ads";
import History from "./components/History";
import Everyone from "./components/Everyone";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="search-bg">
      <Navbar query={query} setQuery={setQuery} />
      <Ads />
      <History />
      <Everyone />
    </div>
  );
};

export default Search;
