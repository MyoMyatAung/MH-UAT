import React, { useState } from "react";
import BG from "../../assets/share/BG.png";
import Header from "./Header";
import Top from "./Top";
import { useGetUserQuery } from "../profile/services/profileApi";
import Tabs from "./Tabs";
import Tab2 from "./Tabs/Tab2";
import Tab3 from "./Tabs/Tab3";
import Tab1 from "./Tabs/Tab1";
import { useGetDailyTesksQuery } from "./service/PointApi";

const Index = () => {
  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const token = parsedLoggedIn?.data?.access_token;
  const { data: task, isLoading } = useGetDailyTesksQuery("", {
    skip: !token,
  });
  const taskList = task?.data;
  const [activeTab, setActiveTab] = useState(1); 

  const tabs = [
    { title: "积分明细", content: <Tab1 /> }, //point detail
    { title: "积分任务", content: <Tab2 taskList={taskList} /> }, // point task
    { title: "好友邀请", content: <Tab3 /> }, // invite
  ];

  return (
    <div className=" ">
      <img className=" fixed top-0 z-[-1] w-screen h-screen" src={BG} alt="" />
      {/* header */}
      <Header />
      <Top />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className=" px-[20px]">
        {tabs[activeTab ? activeTab - 1 : activeTab - 1]?.content}
      </div>
    </div>
  );
};

export default Index;
