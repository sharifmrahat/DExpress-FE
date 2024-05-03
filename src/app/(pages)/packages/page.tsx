"use client";

import DataNotFound from "@/components/common/DataNotFound";
import SectionHeading from "@/components/common/SectionHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import PackageCard from "@/components/pages/package/PackageCard";
import { useAllPackagesQuery } from "@/redux/api/packageApi";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import {
  Badge,
  Button,
  Collapse,
  Group,
  RangeSlider,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { packages, services } from "@prisma/client";
import {
  IconChevronDown,
  IconChevronUp,
  IconChevronsDown,
  IconChevronsUp,
  IconSearch,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";

const PackagePage = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useDebouncedState("", 200);

  const [sortFieldValue, setSortFieldValue] = useState<string | undefined>(
    "totalBooking"
  );
  const [sortOrderValue, setSortOrderValue] = useState<"asc" | "desc">("desc");

  const [filterData, setFilterData] = useState<{
    serviceId?: string;
    minPrice?: number;
    maxPrice?: number;
  }>({
    serviceId: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });

  const {
    data: services,
    isSuccess: isServiceSuccess,
    isLoading: isServiceLoading,
  } = useAllServicesQuery({
    limit: 6,
    sortBy: "title",
    sortOrder: "asc",
  });

  const {
    data: packages,
    isSuccess,
    isLoading,
  } = useAllPackagesQuery({
    sortBy: sortFieldValue,
    sortOrder: sortOrderValue,
    limit: 24,
    serviceId: filterData.serviceId,
    minPrice: filterData.minPrice,
    maxPrice: filterData.maxPrice,
    search: searchValue,
  });

  const sortFields = [
    { value: "totalBooking", label: "Popularity" },
    { value: "title", label: "Title" },
  ];

  const sortOrders = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const allServices = useMemo(
    () => services?.data?.result as services[],
    [services]
  );

  return (
    <div className="w-full lg:max-w-7xl mx-auto px-5 pt-10 pb-48">
      <div className="flex flex-col lg:flex-row justify-between items-start">
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            <Badge color="#ff3f39" size="xl" radius="xs">
              Popular Packages
            </Badge>
          </div>
          <div className="max-w-sm lg:max-w-lg">
            <SectionHeading
              line1="Discover Packaged Solutions"
              line2="Elevate Your Business Efficiency"
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center gap-2 mt-5 lg:mt-0 mb-4">
            <div className="w-full">
              <TextInput
                size="xs"
                placeholder="Search Package"
                rightSection={<IconSearch />}
                defaultValue={searchValue}
                onChange={(event) => setSearchValue(event.currentTarget.value)}
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-4">
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
          <Group justify="center" mb={5}>
            <Button
              onClick={toggle}
              variant="light"
              fullWidth
              size="xs"
              color={opened ? "#ff3f39" : "#0f1b24"}
              rightSection={
                opened ? (
                  <IconChevronsUp size={18} />
                ) : (
                  <IconChevronsDown size={18} />
                )
              }
            >
              Filter
            </Button>
          </Group>
          <Collapse in={opened}>
            <div className="flex flex-col gap-4">
              <Select
                label="Filter by Service"
                data={allServices?.map((e) => ({
                  label: e.title,
                  value: e.id,
                }))}
                value={filterData.serviceId ? filterData.serviceId : undefined}
                onChange={(value, option) =>
                  setFilterData({
                    serviceId: value as string,
                    minPrice: filterData.minPrice,
                    maxPrice: filterData.maxPrice,
                  })
                }
                checkIconPosition="right"
                size="xs"
                placeholder={isServiceLoading ? "Loading..." : "Select Service"}
                defaultValue={undefined}
                searchable
                clearable
                nothingFoundMessage={
                  isServiceLoading ? "Loading..." : "No data found!"
                }
              />
              <div>
                <Text size="xs" className="mb-0.5">
                  Price Range
                </Text>
                <RangeSlider
                  size="xs"
                  thumbSize={14}
                  minRange={500}
                  min={500}
                  max={10000}
                  step={500}
                  defaultValue={[500, 10000]}
                  label={(value) => `$${value}`}
                  color="#0f1b24"
                  onChangeEnd={(val) =>
                    setFilterData({
                      serviceId: filterData.serviceId
                        ? filterData.serviceId
                        : undefined,
                      minPrice: val[0],
                      maxPrice: val[1],
                    })
                  }
                />
              </div>
            </div>
          </Collapse>
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

export default PackagePage;
