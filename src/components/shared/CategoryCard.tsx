/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

type CategoryCardProps = {
  category: { title: string };
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/categories`}
      className="bg-white shadow-sm rounded border overflow-hidden hover:shadow-lg p-3"
    >
      {/* <div className="w-fit mx-auto">
        <category.icon className="w-16 h-16 text-primary" aria-hidden="true" />
      </div> */}
      <h3 className="w-fit mx-auto font-semibold text-primary text-center">
        {category.title}
      </h3>
    </Link>
  );
};

export default CategoryCard;
