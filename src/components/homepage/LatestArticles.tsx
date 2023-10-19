"use client";
import { ILorry } from "@/types";
import Spinner from "../common/Spinner";
import LorryCard from "../shared/LorriesCard";

const LatestArticles = ({
  lorries,
  isLoading,
}: {
  lorries?: ILorry[];
  isLoading?: boolean;
}) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-primary text-xl lg:text-2xl font-semibold">
          Latest Articles
        </h3>
        <p className="text-sm lg:text-lg text-slate-500">
          Articles are coming soon!
        </p>
      </div>
      {/* <div>
        {isLoading && (
          <div className="w-fit mx-auto">
            <Spinner />
          </div>
        )}
        {lorries?.length && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 justify-center items-center px-5 lg:px-16">
            {lorries?.map((lorry: ILorry) => (
              <LorryCard key={lorry.id} lorry={lorry} />
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default LatestArticles;
