import React, { useEffect, useRef, useState } from "react";
import ImageWithPlaceholder from "./socialImgPlaceholder";
import CustomLightbox from "./CustomLightBox";
import Player from "./Player";
import Comment from "./Comment";
import { useGetCommentListQuery } from "../services/socialApi";
import InfiniteScroll from "react-infinite-scroll-component/dist";
import Loader from "../../search/components/Loader";
import AudioPlayer from "./AudioPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setShowingDetail } from "../../../features/login/ModelSlice";
import DetailHeader from "./DetailHeader";
import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const SocialPostDetail: React.FC<any> = ({
  post,
  openLightbox,
  lightboxStates,
  closeLightbox,
  showCreatedTime,
  activePlayer,
  setActivePlayer,
}) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const { isShowingDetails } = useSelector((state: any) => state.model);
  // console.log(isShowingDetails);
  const dispatch = useDispatch();
  let videoData = useRef<HTMLVideoElement[]>([]);

  const { data, isFetching, refetch, isLoading } = useGetCommentListQuery({
    post_id: post.post_id,
    page,
  });

  useEffect(() => {
    if (isShowingDetails) {
      refetch();
    }
  }, [isShowingDetails, refetch]);

  useEffect(() => {
    dispatch(setShowingDetail(true));
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      setList((prevList) => [...prevList, ...data.data.list]);
      const loadedItems = data?.data.page * data?.data.pageSize;
      //   console.log("text", loadedItems);
      setHasMore(loadedItems < data?.data.total);
    }
  }, [data]);
  // console.log(post)

  const fetchMoreDataCmt = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
    // console.log("Fetching more data...", page);
  };
  //   console.log(post);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleScroll = (event: any) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight === scrollHeight && hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <div
      className="inset-0 px-[10px] fixed w-screen top-0 h-screen bg-background overflow-y-scroll z-[99999]"
      onScroll={(event) => handleScroll(event)}
    >
      <DetailHeader />
      {/* <h1>{post.post_id}</h1> */}

      <div className=" pt-[40px]  flex flex-col">
        {/* user */}
        <PostHeader post={post} />
        {/* decs */}
        <p className="px-[10px] text-white text-[16px] font-[400] leading-[20px]">
          {post.description}
        </p>
        {/* player */}
        <div className=" pt-[10px]">
          {post.file_type === "image" && (
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
              {post.files.map((file: any, index: any) => (
                <div
                  key={index}
                  className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md"
                  onClick={() => openLightbox(post.post_id, index)}
                >
                  <ImageWithPlaceholder
                    src={file.resourceURL}
                    alt={`Picture of social_image`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {lightboxStates[post.post_id]?.isOpen && (
                <CustomLightbox
                  images={post.files}
                  isOpen={lightboxStates[post.post_id]?.isOpen}
                  onClose={() => closeLightbox(post.post_id)}
                  initialIndex={lightboxStates[post.post_id]?.currentIndex}
                />
              )}
            </div>
          )}
          {post.file_type === "video" && (
            <Player
              videoData={videoData}
              isCenterPlay={false}
              src={post?.files[0].resourceURL}
              thumbnail={post?.files[0].thumbnail}
              status={false}
            />
          )}
          {post.file_type === "audio" && (
            <AudioPlayer
              title={post?.files[0]?.title || post?.description}
              src={post?.files[0]?.resourceURL}
              index={post.post_id}
              setActivePlayer={setActivePlayer}
              activePlayer={activePlayer}
            />
          )}
        </div>
        {/* status */}
        <PostFooter post={post} />
        <>
          <div className=" h-[4px] bg-black w-full"></div>
          {/* comment */}
          <Comment
            setList={setList}
            post_id={post.post_id}
            list={list}
            isFetching={isFetching}
            isLoading={isLoading}
          />

          <InfiniteScroll
            // className=" h-[100px]"
            dataLength={list.length}
            next={fetchMoreDataCmt}
            hasMore={hasMore}
            loader={
              <div className="flex bg-background justify-center items-center w-full pb-32 pt-14">
                <Loader />
              </div>
            }
            endMessage={
              <div className="flex bg-background justify-center items-center w-full pb-32 pt-14">
                <p style={{ textAlign: "center" }}>
                  <b className=" hidden text-white/60">没有更多评论</b>
                </p>
              </div>
            }
          >
            <></>
          </InfiniteScroll>
        </>
      </div>
    </div>
  );
};

export default SocialPostDetail;
