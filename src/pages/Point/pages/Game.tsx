import { FC, useState, Fragment, useMemo, useRef, useEffect } from "react";
import { useRequest, useSafeState, useLockFn } from "ahooks";
import { useSpring, animated } from "@react-spring/web";
import { GameHead, Loader, Panel, Alert } from "../components";
import { getLotteryItems, sendSpin } from "../api";
import { sortWith, ascend, prop } from "ramda";
import dayjs from "dayjs";
import fakeUser from "../imgs/avat.svg";
import numeral from "numeral";
// @ts-ignore
import { LuckyWheel } from "@lucky-canvas/react";
import { useWatch } from "react-hook-form";
import newBg from "../imgs/newBg.jpg";
import newHead from "../imgs/newHead.png";
import crowd from "../imgs/crowd.png";
import btnbg from "../imgs/btnbg.png";
import diamond from "../imgs/diamond.svg";
import left from "../imgs/left.svg";
import right from "../imgs/right.svg";
import { useGetUserQuery } from "../../../pages/profile/services/profileApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import lock from "../imgs/lock.png";
import cc from "../../Point/coupon.png";
import TextVirtual from "./TextVirtual";
import { useNavigate } from "react-router-dom";

export const Game = () => {
  const myLucky = useRef<any>();
  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const [spinLoad, setSpinLoad] = useState(false);
  const { data, error, loading, refresh } = useRequest<any, any>(() =>
    getLotteryItems()
  );
  const token = parsedLoggedIn?.data?.access_token;
  const { data: userData, refetch } = useGetUserQuery(undefined, {
    skip: !token,
  });
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  // staging
  const parsedUserData = JSON.parse(userData || "{}");

  //prod
  // const parsedUserData = userData;

  console.log(parsedUserData);

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
  const [swiperInstance, setSwiperInstance] = useState(null);

  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(true);
  const [spinGroups, setSpinGroups] = useState<any[]>([]);
  const myLuckyRefs = useRef<any[]>([]);
  const currentGroup = spinGroups[activeIndex];
  const isLocked = !currentGroup?.is_unlocked;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex);
    setActiveIndex(swiper.activeIndex);
    setCanSlidePrev(!swiper.isBeginning);
    setCanSlideNext(!swiper.isEnd);
  };

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

  // console.log(userData);

  // useEffect(() => {
  //   const list: any[] = [];
  //   console.log(data?.data)
  //   // @ts-ignore
  //   const sortList = sortWith([ascend(prop("id"))])(data?.data?.prizes ?? []);
  //   sortList.forEach((prize: any) => {
  //     list.push({
  //       background: "#FFF7DF",
  //       fonts: [
  //         {
  //           text: prize.name,
  //           fontColor: "#E1281E",
  //           fontSize: 16,
  //           fontWeight: 500,
  //           top: 10,
  //           fontStyle: "PingFang SC",
  //         },
  //       ],
  //       imgs: [
  //         {
  //           src: prize.image,
  //           top: 40,
  //           width: 24,
  //           height: 24,
  //         },
  //       ],
  //     });
  //   });

  //   setPrizes(list);
  // }, [data?.data]);

  const getButtonConfig = (group: any) => {
    const defaultImg = {
      src: "./pointer.png",
      top: -60,
      width: 100,
      height: 115,
    };

    return [
      {
        radius: "40%",
        pointer: true,
        imgs: group?.spinwheel_image
          ? [
              {
                src: group.spinwheel_image,
                top: -60,
                width: 100,
                height: 115,
              },
            ]
          : [defaultImg],
      },
    ];
  };

  const buttonConfigs = data?.data?.prize_groups?.map((group: any) =>
    getButtonConfig(group)
  );

  useEffect(() => {
    if (!data?.data?.prize_groups) return;

    const formattedGroups = data.data.prize_groups.map((group: any) => {
      const sorted = group.prizes.sort((a: any, b: any) => a.id - b.id);

      const formattedPrizes = sorted.map((prize: any) => ({
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
      }));

      return {
        group_id: group.group_id,
        name: group.name,
        prizes: formattedPrizes,
        free_draws_per_day: group.free_draws_per_day,
        is_unlocked: group.is_unlocked,
      };
    });

    setSpinGroups(formattedGroups); // <-- array of spin configurations
  }, [data?.data]);

  const handleEnd = () => {
    setLockid(false);
    refresh();
    refetch();
    setSpinLoad(false);
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

  // const handleStart = useLockFn(async () => {
  //   const obj = data?.data;
  //   if (!obj.open_now) {
  //     setMsg({
  //       show: true,
  //       msg: obj.open_hours_text,
  //     });
  //     return;
  //   }
  //   if (!hasNext || lockid) {
  //     return;
  //   }

  //   if (!loading) {
  //     setLockid(true);
  //     setPrizeItem(undefined);
  //     let index = 0;

  //     try {
  //       const res = await sendSpin();
  //       myLucky.current.play();
  //       // @ts-ignore
  //       const sortList = sortWith([ascend(prop("id"))])(
  //         data?.data?.prizes ?? []
  //       );
  //       sortList?.forEach?.((i: any, k: number) => {
  //         if (i.id === res.data.prize.id) {
  //           index = k;
  //         }
  //       });

  //       // @ts-ignore
  //       setHasNext(res?.data?.has_next);
  //       setPrizeItem(res.data);
  //       refresh();
  //     } catch (e) {
  //       setLockid(!true);
  //       setMsg({
  //         show: true,
  //         msg: e,
  //       });
  //     }
  //     myLucky.current.stop(index);
  //   }
  // });

  const handleStart = useLockFn(async () => {
    const obj = data?.data;
    const currentGroup = spinGroups[activeIndex];

    if (!obj.open_now || !currentGroup?.is_unlocked) {
      setMsg({
        show: true,
        msg: obj?.open_hours_text || "活动暂未开放",
      });
      return;
    }

    if (!hasNext || lockid || !currentGroup) return;

    const luckyRef = myLuckyRefs.current[activeIndex];
    if (!luckyRef) return;

    if (!loading) {
      setSpinLoad(true);
      setLockid(true);
      setPrizeItem(undefined);
      let index = 0;
      console.log(currentGroup.group_id);

      try {
        // You may need to pass group_id to the API here:
        const res = await sendSpin(currentGroup.group_id);

        luckyRef.play();

        const sorted = [...currentGroup.prizes].sort((a, b) => a.id - b.id);
        sorted.forEach((p, i) => {
          if (p.name === res.data.prize.name) {
            index = i;
          }
        });

        setHasNext(res?.data?.has_next);
        setPrizeItem(res.data);
        refresh();
      } catch (e) {
        setMsg({ show: true, msg: e });
      }

      luckyRef.stop(index);
      setLockid(false);
    }
  });

  const groupImages = data?.data?.prize_groups?.map((group: any) => ({
    id: group.group_id,
    src: group.image,
    isUnlocked: group.is_unlocked,
    name: group.name,
  }));

  const userIntegral = parsedUserData?.data?.integral ?? 0;

  // Determine current level and level bounds
  let levelMin = 0;
  let levelMax = 2000;

  if (userIntegral >= 4000) {
    levelMin = 4000;
    levelMax = 6000;
  } else if (userIntegral >= 2000) {
    levelMin = 2000;
    levelMax = 4000;
  }

  const levelRange = levelMax - levelMin;
  const progressPercent = Math.min(
    ((userIntegral - levelMin) / levelRange) * 100,
    100
  );

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
            {/* 2025-06-15-16:30 */}
            {data?.data?.end_date ?? "2025-06-15-16:30"}
          </span>
        </div>
        {/* userBox */}
        <div className="new_user_box p-[12px] w-[350px] flex justify-between items-center">
          {/* user */}
          <div className=" flex justify-center items-center gap-[8px]">
            <img
              className=" w-[48px] h-[48px] rounded-full"
              src={
                parsedUserData?.data?.avatar
                  ? parsedUserData?.data?.avata
                  : fakeUser
              }
              alt=""
            />
            <div className="">
              <h1 className=" text-[#512D00] text-[16px] font-[700]">
                {parsedUserData?.data?.nickname ?? "user"}
              </h1>
              <img
                className=" w-[72px] h-[24px]"
                src={parsedUserData?.data?.level}
                alt=""
              />
            </div>
          </div>
          {/* btn */}
          <button
            onClick={() => navigate("/point_info")}
            className=" relative w-[110px] overflow-hidden flex justify-center items-center py-[15px] gap-[4px] rounded-[14px] px-[20px]"
          >
            <img src={btnbg} className=" absolute z-[1]" alt="" />
            <div className=" absolute flex gap-1 justify-center items-center z-[2]">
              <span className=" text-white text-[10px] font-[700]">
                获取抽奖劵
              </span>
              <img src={diamond} alt="" />
            </div>
          </button>
        </div>

        {/* progress */}
        <div className="relative w-[350px] max-w-4xl mx-auto py-5">
          {/* Background Line (incomplete section) */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-white/40 rounded-full transform -translate-y-1/2 z-0" />

          {/* Progress Line (completed section, use actual percent if needed) */}
          <div
            className="absolute top-1/2 left-0 h-3 bg-white rounded-full transform -translate-y-1/2 z-0"
            style={{
              // width: `${((currentIndex + 1) / groupImages?.length) * 100}%`,
              width: `${progressPercent}%`,
            }}
          />

          {/* Step Images */}
          <div className="relative flex justify-between items-center z-10 px-2">
            {groupImages?.map((img: any, idx: any) => (
              <div
                key={img.id}
                className="relative w-[54px] flex flex-col items-center h-[38px]"
              >
                <img
                  src={img.src || crowd}
                  alt={`Step ${idx + 1}`}
                  className={`w-full h-full object-cover`}
                />
                <h1
                  className={` text-[12px] ${
                    currentIndex === idx ? "text-white" : "text-white/60"
                  }`}
                >
                  {img.name}
                </h1>
              </div>
            ))}
          </div>
        </div>

        {/* spin */}
        <div className="relative w-full h-[468px] hidden">
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

        {/* newSpin */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          onSwiper={(swiper: any) => {
            setSwiperInstance(swiper);
            setCanSlidePrev(!swiper.isBeginning);
            setCanSlideNext(!swiper.isEnd);
          }}
          onSlideChange={handleSlideChange}
          slidesPerView={1}
          spaceBetween={50}
          className="relative w-full h-[468px]"
        >
          {spinGroups.map((group, index) => (
            <SwiperSlide key={group.group_id}>
              <div className="relative w-full h-[468px]">
                <img
                  alt=""
                  src="./zp.png"
                  className={`absolute z-[1] left-[50%] ${
                    smallWidthRatio
                      ? "ml-[-160px] w-[320px]"
                      : "ml-[-195px] w-[390px]"
                  }`}
                />
                {/* spin */}
                <div
                  className={`absolute z-[2] flex justify-center items-center w-full h-[408px] ${
                    smallWidthRatio ? "mt-[-37px]" : ""
                  }`}
                >
                  <LuckyWheel
                    ref={(el: any) => (myLuckyRefs.current[index] = el)}
                    // ref={myLucky}
                    width={smallWidthRatio ? "220px" : "270px"}
                    height={smallWidthRatio ? "220px" : "270px"}
                    defaultConfig={{ gutter: 6 }}
                    blocks={blocks}
                    prizes={group.prizes}
                    // buttons={buttons}
                    buttons={buttonConfigs?.[index]}
                    onStart={handleStart}
                    onEnd={handleEnd}
                  />

                  {/* virtual_lottery_winners */}
                  <div className=" absolute w-full flex justify-center bottom-[-30px]">
                    <TextVirtual data={data} />
                  </div>
                </div>

                {/* Optional: group-specific info */}
                <div
                  className={`h-[20px] w-[128px] absolute z-[3] ${
                    smallWidthRatio ? "bottom-[148px]" : "bottom-[80px]"
                  } left-[50%] ml-[-58px] text-[13px] font-[900] text-white truncate`}
                >
                  <span className=" flex justify-center items-center">
                    抽奖劵 x {parsedUserData?.data?.lottery_tickets}{" "}
                    <img src={cc} alt="" />{" "}
                  </span>

                  {/* {data?.data?.open_now ? (
                    <span>
                      今日免费抽奖次数{data?.data?.today_available_free_num}/
                      {data?.data?.free_draws_per_day}
                    </span>
                  ) : (
                    <span>{data?.data?.open_hours_text}</span>
                  )} */}
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Buttons outside of loop */}
          {/* {canSlidePrev && ( */}
          <div className="custom-prev absolute left-0 top-[42%] transform -translate-y-1/2 z-10 cursor-pointer">
            <button className="w-10 h-10 rounded-full shadow-md flex items-center justify-center">
              <img src={left} alt="prev" />
            </button>
          </div>
          {/* )} */}
          {/* {canSlideNext && ( */}
          <div className="custom-next absolute right-0 top-[42%] transform -translate-y-1/2 z-10 cursor-pointer">
            <button className="w-10 h-10 rounded-full shadow-md flex items-center justify-center">
              <img src={right} alt="next" className="w-4 h-4" />
            </button>
          </div>
          {/* )} */}
        </Swiper>

        {loading || spinLoad ? (
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
                disabled={isLocked}
                onTouchEnd={handleStart}
                onClick={handleStart}
                className="w-11/12 h-12 mb-8 py-3 bg-amber new_spin_button rounded-[49px] shadow-inner border border-orange-200 justify-center items-center inline-flex gap-1  bottom-[50px]"
              >
                <div className="text-center text-orange-900 text-base font-medium leading-normal">
                  {/* 开始抽奖{" "}
                  {data?.data?.today_available_free_num >= 1
                    ? ``
                    : `(消耗${data?.data?.points_per_draw}积分)`} */}
                  {isLocked ? "尚未解锁" : "开始抽奖"}
                </div>
                {isLocked && <img src={lock} alt="" />}
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
