import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import Explorer from "./pages/explorer";
import Profile from "./pages/profile";
import Player from "./pages/player";
import Login from "./pages/login";
import Header from "./components/Header";
import FooterNav from "./components/FooterNav";
import Detail from "./pages/explorer/Detail";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {" "}
        {/* Full height wrapper */}
        <Header />
        <div className="flex-grow overflow-auto">
          {" "}
          {/* Main content with dynamic height */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/explorer/:id" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/player" element={<Player />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <FooterNav />
      </div>
    </Router>
  );
};

export default App;
