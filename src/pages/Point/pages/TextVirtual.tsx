import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

interface VirtualProps {
  data: any;
}

const TextVirtual: React.FC<VirtualProps> = ({ data }) => {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      modules={[Autoplay]}
      className="h-[20px]"
      allowTouchMove={false}
    >
      {data?.data?.virtual_lottery_winners?.map((item: any, index: number) => {
        const template = item.text || "用户 :name 成功瓜分红包 :price";

        // Split into parts around the placeholders
        const parts = template.split(/(:name|:price)/g);

        return (
          <SwiperSlide key={index}>
            <h1 className="text-white/80 text-[16px] tracking-wide text-center font-[400]">
              {parts.map((part: any, i: any) => {
                if (part === ":name") {
                  return (
                    <span key={i} className="font-bold text-white">
                      {item.name}
                    </span>
                  );
                }
                if (part === ":price") {
                  return (
                    <span key={i} className="font-bold text-white">
                      {item.price}
                    </span>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
            </h1>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TextVirtual;
