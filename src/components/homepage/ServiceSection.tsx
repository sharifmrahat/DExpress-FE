"use client";
import { Oswald } from "next/font/google";
const oswald = Oswald({ style: "normal", weight: "400", subsets: ["latin"] });
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Skeleton,
} from "@mantine/core";
import SectionHeading from "../common/SectionHeading";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { services } from "@prisma/client";
import Link from "next/link";

const ServiceSection = () => {
  const {
    data: services,
    isSuccess,
    isLoading: serviceLoading,
  } = useAllServicesQuery({ limit: 6, sortBy: "totalBooking" });

  const handleBooking = (serviceId: string) => {
    {
      /* TODO: Call Event and store serviceId and redirect to new booking page */
    }

    console.log(serviceId);
  };
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
                  <Skeleton visible={serviceLoading}>
                    <Card shadow="sm" padding="lg" radius="sm" withBorder>
                      <Card.Section>
                        <Image
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-[200px]"
                        />
                      </Card.Section>

                      <Group justify="space-between" mt="md" mb="xs">
                        <Text
                          className={`${oswald.className} text-xl lg:text-2xl`}
                        >
                          {service.title}
                        </Text>
                      </Group>

                      <Text
                        size="sm"
                        c="dimmed"
                        className="text-xs lg:text-sm text-justify"
                      >
                        {service.description!.length <= 130
                          ? service.description
                          : service.description?.slice(0, 130) + "..."}
                      </Text>
                      <div className="flex flex-row-reverse justify-between gap-3 mt-5">
                        <Link
                          href={`/services/${service.id}`}
                          className="w-full lg:w-1/3"
                        >
                          <Button
                            variant="light"
                            color="#ff3f39"
                            size="xs"
                            radius="sm"
                            fullWidth
                          >
                            View Details
                          </Button>
                        </Link>
                        <Button
                          color="#ff3f39"
                          size="xs"
                          radius="sm"
                          className="w-full lg:w-2/3"
                          onClick={() => handleBooking(service.id)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card>
                  </Skeleton>
                </div>
              ))}
            </>
          ) : serviceLoading ? (
            <>
              <Skeleton visible={true}>
                <div className="w-[328] lg:w-[432px] h-[408] lg:h-[412px]"></div>
              </Skeleton>
              <Skeleton visible={true}>
                <div className="w-[328] lg:w-[432px] h-[408] lg:h-[412px]"></div>
              </Skeleton>
              <Skeleton visible={true}>
                <div className="w-[328] lg:w-[432px] h-[408] lg:h-[412px]"></div>
              </Skeleton>
              <Skeleton visible={true}>
                <div className="w-[328] lg:w-[432px] h-[408] lg:h-[412px]"></div>
              </Skeleton>
              <Skeleton visible={true}>
                <div className="w-[328] lg:w-[432px] h-[408] lg:h-[412px]"></div>
              </Skeleton>
              <Skeleton visible={true}>
                <div className="w-[328] lg:w-[432px] h-[408] lg:h-[412px]"></div>
              </Skeleton>
            </>
          ) : (
            <>Not Found</>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
