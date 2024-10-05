const Tab2 = () => {

  return (
    <div>
      <div className="w-full px-3">
        <nav className="flex gap-8 overflow-x-scroll no-scrollbar py-4">
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">13</span>
            <span className="text-[14px]">一</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">14</span>
            <span className="text-[14px]">二</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px] bg-gray-800 rounded-full w-[30px] h-[30px] flex justify-center items-center">
              今
            </span>
            <span className="text-[14px]">三</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">16</span>
            <span className="text-[14px]">四</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">17</span>
            <span className="text-[14px]">五</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">18</span>
            <span className="text-[14px]">六</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">19</span>
            <span className="text-[14px]">日</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">13</span>
            <span className="text-[14px]">一</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">13</span>
            <span className="text-[14px]">一</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">13</span>
            <span className="text-[14px]">一</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">13</span>
            <span className="text-[14px]">一</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <span className="text-[16px]">13</span>
            <span className="text-[14px]">一</span>
          </button>
        </nav>
      </div>
      <div className="grid grid-cols-3 md:gird-cols-4 lg:grid-cols-6 gap-3 pb-32 px-3">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Tab2;

const Card = () => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[180px] md:h-[220px] lg:h-[280px]">
        <img
          src="https://i.pinimg.com/236x/f2/c8/88/f2c8885af2052f299015347504ea93d2.jpg"
          alt=""
          className="rounded-[4px] w-full h-full object-cover object-center"
        />
        <div className="w-full flex items-center justify-between text-[10px] text-white absolute bottom-3 px-2">
          <p>37集全</p>
          <p>电视剧</p>
        </div>
      </div>
      <p className="text-[14px] text-white truncate">爱,死亡,机器人</p>
    </div>
  );
};
