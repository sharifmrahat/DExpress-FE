import { CpuChipIcon } from "@heroicons/react/24/outline";
import { BsMotherboard, BsMemory, BsPlugin, BsDeviceSsd } from "react-icons/bs";
import CategoryCard from "../shared/CategoryCard";

const UpcomingServices = () => {
  const categories: { name: string; icon: any }[] = [
    { name: "Home Shifting", icon: CpuChipIcon },
    { name: "Delivery Service", icon: BsMotherboard },
    { name: "Warehousing", icon: BsMemory },
    { name: "Load & Unloading", icon: BsPlugin },
    { name: "Air Service", icon: BsDeviceSsd },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-primary text-xl lg:text-2xl font-semibold">
          Upcoming Services
        </h3>
        <p className="text-sm lg:text-lg text-slate-500">
          Book Your Desired Service from Available Category!
        </p>
      </div>
      <div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 justify-center items-center px-5 lg:px-16">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingServices;
