"use client";
import { services } from "@prisma/client";
import { Oswald } from "next/font/google";
const oswald = Oswald({ style: "normal", weight: "400", subsets: ["latin"] });
import { Card, Image, Text, Button, Group } from "@mantine/core";
import Link from "next/link";

const ServiceCard = ({ service }: { service: services }) => {
  const handleBooking = (serviceId: string) => {
    {
      /* TODO: Call Event and store serviceId and redirect to new booking page */
    }

    console.log(serviceId);
  };
  return (
    <Card shadow="sm" padding="lg" radius="sm" withBorder>
      <Card.Section>
        <Image
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-[200px]"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text className={`${oswald.className} text-xl lg:text-2xl`}>
          {service.title}
        </Text>
      </Group>

      <Text size="sm" c="dimmed" className="text-xs lg:text-sm text-justify">
        {service.description!.length <= 130
          ? service.description
          : service.description?.slice(0, 130) + "..."}
      </Text>
      <div className="flex flex-row-reverse justify-between gap-3 mt-5">
        <Link href={`/services/${service.id}`} className="w-full lg:w-1/3">
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
  );
};

export default ServiceCard;
