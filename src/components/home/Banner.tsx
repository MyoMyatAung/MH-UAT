import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
const Banner = ({ list }: { list: any }) => {
  const [configData, setConfigData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const carouselData = list[0]?.list;
  console.log(carouselData, "cmd");

  const getConfigData = async () => {
    const res = await fetch(
      "https://cc3e497d.qdhgtch.com:2345/api/v1/app/config"
    );
    const data = await res.json();
    console.log(data?.data?.index_top_nav);
    setConfigData(data?.data?.index_top_nav);
  };

  useEffect(() => {
    getConfigData();
  }, []);
  return (
    <div className="">
      <div className="relative">
        <Carousel showThumbs={false} showArrows={false} showStatus={false}>
          {carouselData?.map((banner: any) => (
            <div key={banner?.image}>
              <img className="relative" src={banner?.image} alt="" />
              <p className="absolute text-white z-50 bottom-8 pl-5 text-[16px] font-semibold">
                {banner?.title}
              </p>
              <div className="absolute rounded-bl-lg rounded-br-lg  h-full w-full inset-0 bg-gradient-to-b from-transparent via-black/5 to-black"></div>
            </div>
          ))}
        </Carousel>
        <div className="w-full absolute top-0 bg-gradient-to-b from-transparent via-black/5 to-gray-50/15">
          <nav className="flex overflow-x-scroll no-scrollbar px-3 gap-3">
            {configData.map((item: any, index) => (
              <div
                className="relative"
                onClick={() => setActiveTab(index)}
                key={index}
              >
                <p
                  className={`${
                    activeTab === index ? "text-white" : "text-gray-500"
                  } whitespace-nowrap py-2 rounded-lg hover:text-white transition-colors`}
                >
                  {item?.name}
                </p>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
    // <div className="overflow-hidden relative">
    //   <div className="my-8">
    //     <div className="embla" ref={emblaRef}>
    //       <div className="embla__container flex">
    //         {carouselData.map((banner: any, index: any) => (
    //           <div
    //             className="embla__slide w-full flex-shrink-0 relative"
    //             key={banner.image}
    //           >
    //             <ImageWithPlaceholder
    //               className="w-full h-[180px] rounded-xl object-cover object-center"
    //               src={banner.image}
    //               width="100%"
    //               height={180}
    //               alt="banner"
    //             />
    //             <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
    //             <div className="absolute bottom-0 left-0 w-full px-4 pb-2 text-white">
    //               <p className="text-white text-[16px] font-bold truncate">
    //                 {banner.name}
    //               </p>
    //               <div
    //                 className="flex gap-2 items-center"
    //                 style={{ padding: "0px" }}
    //               >
    //                 <p className="text-gray-300 mt-[2px] text-[10px]">
    //                   {banner.vod_remarks}
    //                 </p>
    //                 <div className="flex gap-[2px] items-center">
    //                   <img
    //                     // src={star.src}
    //                     src=""
    //                     alt="Picture of the author"
    //                     width={12.5}
    //                     height={12.5}
    //                   />
    //                   <span className="text-[10px] text-gray-300 mt-[2px]">
    //                     {formatVodScore(banner?.vod_score)}/10
    //                   </span>
    //                 </div>
    //               </div>

    //               <p className="text-gray-300 mt-1 text-[10px] w-3/4 two-line-truncate ">
    //                 {banner.vod_blurb}
    //               </p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Banner;
