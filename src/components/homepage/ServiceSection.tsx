"use client";
import { Badge } from "@mantine/core";
import SectionHeading from "../common/SectionHeading";

const ServiceSection = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div>
          <Badge color="#ff3f39" size="xl" radius="xs">
            Our Services
          </Badge>
        </div>
        <div className="max-w-sm lg:max-w-lg mx-auto text-center">
          <SectionHeading
            line1="Logistics Solutions to Help"
            line2="Businesses from End to End"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
