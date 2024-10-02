import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import FooterNav from "./components/FooterNav";

// Lazy load the pages
const Home = React.lazy(() => import("./pages/home"));
const Search = React.lazy(() => import("./pages/search"));
const Main = React.lazy(() => import("./pages/search/Main"));
const Explorer = React.lazy(() => import("./pages/explorer"));
const Profile = React.lazy(() => import("./pages/profile"));
const Player = React.lazy(() => import("./pages/player"));
const Login = React.lazy(() => import("./pages/login"));
const Detail = React.lazy(() => import("./pages/explorer/Detail"));
const History = React.lazy(() => import("./pages/profile/History"));
const Settings = React.lazy(() => import("./pages/profile/Settings"));
const Notifications = React.lazy(() => import("./pages/profile/Notifications"));

// ProtectedRoute component to handle route guarding
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem("authToken"); // Check if the user is authenticated
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("authToken"); // Check if the user is authenticated

  // Hide header and footer when the current path is "/player/:id" or "/login"
  const hideHeaderFooter =
    location.pathname.startsWith("/player") ||
    location.pathname === "/login" ||
    location.pathname.startsWith("/search") ||
    location.pathname === "/search_overlay" ||
    location.pathname === "/profile" ||
    location.pathname === "/settings" ||
    location.pathname === "/notifications" ||
    location.pathname === "/history";

  useEffect(() => {
    // Redirect to login if not logged in and trying to access any route other than login
    if (!isLoggedIn && location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, [isLoggedIn, location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header */}
      {!hideHeaderFooter && <Header />}

      <div className="flex-grow overflow-auto ">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Protect routes that need authentication */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                // <ProtectedRoute>
                <Main />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/search_overlay"
              element={
                // <ProtectedRoute>
                <Search />
                // </ProtectedRoute>
              }
            />

            <Route
              path="/explorer"
              element={
                <ProtectedRoute>
                  <Explorer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explorer/:id"
              element={
                <ProtectedRoute>
                  <Detail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/player/:id"
              element={
                <ProtectedRoute>
                  <Player />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>

      {/* Conditionally render FooterNav */}
      {!hideHeaderFooter && <FooterNav />}
      {location.pathname === "/profile" && <FooterNav />}
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
