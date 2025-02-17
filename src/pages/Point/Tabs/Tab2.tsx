import React from "react";
import coin from "../../../assets/Point/Challenge/coin.png";

interface Tab2Props {
  taskList: any;
}

const Tab2: React.FC<Tab2Props> = ({ taskList }) => {
  console.log(taskList);
  return (
    <div className=" flex flex-col gap-[18px]">
      {taskList?.map((tt: any) => (
        <div className=" w-full grid grid-cols-7 pb-[20px] gap-[10px">
          <div className="">
            <img className=" w-[40px] h-[40px]" src={tt?.icon} alt="" />
          </div>
          <div className=" col-span-4">
            <h1 className=" text-white font-[400] text-[16px]">{tt?.title}</h1>
            <span className=" text-white/80 text-[12px] font-[400]">
              {tt.description}
            </span>
          </div>
          <div className=" col-span-2 flex flex-col justify-center items-center">
            {tt?.reward !== 0 && (
              <span className=" flex justify-center items-center text-[14px] font-[500] text-[#FF6A33]">
                + {tt.reward} <img className=" w-[18px] h-[18px]" src={coin} alt="" />
              </span>
            )}
            <button></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tab2;
