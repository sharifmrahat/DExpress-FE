"use client";
import { Oswald } from "next/font/google";
const oswald = Oswald({ style: "normal", weight: "600", subsets: ["latin"] });

const SectionHeading = ({
  line1,
  line2,
  className = "text-2xl lg:text-4xl text-secondary",
}: {
  line1: string;
  line2?: string;
  className?: string;
}) => {
  return (
    <div className={`${oswald.className} ${className}`}>
      <p>
        {" "}
        {line1}
        {!line2 && <span className="text-primary">.</span>}
      </p>
      <p>
        {" "}
        {line2}
        {line2 && <span className="text-primary">.</span>}
      </p>
    </div>
  );
};

export default SectionHeading;
