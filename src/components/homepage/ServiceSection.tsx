"use client";
import { Badge } from "@mantine/core";
import SectionHeading from "../common/SectionHeading";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { services } from "@prisma/client";
import SkeletonLoader from "../common/SkeletonLoader";
import ServiceCard from "../pages/services/ServiceCard";

const ServiceSection = () => {
  const { data: services, isSuccess } = useAllServicesQuery({
    limit: 6,
    sortBy: "totalBooking",
  });
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

      <div className="mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-8 lg:gap-10">
          {isSuccess && services?.data?.result ? (
            <>
              {services?.data?.result.map((service: services) => (
                <div key={service.id}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </>
          ) : (
            <SkeletonLoader amount={6}>
              <div className="h-[400px]"></div>
            </SkeletonLoader>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
