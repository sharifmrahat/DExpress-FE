"use client";
import { Oswald } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import banner1 from "@/assets/images/banner-1.jpg";
import banner2 from "@/assets/images/banner-2.jpg";
import banner3 from "@/assets/images/banner-3.jpg";
import { Button } from "@mantine/core";

const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

const Banner = () => {
  const sliders = [
    {
      id: 1,
      image: banner3.src,
      heading1: "Best Logistics",
      heading2: "Provider",
      link: "/services",
      button: "Book Now",
    },
    {
      id: 2,
      image: banner1.src,
      heading1: "Manage Your",
      heading2: "Inventory",
      link: "/services",
      button: "Deal Now",
    },
    {
      id: 3,
      image: banner2.src,
      heading1: "Shipment",
      heading2: "Made Easy",
      link: "/services",
      button: "Try Here",
    },
  ];
  return (
    <>
      <Swiper
        key={Math.random()}
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={2500}
        loop={true}
        // effect={"fade"}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper"
      >
        {sliders.map((item) => (
          <>
            <SwiperSlide id={item.id.toString()} key={item.id}>
              <div
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundRepeat: "no-repeat",
                }}
                className="flex justify-center items-center bg-contain lg:bg-cover h-[250px] lg:h-[620px] bg-primary"
              >
                <div className="text-center text-white flex flex-col justify-center items-center gap-y-5 lg:gap-y-10 mt-5 lg:mt-12">
                  <div
                    className={`${oswald.className} text-3xl lg:text-7xl font-bold`}
                  >
                    <p className="mb-1">{item.heading1}</p>
                    <p>{item.heading2}</p>
                  </div>
                  <Button color="#0f1b24">{item.button}</Button>
                </div>
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
