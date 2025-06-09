import { FC, useState, Fragment, useMemo, useRef, useEffect } from "react";
import { useRequest, useSafeState, useLockFn } from "ahooks";
import { useSpring, animated } from "@react-spring/web";
import { GameHead, Loader, Panel, Alert } from "../components";
import { getLotteryItems, sendSpin } from "../api";
import { sortWith, ascend, prop } from "ramda";
import dayjs from "dayjs";
import numeral from "numeral";
// @ts-ignore
import { LuckyWheel } from "@lucky-canvas/react";
import { useWatch } from "react-hook-form";
import newBg from "../imgs/newBg.jpg";
import newHead from "../imgs/newHead.png";
import crowd from "../imgs/crowd.png";
import btnbg from "../imgs/btnbg.png";
import diamond from "../imgs/diamond.svg";
import { useGetUserQuery } from "../../../pages/profile/services/profileApi";

export const Game = () => {
  const myLucky = useRef<any>();
  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const { data, error, loading, refresh } = useRequest<any, any>(() =>
    getLotteryItems()
  );
  const token = parsedLoggedIn?.data?.access_token;
  const { data: userData } = useGetUserQuery(undefined, {
    skip: !token,
  });
  const [prizeItem, setPrizeItem] = useState<any>(); //中奖物品
  const [hasNext, setHasNext] = useState<boolean>(true); //是否可以抽奖
  const [lockid, setLockid] = useState<boolean>(false); //防抖
  const [msg, setMsg] = useState<any>({
    show: false,
    msg: "",
  });
  const smallWidthRatio = window.innerWidth < 390;
  const [blocks] = useState([{ padding: "0px", background: "#E51D17" }]);
  const [prizes, setPrizes] = useState<any[]>([]);

  const [buttons] = useState([
    {
      radius: "40%",
      pointer: true,
      imgs: [
        {
          src: "./pointer.png",
          top: -60,
          width: 100,
          height: 115,
        },
      ],
    },
  ]);

  console.log(userData);

  useEffect(() => {
    const list: any[] = [];
    // @ts-ignore
    const sortList = sortWith([ascend(prop("id"))])(data?.data?.prizes ?? []);
    sortList.forEach((prize: any) => {
      list.push({
        background: "#FFF7DF",
        fonts: [
          {
            text: prize.name,
            fontColor: "#E1281E",
            fontSize: 16,
            fontWeight: 500,
            top: 10,
            fontStyle: "PingFang SC",
          },
        ],
        imgs: [
          {
            src: prize.image,
            top: 40,
            width: 24,
            height: 24,
          },
        ],
      });
    });

    setPrizes(list);
  }, [data?.data?.prizes?.length]);

  const handleEnd = () => {
    setLockid(false);
    refresh();
    if (prizeItem?.win_status) {
      setMsg({
        show: true,
        msg: `恭喜您获得${prizeItem.prize.name}`,
      });
    } else {
      setMsg({
        show: true,
        msg: `谢谢参与,您未中奖`,
      });
    }
  };

  const handleStart = useLockFn(async () => {
    const obj = data?.data;
    if (!obj.open_now) {
      setMsg({
        show: true,
        msg: obj.open_hours_text,
      });
      return;
    }
    if (!hasNext || lockid) {
      return;
    }

    if (!loading) {
      setLockid(true);
      setPrizeItem(undefined);
      let index = 0;

      try {
        const res = await sendSpin();
        myLucky.current.play();
        // @ts-ignore
        const sortList = sortWith([ascend(prop("id"))])(
          data?.data?.prizes ?? []
        );
        sortList?.forEach?.((i: any, k: number) => {
          if (i.id === res.data.prize.id) {
            index = k;
          }
        });

        // @ts-ignore
        setHasNext(res?.data?.has_next);
        setPrizeItem(res.data);
        refresh();
      } catch (e) {
        setLockid(!true);
        setMsg({
          show: true,
          msg: e,
        });
      }
      myLucky.current.stop(index);
    }
  });

  return (
    <div className="container ">
      <Alert
        {...msg}
        onClose={() => {
          setMsg({ msg: "", show: false });
        }}
      />
      <img alt="" src={newBg} className="fixed w-full h-screen z-0" />
      <GameHead />
      <div className="flex flex-col py-[1px] justify-center items-center relative">
        <div className="px-6 pb-1 relative flex justify-center">
          <img alt="" src={newHead} className="" />
          <span className="new_date_head_text text-[14px] font-[700] absolute bottom-[35px]">
            2025-06-15-16:30
          </span>
        </div>
        {/* userBox */}
        <div className="new_user_box p-[12px] w-[350px] flex justify-between items-center">
          {/* user */}
          <div className=" flex justify-center items-center gap-[8px]">
            <img
              className=" w-[48px] h-[48px] rounded-full"
              src={userData?.data?.avatar}
              alt=""
            />
            <div className="">
              <h1 className=" text-[#512D00] text-[16px] font-[700]">
                {userData?.data?.username}
              </h1>
              <img
                className=" w-[72px] h-[24px]"
                src={userData?.data?.level}
                alt=""
              />
            </div>
          </div>
          {/* btn */}
          <button className=" relative w-[110px] overflow-hidden flex justify-center items-center py-[15px] gap-[4px] rounded-[14px] px-[20px]">
            <img src={btnbg} className=" absolute z-[1]" alt="" />
            <div className=" absolute flex z-[2]">
              <span className=" text-white text-[10px] font-[700]">
                我要升级
              </span>
              <img src={diamond} alt="" />
            </div>
          </button>
        </div>
        {/* progress */}
        <div className="relative w-[350px] max-w-4xl mx-auto py-3">
          {/* Background Line (incomplete section) */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-white/40 rounded-full transform -translate-y-1/2 z-0" />
          {/* Progress Line (completed section) */}
          <div
            className="absolute top-1/2 left-0 h-3 bg-white rounded-full transform -translate-y-1/2 z-0"
            style={{ width: "50%" }}
          />{" "}
          {/* Adjust this width based on progress */}
          {/* Icons */}
          <div className="relative flex justify-between items-center z-10">
            <img src={crowd} alt="Step 1" className="w-16 h-16" />
            <img src={crowd} alt="Step 2" className="w-16 h-16" />
            <img src={crowd} alt="Step 3" className="w-16 h-16" />
          </div>
        </div>

        {/* spin */}
        <div className="relative w-full h-[468px]">
          <img
            alt=""
            src="./zp.png"
            className={`absolute z-[1]  left-[50%] ${
              smallWidthRatio
                ? "ml-[-160px]  w-[320px]"
                : "ml-[-195px] w-[390px] "
            }`}
          />
          <div
            className={`absolute z-[2] flex justify-center items-center w-full h-[408px] ${
              smallWidthRatio ? "mt-[-37px]" : ""
            }`}
          >
            <LuckyWheel
              ref={myLucky}
              width={smallWidthRatio ? "220px" : "270px"}
              height={smallWidthRatio ? "220px" : "270px"}
              defaultConfig={{
                gutter: 6,
              }}
              blocks={blocks}
              prizes={prizes}
              buttons={buttons}
              onStart={handleStart}
              onEnd={handleEnd}
            />
          </div>
          <div
            className={`h-[20px] w-[128px] absolute z-[3] ${
              smallWidthRatio ? "bottom-[148px]" : "bottom-[80px]"
            } left-[50%] ml-[-58px] text-[12px] text-white truncate`}
          >
            {data?.data?.open_now ? (
              <span>
                今日免费抽奖次数{data?.data?.today_available_free_num}/
                {data?.data?.free_draws_per_day}
              </span>
            ) : (
              <span>{data?.data?.open_hours_text}</span>
            )}
          </div>
        </div>

        {loading ? (
          <button
            //  onTouchEnd={handleStart}
            //  onClick={handleStart}
            className="w-11/12 h-12 px-[100px] mb-8 py-3 bg-zinc-300 rounded-[49px] shadow shadow-inner border border-zinc-300 justify-center items-center inline-flex  bottom-[50px] z-[999]"
          >
            <div className="text-center text-orange-900 text-base font-medium leading-normal">
              加载中。。。
            </div>
          </button>
        ) : (
          <>
            {data?.data?.open_now ? (
              <button
                onTouchEnd={handleStart}
                onClick={handleStart}
                className="w-11/12 h-12 mb-8 py-3 bg-amber-400 rounded-[49px] shadow-inner border border-orange-200 justify-center items-center inline-flex  bottom-[50px]"
              >
                <div className="text-center text-orange-900 text-base font-medium leading-normal">
                  开始抽奖{" "}
                  {data?.data?.today_available_free_num >= 1
                    ? ``
                    : `(消耗${data?.data?.points_per_draw}积分)`}
                </div>
              </button>
            ) : (
              <button
                onTouchEnd={handleStart}
                onClick={handleStart}
                className="w-11/12 h-12 mb-8 px-[100px] py-3 bg-zinc-300 rounded-[49px] shadow shadow-inner border border-zinc-300 justify-center items-center inline-flex bottom-[50px] z-[99]"
              >
                <div className="text-center text-neutral-400 text-base font-medium leading-normal">
                  活动暂未开放
                </div>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
