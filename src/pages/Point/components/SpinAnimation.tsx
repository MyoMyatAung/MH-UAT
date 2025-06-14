import React, { useState } from "react";
import AnimationLoader from "./animation-loader";
import loadingAnimation from "../../../assets/Point/animation.json";
import pack from "../../../assets/Point/pack.json";
import mall from "../../../assets/Point/mall.json";
import closeSpin from "../../../assets/Point/closeSpin.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthModel } from "../../../features/login/ModelSlice";
import { motion, AnimatePresence } from "framer-motion";

interface SpinAnimationProps {
  open: any; // or more specific: open: boolean or open: SomeType
}

const SpinAnimation: React.FC<SpinAnimationProps> = ({ open }) => {
  console.log("open =>", open);

  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const token = parsedLoggedIn?.data?.access_token;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userHasClosedAnimation, setUserHasClosedAnimation] = useState(
    sessionStorage.getItem("animationClosed") === "true"
  );
  const [showLoading, setShowLoading] = useState(false);

  const handleAnimationClick = (name: string) => {
    if (!token) {
      dispatch(setAuthModel(true));
    } else {
      navigate(`/${name}`);
      // setUserHasClosedAnimation(true);
      // sessionStorage.setItem("animationClosed", "true");
    }
  };

  const toggleLoading = () => {
    setShowLoading((prev) => !prev);
  };

  return (
    <>
      {!userHasClosedAnimation && (
        <div className="fixed bottom-[5rem] right-2 z-[9999] rounded-full p-2">
          <div className="relative flex flex-col items-center">
            {/* Close Button */}
            <button className="absolute bottom-[5rem] right-2 bg-white rounded-full w-5 h-5 flex items-center justify-center text-black z-[10000]">
              <img
                onClick={() => {
                  setUserHasClosedAnimation(true);
                  sessionStorage.setItem("animationClosed", "true");
                }}
                src={closeSpin}
                alt=""
              />
            </button>

            {/* Loading Animation with Bounce */}
            <AnimatePresence>
              {showLoading && (
                <motion.div
                  className="flex flex-col"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {open
                    ?.filter((item: any) => item.is_open)
                    .map((item: any) => {
                      const { type } = item;

                      if (type === "lottery") {
                        return (
                          <AnimationLoader
                            key={type}
                            animationData={loadingAnimation}
                            width={90}
                            height={90}
                            onClick={() => handleAnimationClick("game")}
                          />
                        );
                      }

                      if (type === "point_mall") {
                        return (
                          <AnimationLoader
                            key={type}
                            animationData={mall}
                            width={70}
                            height={70}
                            onClick={() => handleAnimationClick("point_mall")}
                          />
                        );
                      }

                      return null;
                    })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pack Animation */}
            <div onClick={toggleLoading}>
              <AnimationLoader animationData={pack} width={100} height={100} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpinAnimation;
