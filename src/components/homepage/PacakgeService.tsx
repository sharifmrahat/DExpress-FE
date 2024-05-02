"use client";
import { Badge } from "@mantine/core";
import SectionHeading from "../common/SectionHeading";
import { packages } from "@prisma/client";
import SkeletonLoader from "../common/SkeletonLoader";
import DataNotFound from "../common/DataNotFound";
import PackageCard from "../pages/package/PackageCard";
import { useAllPackagesQuery } from "@/redux/api/packageApi";

const PackageSection = () => {
  const {
    data: packages,
    isSuccess,
    isLoading,
  } = useAllPackagesQuery({
    limit: 8,
    sortBy: "totalBooking",
  });
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div>
          <Badge color="#ff3f39" size="xl" radius="xs">
            Popular Packages
          </Badge>
        </div>
        <div className="max-w-sm lg:max-w-lg mx-auto text-center">
          <SectionHeading
            line1="Discover Packaged Solutions"
            line2="Elevate Your Business Efficiency"
          />
        </div>
      </div>

      <div className="mt-20">
        <div>
          {isSuccess && packages?.data?.result?.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-8 lg:gap-10">
              {packages?.data?.result.map((currentPackage: packages) => (
                <div key={currentPackage.id} className="h-full">
                  <PackageCard currentPackage={currentPackage} />
                </div>
              ))}
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-8 lg:gap-10">
              <SkeletonLoader amount={8}>
                <div className="h-[400px]"></div>
              </SkeletonLoader>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <DataNotFound description="No package data is found" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageSection;
