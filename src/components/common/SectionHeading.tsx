"use client";
import { Oswald } from "next/font/google";
const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

const SectionHeading = ({
  line1,
  line2,
}: {
  line1: string;
  line2?: string;
}) => {
  return (
    <div className={`${oswald.className} text-3xl lg:text-4xl text-secondary`}>
      <p> {line1}</p>
      <p>
        {" "}
        {line2}
        <span className="text-primary">.</span>
      </p>
    </div>
  );
};

export default SectionHeading;
