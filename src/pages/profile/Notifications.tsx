import Header from "./components/notifications/Header";
import Sidebar from "./components/notifications/Sidebar";
import Content from "./components/notifications/Content";
import "./profile.css";

const Notifications = () => {
  return (
    <div className="bg-[#161619] text-white">
      <Header />
      <div className="border-b-[1px] border-[#242426] mb-5"></div>
      <div className="h-[160px]  bg-black mx-5 flex mb-5 rounded-lg border-2 border-[#242426] justify-center items-center">
        <h1>Ads</h1>
      </div>
      <div className="grid grid-cols-3 gap-2 h-full pb-[100px]">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-2">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
