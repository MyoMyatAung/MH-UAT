import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Filter from "./components/Filter";

const Main = () => {
  const [query, setQuery] = useState("");
  return (
    <>
      <div className="search-bg"></div>
      <Navbar query={query} setQuery={setQuery} />
      <Filter />
      <Movies />
    </>
  );
};

export default Main;
