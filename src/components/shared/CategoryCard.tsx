/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type CategoryCardProps = {
  category: { name: string; icon: any };
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/categories/${category.name}`}
      className="bg-white shadow-sm rounded border overflow-hidden hover:shadow-lg p-3"
    >
      <div className="w-fit mx-auto">
        <category.icon className="w-16 h-16 text-primary" aria-hidden="true" />
      </div>
      <h3 className="mt-3 w-fit mx-auto font-semibold text-primary text-center">
        {category.name}
      </h3>
    </Link>
  );
};

export default CategoryCard;
