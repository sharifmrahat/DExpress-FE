"use client";
import { Badge } from "@mantine/core";
import SectionHeading from "../common/SectionHeading";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { services } from "@prisma/client";
import SkeletonLoader from "../common/SkeletonLoader";
import ServiceCard from "../pages/services/ServiceCard";
import DataNotFound from "../common/DataNotFound";

const ServiceSection = () => {
  const {
    data: services,
    isSuccess,
    isLoading,
  } = useAllServicesQuery({
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
        <div>
          {isSuccess && services?.data?.result?.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-8 lg:gap-10">
              {services?.data?.result.map((service: services) => (
                <div key={service.id} className="h-full cursor-pointer">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-8 lg:gap-10">
              <SkeletonLoader amount={6}>
                <div className="h-[400px]"></div>
              </SkeletonLoader>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <DataNotFound description="No service data is found" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
