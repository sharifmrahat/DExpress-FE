"use client";

import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import SectionHeading from "../common/SectionHeading";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import { services } from "@prisma/client";

const ServiceSection = () => {
  const {
    data: services,
    isSuccess,
    isLoading: serviceLoading,
  } = useAllServicesQuery({ limit: 6, sortBy: "totalBooking" });
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
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-5 lg:gap-10">
          {isSuccess && services?.data?.result ? (
            <>
              {services?.data?.result.map((service: services) => (
                <div key={service.id}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <Image src={service.imageUrl} height={160} alt="Norway" />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>{service.title}</Text>
                      <Badge color="red">{service.totalBooking}</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                      {service.description}
                    </Text>

                    <Button color="blue" fullWidth mt="md" radius="md">
                      Book classic tour now
                    </Button>
                  </Card>
                </div>
              ))}
            </>
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
