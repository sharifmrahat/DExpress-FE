"use client";

import DataNotFound from "@/components/common/DataNotFound";
import SectionHeading from "@/components/common/SectionHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import PackageCard from "@/components/pages/package/PackageCard";
import {
  useAllPackagesQuery,
  useSinglePackageQuery,
} from "@/redux/api/packageApi";
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
import { packages, reviews } from "@prisma/client";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import defaultImage from "@/assets/images/default-image.png";

const PackageDetailsPage = ({ params }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState<string | null>("packages");
  const {
    data: packageResult,
    isSuccess,
    isLoading,
  } = useSinglePackageQuery(params?.id);

  const currentPackage = useMemo(
    () => packageResult?.data as packages,
    [packageResult]
  );

  const {
    data: packages,
    isSuccess: isPackageSuccess,
    isLoading: isPackageLoading,
  } = useAllPackagesQuery({ serviceId: currentPackage?.serviceId });

  const similarPackages = useMemo(
    () =>
      (packages?.data?.result as packages[])?.filter(
        (p) => p?.id !== currentPackage?.id
      ),
    [packages, currentPackage]
  );

  const {
    data: reviews,
    isSuccess: isReviewSuccess,
    isLoading: isReviewLoading,
  } = useAllReviewsQuery({ packageId: params?.id });

  const routes = [
    { title: "Home", href: "/" },
    { title: "Package", href: "/packages" },
    {
      title: currentPackage?.title
        ? currentPackage?.title
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
        {isSuccess && currentPackage ? (
          <>
            <div className="flex flex-col lg:flex-row justify-start items-start gap-5 lg:gap-16">
              <div>
                <Image
                  src={currentPackage.imageUrl ?? defaultImage.src}
                  alt={currentPackage.title}
                  className={`w-full lg:w-[480px] lg:h-[320px] shadow ${
                    currentPackage.imageUrl ? "opacity-100" : "opacity-50"
                  }`}
                  radius="sm"
                />
              </div>
              <div className="flex flex-col justify-between h-full lg:h-[320px]">
                <div>
                  <SectionHeading line1={currentPackage.title} />
                  <Text
                    size="sm"
                    c="dimmed"
                    className="text-xs lg:text-sm text-justify my-4 max-w-sm"
                  >
                    {currentPackage.description}
                  </Text>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-row gap-4 justify-star items-center">
                    <Link href={`/services/${currentPackage.serviceId}`}>
                      <Badge size="lg" variant="light" color="#0f1b24">
                        {(currentPackage as any).service.title}
                      </Badge>
                    </Link>
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
                      Total Booking: {currentPackage.totalBooking}
                    </Badge>
                  </div>
                  <Button
                    color="#ff3f39"
                    size="xs"
                    radius="sm"
                    fullWidth
                    onClick={() => handleBooking(packageResult.id)}
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
                description="No package data is found"
                title="Package not found!"
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
              Similar Packages
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
            {isSuccess && isPackageSuccess && similarPackages?.length ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-8 lg:gap-10 py-8 lg:py-10">
                {similarPackages?.map((currentPackage: packages) => (
                  <div key={currentPackage.id} className="h-full">
                    <PackageCard currentPackage={currentPackage} />
                  </div>
                ))}
              </div>
            ) : isLoading || isPackageLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-8 lg:gap-10 py-8 lg:py-10">
                <SkeletonLoader amount={3}>
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

export default PackageDetailsPage;
