import React, { useEffect, useState } from "react";
import { useGetCommentListQuery, useLikeCommentMutation } from "../services/socialApi";
import "../social.css";
import heartt from "../Frame.png";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../../pages/search/components/Loader";
import nc from "../Vector.png";
import { useDispatch } from "react-redux";
import { showToast } from "../../../pages/profile/error/ErrorSlice";
import { setAuthModel } from "../../../features/login/ModelSlice";

const Comment: React.FC<any> = ({ list, isFetching }) => {
  const [likeCmt, { isLoading: isLikeloading }] = useLikeCommentMutation(); 
  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const token = parsedLoggedIn?.data?.access_token;

  const [likeStatus, setLikeStatus] = useState<{
    [key: string]: { liked: boolean; count: number };
  }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    const newFollowStatus: { [key: string]: boolean } = {};
    const newLikeStatus: { [key: string]: { liked: boolean; count: number } } =
      {};
    list.forEach((post: any) => {
      newLikeStatus[post.id] = {
        liked: post.is_liked,
        count: post.comment_like_count,
      };
    });
    setLikeStatus(newLikeStatus);
  }, [list]);

  const handleLikeChange = async (postId: any, currentStatus: any) => {
    if (!token) {
      dispatch(setAuthModel(true));
      return;
    }
    console.log(postId, currentStatus.liked);

    try {
      const response = await likeCmt({
        id: postId,
        is_like: !currentStatus.liked,
      }).unwrap();
      setLikeStatus((prev) => ({
        ...prev,
        [postId]: {
          liked: !currentStatus.liked,
          count: currentStatus.liked
            ? +currentStatus.count - 1
            : +currentStatus.count + 1,
        },
      }));
    } catch (error) {
      console.log(error)
      dispatch(
        showToast({
          message: (error as any)?.data?.msg || "修改昵称失败",
          type: "error",
        })
      );
    }
  };

  console.log(list);

  return (
    <div className="py-[12px] bg-[#161619]">
      <h1 className="text-white text-[16px] font-[400]">评论</h1>
      {list?.length === 0 && !isFetching ? (
        <div className="w-full flex flex-col justify-center items-center py-[40px] gap-[10px]">
          <img src={nc} alt="No Comments" />
          <span>还没有评论</span>
        </div>
      ) : (
        <>
          <div className="pt-[15px] flex flex-col gap-[30px]">
            {list.map((cmt: any, index: any) => (
              <div key={index} className="flex gap-[10px]">
                {/* Avatar */}
                {cmt.user.avatar ? (
                  <img
                    className="w-[40px] h-[40px] rounded-full border border-[#4A4A4A]"
                    src={cmt.user?.avatar}
                    alt=""
                  />
                ) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 56 50"
                      fill="none"
                    >
                      <g filter="url(#filter0_d_1594_11143)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M28.0605 0.013916C41.2937 0.013916 51.9873 10.7075 51.9873 24.0744C51.9873 31.1588 48.9129 37.575 44.1008 41.9861C40.8927 24.8764 15.2282 24.8764 12.0202 41.9861C7.07439 37.575 4 31.1588 4 24.0744C4 10.7075 14.6935 0.013916 28.0605 0.013916ZM28.0605 12.0441C32.6052 12.0441 36.348 15.7869 36.348 20.3316C36.348 24.8764 32.6052 28.6191 28.0605 28.6191C23.5157 28.6191 19.773 24.8764 19.773 20.3316C19.773 15.7869 23.5157 12.0441 28.0605 12.0441Z"
                          fill="white"
                          fillOpacity="0.8"
                          shapeRendering="crispEdges"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_1594_11143"
                          x="0"
                          y="0.013916"
                          width="55.9873"
                          height="49.9722"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_1594_11143"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1594_11143"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                )}
                <div className="w-full flex flex-col gap-[8px]">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center gap-[5px]">
                      <span className="text-[14px] font-[400] leading-[16px] text-white/60">
                        {cmt.user.nickname}
                      </span>
                      {cmt?.user?.level && (
                        <img
                          src={cmt?.user?.level}
                          alt=""
                          className="h-6 w-auto"
                        />
                      )}
                    </div>
                    <div className="text-[14px] font-[400] text-white/60">
                      {cmt.create_time}
                    </div>
                  </div>
                  <h1 className="text-white text-[14px] font-[400] leading-[20px]">
                    {cmt.content}
                  </h1>
                  <div className="flex justify-between items-center">
                    <button className="px-[12px] py-[8px] bg-[#2B2B2B] rounded-[100px] text-white text-[12px] font-[400]">
                      回复
                    </button>
                    <p
                      onClick={() =>
                        handleLikeChange(cmt.id, likeStatus[cmt.id])
                      }
                      className="text-white/40 text-[12px] font-[400] leading-[14px] flex justify-center items-center gap-[2px]"
                    >
                      {likeStatus[cmt.id]?.liked ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="17"
                          viewBox="0 0 18 17"
                          fill="none"
                        >
                          <path
                            d="M12.044 0.697327C15.2682 0.697327 17.3346 3.28274 17.3346 6.76233C17.3346 9.46253 14.8913 12.4363 10.0773 15.7777C9.76122 15.9967 9.38583 16.114 9.0013 16.114C8.61677 16.114 8.24139 15.9967 7.92526 15.7777C3.1113 12.4363 0.667969 9.46253 0.667969 6.76233C0.667969 3.28274 2.73443 0.697327 5.95859 0.697327C7.12297 0.697327 7.91276 1.1042 9.0013 2.02733C10.0901 1.10441 10.8796 0.697327 12.044 0.697327Z"
                            fill="#FF0051"
                          />
                        </svg>
                      ) : (
                        <img
                          className="w-[20px]  h-[20px]"
                          src={heartt}
                          alt=""
                        />
                      )}
                      {likeStatus[cmt.id]?.count}万
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
