"use client";
import { Image } from "@mantine/core";

import comingSoon from "@/assets/images/coming-soon-img.png";

const UnderDevelopment = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={comingSoon.src}
        alt="Coming Soon"
        className="max-w-[400px] hanging-image"
      />
    </div>
  );
};

export default UnderDevelopment;
