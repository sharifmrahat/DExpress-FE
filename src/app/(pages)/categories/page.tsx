"use client";
import AvailableServices from "@/components/homepage/AvailableServices";
import { useAllCategoriesQuery } from "@/redux/api/categoryApi";

const CategoriesPage = () => {
  const {
    data: categories,
    isLoading,
    refetch: refetchAll,
  } = useAllCategoriesQuery(undefined);
  return (
    <div>
      <section className="my-10 h-full lg:h-screen">
        <AvailableServices
          categories={categories?.data}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};

export default CategoriesPage;
