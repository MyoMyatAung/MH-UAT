import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import Explorer from "./pages/explorer";
import Profile from "./pages/profile";
import Player from "./pages/player";
import Login from "./pages/login";
import Header from "./components/Header";
import FooterNav from "./components/FooterNav";
import Detail from "./pages/explorer/Detail";
import History from "./pages/profile/History";
import Settings from "./pages/profile/Settings";
import Notifications from "./pages/profile/Notifications";

const App: React.FC = () => {
  const location = useLocation(); // Get the current route

  // Hide header and footer when the current path is "/player/:id"
  const hideHeaderFooter = location.pathname.startsWith("/player");

  return (
    <div className="flex flex-col min-h-screen"> {/* Full height wrapper */}
      {/* Conditionally render Header */}
      {!hideHeaderFooter && <Header />}
      
      <div className="flex-grow overflow-auto"> {/* Main content with dynamic height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/explorer/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>

      {/* Conditionally render FooterNav */}
      {!hideHeaderFooter && <FooterNav />}
    </div>
  );
};

// Wrap the App component with Router for useLocation to work
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;