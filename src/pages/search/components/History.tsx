import { useState } from "react";
import "../search.css";
import { useDispatch, useSelector } from "react-redux";
import { clearData, selectHistoryData } from "../slice/HistorySlice";

const History = () => {
  const historys = useSelector(selectHistoryData);
  const dispatch = useDispatch();

  if (historys.length === 0) {
    return <div className="mt-12"></div>;
  }

  const handleDelete = () => {
    dispatch(clearData({}));
  };

  return (
    <div className="px-3 mt-12">
      <div className="flex justify-between items-center">
        <h1 className="history-title">搜索历史</h1>
        <button onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M16.6667 5.83317V17.4998C16.6667 17.7208 16.5789 17.9328 16.4226 18.0891C16.2663 18.2454 16.0544 18.3332 15.8334 18.3332H4.16669C3.94567 18.3332 3.73371 18.2454 3.57743 18.0891C3.42115 17.9328 3.33335 17.7208 3.33335 17.4998V5.83317H1.66669V4.1665H18.3334V5.83317H16.6667ZM5.00002 5.83317V16.6665H15V5.83317H5.00002ZM5.83335 1.6665H14.1667V3.33317H5.83335V1.6665ZM9.16669 8.33317H10.8334V14.1665H9.16669V8.33317Z"
              fill="white"
              fill-opacity="0.6"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap gap-3 py-3">
        {historys?.map((history: any) => (
          <div className="history-tab">{history}</div>
        ))}
      </div>
    </div>
  );
};

export default History;
