"use client";
import LorriesByCategory from "@/components/homepage/LorriesByCategory";
import { useAllLorriesQuery } from "@/redux/api/serviceAPI";

const LorriesPage = () => {
  const {
    data: lorries,
    isLoading,
    refetch: refetchAll,
  } = useAllLorriesQuery({});
  return (
    <div>
      <section className="my-10 h-full lg:h-screen">
        <LorriesByCategory
          lorries={lorries?.data?.result}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};

export default LorriesPage;
