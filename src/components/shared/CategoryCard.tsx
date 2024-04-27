/* eslint-disable @next/next/no-img-element */
"use client";
import { services } from "@prisma/client";
import Link from "next/link";

type CategoryCardProps = {
  service: services;
};

const CategoryCard = ({ service }: CategoryCardProps) => {
  console.log(service);
  return (
    <Link
      href={`/services/${service.id}`}
      className="bg-white shadow-sm rounded border overflow-hidden hover:shadow-lg p-3"
    >
      {/* <div className="w-fit mx-auto">
        <category.icon className="w-16 h-16 text-primary" aria-hidden="true" />
      </div> */}
      <h3 className="w-fit mx-auto font-semibold text-primary text-center">
        {service.title}
      </h3>
    </Link>
  );
};

export default CategoryCard;
