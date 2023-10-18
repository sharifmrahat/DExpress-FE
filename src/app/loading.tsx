"use client";
import Spinner from "@/components/common/Spinner";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-md">
      <Spinner />
    </div>
  );
};

export default Loading;
