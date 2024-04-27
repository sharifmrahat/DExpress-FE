"use client";
import CategoryCard from "../shared/CategoryCard";
import Spinner from "../common/Spinner";
import { services } from "@prisma/client";
const AvailableServices = ({
  services,
  isLoading,
}: {
  services: services[];
  isLoading: boolean;
}) => {
  console.log(services);
  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-primary text-xl lg:text-2xl font-semibold">
          Available Services
        </h3>
        <p className="text-sm lg:text-lg text-slate-500">
          Book Your Desired Service
        </p>
      </div>
      <div>
        {isLoading && (
          <div className="w-fit mx-auto">
            <Spinner />
          </div>
        )}
        {services?.length && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 justify-center items-center px-5 lg:px-16">
            {services?.map((service: services) => (
              <CategoryCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableServices;
