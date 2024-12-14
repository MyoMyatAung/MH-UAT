import shortIcon from "./short.png";
import "./short.css";

const Short = () => {
  return (
    <div className="flex justify-center items-center h-screen short_main  px-5">
      <div className="short_div p-6 mb-10 rounded-2xl max-w-sm w-full">
        <div className="p-5 rounded-xl mb-4">
          <img src={shortIcon} alt="" />
        </div>
        <div className="text-center p-4 rounded-lg  text-white">
          <h2 className="short_head">引入社交媒体功能</h2>
          <p className="short_des mt-2">
            在我们的电影应用中引入有意思人脉的社交媒体体验
            <br />
            帮助更可以为大家社媒增添有趣和互动的层次。
          </p>
          <div className="flex justify-center items-center mt-4">
            <button className="short_btn">即将上线，敬请期待！</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Short;
