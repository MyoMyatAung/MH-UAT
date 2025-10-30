import { useNavigate } from "react-router";

const DetailHeader = () => {
  const navigate = useNavigate();
  const handleBackSocial = () => {
    navigate(-1);
  };
  return (
    <div className="fixed bg-background z-[99] w-full top-0 grid grid-cols-3 py-[10px] justify-betwee items-cente">
      <span onClick={handleBackSocial}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7.828 11H20V13H7.828L13.192 18.364L11.778 19.778L4 12L11.778 4.22205L13.192 5.63605L7.828 11Z"
            fill="white"
          />
        </svg>
      </span>
      <h1 className=" text-white text-[18px] text-center font-[600] leading-[20px]">
        详情
      </h1>
      <div className=""></div>
    </div>
  );
};

export default DetailHeader;
