import React, { useState } from "react";
import AnimationLoader from "./animation-loader";
import loadingAnimation from "../../../assets/Point/animation.json";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthModel } from "../../../features/login/ModelSlice";

interface SpinAnimationProps {}

const SpinAnimation: React.FC<SpinAnimationProps> = ({}) => {
  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const token = parsedLoggedIn?.data?.access_token;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userHasClosedAnimation, setUserHasClosedAnimation] = useState(
    sessionStorage.getItem("animationClosed") === "true"
  );

  const handleAnimationClick = () => {
    console.log(token);
    if (!token) {
      dispatch(setAuthModel(true)); // Open the login modal if not logged in
    } else {
      navigate("/game");
      setUserHasClosedAnimation(true);
      sessionStorage.setItem("animationClosed", "true");
    }
  };
  return (
    <>
      {!userHasClosedAnimation && (
        <div className="fixed bottom-[8rem] right-9 z-[9999] rounded-full p-2">
          <div className="relative">
            <button className="absolute top-4 right-7 bg-white rounded-full w-5 h-5 flex items-center justify-center text-black z-[10000]">
              <svg
                onClick={() => {
                  setUserHasClosedAnimation(true);
                  sessionStorage.setItem("animationClosed", "true");
                }}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" rx="10" fill="white" />
                <path
                  d="M10.0001 9.04778L13.3336 5.71429L14.2858 6.66653L10.9523 10L14.2858 13.3335L13.3336 14.2857L10.0001 10.9522L6.66659 14.2857L5.71436 13.3335L9.04784 10L5.71436 6.66653L6.66659 5.71429L10.0001 9.04778Z"
                  fill="black"
                />
              </svg>
            </button>
            <AnimationLoader
              animationData={loadingAnimation}
              width={120}
              height={120}
              onClick={handleAnimationClick}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SpinAnimation;
