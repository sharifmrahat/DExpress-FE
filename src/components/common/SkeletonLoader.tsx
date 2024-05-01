"use client";

import { Skeleton } from "@mantine/core";
import { ReactNode } from "react";

interface SkeletonLoaderProps {
  amount?: number;
  children: ReactNode;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  amount = 1,
  children,
}) => {
  // Create an array of length equal to the amount prop
  const divs = Array.from({ length: amount }, (_, index) => index + 1);

  return (
    <>
      {divs.map((index) => (
        <Skeleton key={index} visible={true}>
          {children}
        </Skeleton>
      ))}
    </>
  );
};

export default SkeletonLoader;
