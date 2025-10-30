import { useState } from "react";
import LikeButton from "./LikeButton";
import { useNavigate } from "react-router-dom";
import ShareButton from "./ShareButton";

type Props = {
  post: any;
};

const PostFooter: React.FC<Props> = ({ post }) => {
  const [showCreatedTime, setShowCreatedTime] = useState(false);
  const navigate = useNavigate();

  const handleShowDetail = (post: any) => {
    navigate(`/detail-social/${post.post_id}`);
  };
  return (
    <div className="flex justify-between items-center px-4 py-3 text-xs">
      {showCreatedTime ? (
        <div className="fixed top-0 left-0 flex h-screen items-center justify-center z-[1000] w-full">
          <p className="text-[12px] text-white font-semibold bg-gradient-to-r from-background to-gray-800 px-3 py-1 rounded-md">
            该功能还在开发中，敬请期待！
          </p>
        </div>
      ) : (
        <></>
      )}

      <div>
        <p className="text-gray-400 text-xs">{post?.create_time}</p>
      </div>

      <div className="flex gap-x-5  items-center justify-center">
        <LikeButton
          is_liked={post.is_liked}
          like_count={post.like_count}
          post_id={post.post_id}
        />
        <button
          onClick={() => handleShowDetail(post)}
          // onClick={() => showCreatedTimeHandler()}
          className="flex -mt-[2px] items-center gap-x-2 text-black dark:text-white"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.23138 15.4075C3.00563 15.0242 2.85776 14.7672 2.78426 14.63C2.10331 13.3601 1.74795 11.941 1.75001 10.5C1.75001 5.66762 5.6676 1.75003 10.5 1.75003C15.3324 1.75003 19.25 5.66762 19.25 10.5C19.25 15.3324 15.3324 19.25 10.5 19.25C8.91718 19.2524 7.36362 18.8234 6.00623 18.0093C5.86948 17.9283 5.7324 17.8479 5.59498 17.768L3.45385 18.3521C2.96385 18.4855 2.51454 18.036 2.6482 17.5462L3.23138 15.4075ZM4.57057 15.4851L4.21663 16.7834L5.51491 16.4295C5.59892 16.4065 5.68665 16.4005 5.77299 16.4118C5.85933 16.4231 5.94256 16.4515 6.01782 16.4953C6.23951 16.6239 6.46067 16.7534 6.68129 16.8838C7.83476 17.5756 9.15499 17.9399 10.5 17.9375C14.6077 17.9375 17.9375 14.6077 17.9375 10.5C17.9375 6.39234 14.6077 3.06253 10.5 3.06253C6.39232 3.06253 3.06251 6.39234 3.06251 10.5C3.06251 11.7425 3.36701 12.9395 3.94079 14.0097C4.01692 14.1514 4.20592 14.4778 4.5021 14.9783C4.54686 15.0539 4.57598 15.1377 4.58774 15.2248C4.59951 15.3118 4.59367 15.4004 4.57057 15.4851ZM7.5646 14.0337C7.49715 13.979 7.44123 13.9114 7.40009 13.835C7.35894 13.7585 7.33339 13.6746 7.32491 13.5881C7.31643 13.5017 7.32519 13.4144 7.35069 13.3314C7.37618 13.2484 7.41791 13.1712 7.47344 13.1045C7.52897 13.0377 7.5972 12.9826 7.67419 12.9424C7.75117 12.9022 7.83537 12.8776 7.9219 12.8702C8.00844 12.8628 8.09559 12.8726 8.17829 12.8991C8.261 12.9256 8.33763 12.9683 8.40373 13.0246C8.9921 13.5149 9.73412 13.7828 10.5 13.7813C11.277 13.7813 12.0109 13.5111 12.5956 13.0248C12.6619 12.9697 12.7384 12.9282 12.8207 12.9027C12.903 12.8772 12.9895 12.8681 13.0754 12.876C13.1612 12.8839 13.2446 12.9086 13.3209 12.9488C13.3971 12.9889 13.4648 13.0437 13.5199 13.1099C13.575 13.1762 13.6165 13.2527 13.642 13.335C13.6675 13.4173 13.6766 13.5038 13.6687 13.5897C13.6608 13.6755 13.6361 13.7589 13.5959 13.8352C13.5558 13.9114 13.501 13.9791 13.4348 14.0342C12.6108 14.7202 11.5722 15.0952 10.5 15.0938C9.42756 15.0952 8.38866 14.7201 7.5646 14.0337Z"
              fill="white"
            />
          </svg>{" "}
          {post.comment_count}
        </button>
        <ShareButton />
      </div>
    </div>
  );
};

export default PostFooter;
