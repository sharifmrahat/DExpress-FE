"use client";

import DataNotFound from "@/components/common/DataNotFound";
import SectionHeading from "@/components/common/SectionHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
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
import { services } from "@prisma/client";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo } from "react";

const ServiceDetailsPage = ({ params }: { params: { id: string } }) => {
  const {
    data: service,
    isSuccess,
    isLoading,
  } = useSingleServiceQuery(params?.id);

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
    <div className="w-fit lg:max-w-7xl mx-auto px-5 pt-10 pb-48">
      <Breadcrumbs className="hidden lg:flex">{routes}</Breadcrumbs>
      <div className="mt-0 lg:mt-10">
        {isSuccess && currentService ? (
          <>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-16">
              <div>
                <Image
                  src={currentService.imageUrl}
                  alt={currentService.title}
                  className="w-full lg:w-[480px] lg:h-[320px]"
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

            <div className="mt-14 lg:mt-28 w-fit mx-auto">
              <div>
                <SectionHeading line1="Available Packages" />
              </div>
              <div>
                {/* Package Cards */}
                {/* TODO: Pass packages into package card, grid-cols-1 lg:grid-cols-3 */}
              </div>
            </div>
          </>
        ) : isLoading ? (
          <>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-16">
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
    </div>
  );
};

export default ServiceDetailsPage;
