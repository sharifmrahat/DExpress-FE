"use client";
import { useRouter } from "next/router";
import { isLoggedIn } from "@/services/auth.service";
import DashboardContents from "@/components/dashboard/DashboardContents";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading]);

  if (!isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <DashboardContents>{children}</DashboardContents>
    </>
  );
};

export default DashboardLayout;
