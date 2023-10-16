import { CpuChipIcon } from "@heroicons/react/24/outline";
import { BsMotherboard, BsMemory, BsPlugin, BsDeviceSsd } from "react-icons/bs";
import CategoryCard from "../shared/CategoryCard";

const AvailableServices = () => {
  const categories: { name: string; icon: any }[] = [
    { name: "Pickup Van", icon: CpuChipIcon },
    { name: "Truck", icon: BsMotherboard },
    { name: "Cover Van", icon: BsMemory },
    { name: "Freezer Van", icon: BsPlugin },
    { name: "Flatbed Truck", icon: BsDeviceSsd },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-primary text-xl lg:text-2xl font-semibold">
          Available Services
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

export default AvailableServices;
