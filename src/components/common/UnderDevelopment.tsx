"use client";
import { Image } from "@mantine/core";

import comingSoon from "@/assets/images/coming-soon-img.png";

const UnderDevelopment = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={comingSoon.src}
        alt="Coming Soon"
        className="w-[250px] lg:w-[400px] hanging-image"
      />
    </div>
  );
};

export default UnderDevelopment;
