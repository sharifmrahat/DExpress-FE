"use client";

import DataNotFound from "@/components/common/DataNotFound";
import SectionHeading from "@/components/common/SectionHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import PackageCard from "@/components/pages/package/PackageCard";
import { useAllPackagesQuery } from "@/redux/api/packageApi";
import { useAllReviewsQuery } from "@/redux/api/reviewApi";
import { useSingleServiceQuery } from "@/redux/api/serviceAPI";
import {
  Breadcrumbs,
  Text,
  Image,
  Badge,
  rem,
  Button,
  Tabs,
} from "@mantine/core";
import { packages, reviews, services } from "@prisma/client";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const ServiceDetailsPage = ({ params }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState<string | null>("packages");
  const {
    data: service,
    isSuccess,
    isLoading,
  } = useSingleServiceQuery(params?.id);

  const {
    data: packages,
    isSuccess: isPackageSuccess,
    isLoading: isPackageLoading,
  } = useAllPackagesQuery({ serviceId: params?.id });

  const {
    data: reviews,
    isSuccess: isReviewSuccess,
    isLoading: isReviewLoading,
  } = useAllReviewsQuery({ serviceId: params?.id });

  const currentService = useMemo(() => service?.data as services, [service]);

  const routes = [
    { title: "Home", href: "/" },
    { title: "Service", href: "/services" },
    {
      title: currentService?.title
        ? currentService?.title
        : isLoading
        ? "Loading..."
        : "Not Found",
      isCurrent: true,
    },
  ].map((item, index) => (
    <div key={index} className="font-semibold text-sm">
      {item.isCurrent ? (
        <Text className="font-semibold text-sm text-primary">{item.title}</Text>
      ) : (
        <Link
          href={item.href as string}
          key={index}
          className="hover:text-primary"
        >
          {item.title}
        </Link>
      )}
    </div>
  ));

  const handleBooking = (serviceId: string) => {
    {
      /* TODO: Call Event and store serviceId and redirect to new booking page */
    }

    console.log(serviceId);
  };

  return (
    <div className="w-full lg:max-w-7xl mx-auto px-5 pt-10 pb-48">
      <Breadcrumbs className="hidden lg:flex">{routes}</Breadcrumbs>
      <div className="mt-0 lg:mt-10">
        {isSuccess && currentService ? (
          <>
            <div className="flex flex-col lg:flex-row justify-start items-start gap-5 lg:gap-16">
              <div>
                <Image
                  src={currentService.imageUrl}
                  alt={currentService.title}
                  className={`w-full lg:w-[480px] h-[320px] shadow ${
                    currentService.imageUrl ? "opacity-100" : "opacity-50"
                  }`}
                  radius="sm"
                />
              </div>
              <div className="flex flex-col justify-between h-full lg:h-[320px]">
                <div>
                  <SectionHeading line1={currentService.title} />
                  <Text
                    size="sm"
                    c="dimmed"
                    className="text-xs lg:text-sm text-justify my-4 max-w-sm"
                  >
                    {currentService.description}
                  </Text>
                </div>
                <div className="flex flex-col gap-5">
                  <Badge
                    size="lg"
                    variant="light"
                    color="#0f1b24"
                    leftSection={
                      <IconCircleCheck
                        style={{ width: rem(15), height: rem(15) }}
                        className="mb-0.5"
                      />
                    }
                  >
                    Total Booking: {currentService.totalBooking}
                  </Badge>
                  <Button
                    color="#ff3f39"
                    size="xs"
                    radius="sm"
                    fullWidth
                    onClick={() => handleBooking(service.id)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : isLoading ? (
          <>
            <div className="flex flex-col lg:flex-row justify-start items-start gap-5 lg:gap-16 w-fit">
              <SkeletonLoader amount={2}>
                <div className="w-[330px] lg:w-[490px] h-[200px] lg:h-[308px]"></div>
              </SkeletonLoader>
            </div>
          </>
        ) : (
          <>
            <div className="w-full lg:w-[480px] lg:h-[320px]">
              <DataNotFound
                description="No service data is found"
                title="Service not found!"
              />
            </div>
          </>
        )}
      </div>
      <div className="mt-10 lg:mt-20 mx-auto">
        <Tabs
          color="#ff3f39"
          defaultValue="packages"
          value={activeTab}
          onChange={(val) => setActiveTab(val)}
        >
          <Tabs.List>
            <Tabs.Tab
              value="packages"
              className={`hover:text-primary font-semibold hover:bg-transparent ${
                activeTab === "packages" && "text-primary"
              }`}
            >
              Packages
            </Tabs.Tab>
            <Tabs.Tab
              value="reviews"
              className={`hover:text-primary font-semibold hover:bg-transparent ${
                activeTab === "reviews" && "text-primary"
              }`}
            >
              Reviews
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="packages">
            {isSuccess && isPackageSuccess && packages?.data?.result?.length ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-8 lg:gap-10 py-8 lg:py-10">
                {packages?.data?.result.map((currentPackage: packages) => (
                  <div key={currentPackage.id} className="h-full">
                    <PackageCard currentPackage={currentPackage} />
                  </div>
                ))}
              </div>
            ) : isLoading || isPackageLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-8 lg:gap-10 py-8 lg:py-10">
                <SkeletonLoader amount={4}>
                  <div className="h-[300px] lg:h-[400px]"></div>
                </SkeletonLoader>
              </div>
            ) : (
              <div className="flex justify-start items-start py-8 lg:py-10">
                <DataNotFound description="No package data is found" />
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="reviews">
            {isSuccess && isReviewSuccess && reviews?.data?.result?.length ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-8 lg:gap-10 py-8 lg:py-10">
                {reviews?.data?.result.map((review: reviews) => (
                  <div key={review.id} className="h-full">
                    {review.description}
                    {review.rating}
                    {/* {review.user.name} */}
                    {/* TODO: Review Card */}
                  </div>
                ))}
              </div>
            ) : isLoading || isReviewLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-8 lg:gap-10 py-8 lg:py-10">
                {/* TODO: Review Skeleton */}
                <SkeletonLoader amount={4}>
                  <div className="h-[300px] lg:h-[400px]"></div>
                </SkeletonLoader>
              </div>
            ) : (
              <div className="flex justify-start items-start py-8 lg:py-10">
                <DataNotFound description="No Reviews are found" />
              </div>
            )}
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
