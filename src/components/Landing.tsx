import React, { useEffect, useState } from "react";
import land from "../assets/login/land.png";
import hunter from "../assets/login/hunter.png";
import { useDispatch } from "react-redux";
import { setPanding } from "../features/login/ModelSlice";
interface LandingProps {}

const Landing: React.FC<LandingProps> = ({}) => {
    const dispatch = useDispatch()
  const [skip, setSkip] = useState(3);
  useEffect(() => {
    const countdown = setInterval(() => {
      if (skip > 0) {
        setSkip((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [skip]);
  return (
    <div className=" relative">
      <img src={land} className=" object-cover w-screen h-screen" alt="" />
      <div className=" absolute bottom-0 bg-[#190A01] py-[45px] px-[85px] w-screen h-[150px]">
        <img src={hunter} alt="" />
      </div>
      {/* countdown */}
      <div
      onClick={() => dispatch(setPanding(false))}
        style={{
          borderRadius: "52px",
          background: "rgba(0, 0, 0, 0.98)",
          backdropFilter: "blur(2px)",
        }}
        className=" absolute top-[34px] right-[30px]"
      >
        <h1 className=" text-white text-[10px] font-[400] py-[4px] px-[12px]">
          跳过广告 <span>{skip}</span>
        </h1>
      </div>
    </div>
  );
};

export default Landing;
