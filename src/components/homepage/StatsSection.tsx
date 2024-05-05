/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Oswald } from "next/font/google";
const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });
import statImage1 from "@/assets/images/stats-1.png";
import statImage2 from "@/assets/images/stats-2.png";
import statImage3 from "@/assets/images/stats-3.png";

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      title: "Delivered Packages",
      amount: "5,731",
      image: statImage1.src,
      description:
        "We strongly support best practice sharing across our operations around the world and across various industrial sectors.",
    },
    {
      id: 2,
      title: "Countries Covered",
      amount: "123",
      image: statImage2.src,
      description:
        "As one of the world’s leading supply chain management companies, we design and implement industry-leading solutions.",
    },
    {
      id: 3,
      title: "Tons of Goods",
      amount: 476,
      image: statImage3.src,
      description:
        "Our commitment to sustainability helps us reduce waste and share the benefits with our customers.",
    },
  ];
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 lg:gap-20 my-28">
        <h1
          className={`${oswald.className} text-3xl lg:text-5xl text-secondary`}
        >
          We give you control
          <br />
          of your shipments
          <span className="text-primary">.</span>
        </h1>
        <p className="text-slate-500 text-justify text-sm lg:text-base max-w-sm">
          We invest time and expertise to fully understand your business before
          designing plans to improve your supply chain. We take responsibility
          for the performance of all our suppliers and for ensuring the
          availability of resources and equipment needed to control the flow of
          goods under our charge.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-14 lg:gap-20">
        {stats.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <img
              src={item.image}
              className="w-[130px] lg:w-[160px] h-[120px]"
            />
            <p
              className={`${oswald.className} text-secondary text-3xl lg:text-4xl`}
            >
              {item.amount}
            </p>
            <div className={`${oswald.className} text-2xl`}>
              <p className="text-secondary w-full">
                {item.title}
                <span className="text-primary">.</span>
              </p>
            </div>
            <p className="text-slate-500 text-sm max-w-sm text-justify">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
