"use client";

import DataNotFound from "@/components/common/DataNotFound";
import SectionHeading from "@/components/common/SectionHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ServiceCard from "@/components/pages/services/ServiceCard";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { Badge, Select } from "@mantine/core";
import { services } from "@prisma/client";
import { useState } from "react";

const PackagePage = () => {
  const [sortFieldValue, setSortFieldValue] = useState<string | undefined>(
    "totalBooking"
  );
  const [sortOrderValue, setSortOrderValue] = useState<"asc" | "desc">("desc");

  const sortFields = [
    { value: "totalBooking", label: "Popularity" },
    { value: "title", label: "Title" },
  ];

  const sortOrders = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const {
    data: services,
    isSuccess,
    isLoading,
  } = useAllServicesQuery({
    sortBy: sortFieldValue,
    sortOrder: sortOrderValue,
  });

  return (
    <div className="w-full lg:max-w-7xl mx-auto px-5 pt-10 pb-48">
      <div className="flex flex-col lg:flex-row justify-between items-start">
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            <Badge color="#ff3f39" size="xl" radius="xs">
              Our Services
            </Badge>
          </div>
          <div className="max-w-sm lg:max-w-lg">
            <SectionHeading
              line1="Logistics Solutions to Help"
              line2="Businesses from End to End"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-4 mt-5 lg:mt-0">
          <Select
            label="Sort By"
            data={sortFields}
            value={sortFieldValue ? sortFieldValue : undefined}
            onChange={(value, option) => setSortFieldValue(value as string)}
            checkIconPosition="right"
            size="xs"
          />
          <Select
            label="Sort Order"
            data={sortOrders}
            value={sortOrderValue ? sortOrderValue : "desc"}
            onChange={(value, option) =>
              setSortOrderValue(value as "asc" | "desc")
            }
            checkIconPosition="right"
            size="xs"
          />
        </div>
      </div>
      <div className="mt-20">
        <div>
          {isSuccess && services?.data?.result?.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-8 lg:gap-10">
              {services?.data?.result.map((service: services) => (
                <div key={service.id}>
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

export default PackagePage;
