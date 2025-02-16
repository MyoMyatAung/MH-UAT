import React from "react";
import BG from "../../assets/share/BG.png";
import Header from "./Header";
import Top from "./Top";
import { useGetUserQuery } from "../profile/services/profileApi";

const index = () => {
  return (
    <div className=" ">
      <img className=" fixed top-0 z-[-1] w-screen h-screen" src={BG} alt="" />
      {/* header */}
      <Header />
      <Top />
    </div>
  );
};

export default index;
