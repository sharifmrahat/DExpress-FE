"use client";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import DashboardContents from "@/components/dashboard/DashboardContents";
import { USER_ROLE } from "@/constants/role";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userLoggedIn = isLoggedIn();
  const { role } = getUserInfo() as any;

  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
    if (userLoggedIn && role !== USER_ROLE.CUSTOMER) {
      return notFound();
    }
    setIsLoading(true);
  }, [role, router, userLoggedIn, isLoading]);

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

export default CustomerLayout;
