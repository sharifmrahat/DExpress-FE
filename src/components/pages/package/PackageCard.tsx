"use client";
import { packages } from "@prisma/client";
import { Oswald } from "next/font/google";
const oswald = Oswald({ style: "normal", weight: "400", subsets: ["latin"] });
import { Card, Image, Text, Button, Group, Badge } from "@mantine/core";
import Link from "next/link";
import { useHover } from "@mantine/hooks";

const PackageCard = ({ currentPackage }: { currentPackage: packages }) => {
  const { hovered, ref } = useHover();
  const handleBooking = (packageId: string) => {
    {
      /* TODO: Call Event and store serviceId and redirect to new booking page */
    }

    console.log(packageId);
  };
  return (
    <Card
      shadow={hovered ? "md" : "xs"}
      padding="lg"
      radius="sm"
      withBorder
      className="h-full"
      ref={ref}
    >
      <Card.Section withBorder py="md" px="md" mb="md">
        <Link href={`/packages/${currentPackage?.id}`}>
          <Text
            className={`${oswald.className} text-xl lg:text-2xl ${
              hovered ? "text-primary" : "text-secondary"
            }`}
          >
            {currentPackage.title}
          </Text>
        </Link>
        <Link href={`/services/${currentPackage.serviceId}`} className="mt-5">
          <Badge
            size="md"
            variant="light"
            mt="md"
            color={!hovered ? "#ff3f39" : "#0f1b24"}
          >
            {(currentPackage as any).service.title}
          </Badge>
        </Link>
      </Card.Section>

      <Link href={`/packages/${currentPackage?.id}`}>
        <Text size="sm" className="text-xs lg:text-sm text-justify mb-5">
          {currentPackage.description!.length <= 200
            ? currentPackage.description
            : currentPackage.description?.slice(0, 200) + "..."}
        </Text>
      </Link>

      <div className="flex flex-col justify-between gap-3 mt-auto">
        <Button
          variant="light"
          color={hovered ? "#ff3f39" : "#0f1b24"}
          size="xs"
          radius="sm"
          fullWidth
        >
          ${currentPackage.price}
          {/* TODO: Add unit here */}
        </Button>
        <Button
          color={hovered ? "#ff3f39" : "#0f1b24"}
          size="xs"
          radius="sm"
          fullWidth
          onClick={() => handleBooking(currentPackage.id)}
        >
          Choose
        </Button>
      </div>
    </Card>
  );
};

export default PackageCard;
