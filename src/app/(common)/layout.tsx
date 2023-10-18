"use client";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/services/auth.service";
import DashboardContents from "@/components/dashboard/DashboardContents";
import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);

  if (!isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-md">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Header />
      <DashboardContents>{children}</DashboardContents>
    </>
  );
};

export default CommonLayout;
