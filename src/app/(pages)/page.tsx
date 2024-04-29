"use client";
import AvailableServices from "@/components/homepage/AvailableServices";
import DownloadSection from "@/components/homepage/DownloadSection";
import UpcomingServices from "@/components/homepage/UpcomingServices";
import { useAllCategoriesQuery } from "@/redux/api/categoryApi";
import Link from "next/link";
import LorriesByCategory from "@/components/homepage/LorriesByCategory";
import LatestArticles from "@/components/homepage/LatestArticles";
import CustomerFeedbacks from "@/components/homepage/CustomerFeedbacks";
import { SegmentedControl, PasswordInput, Button } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { showNotification } from "@/utils/showNotification";
import { useAllServicesQuery } from "@/redux/api/serviceAPI";
import Banner from "@/components/homepage/Banner";
import StatsSection from "@/components/homepage/StatsSection";

export default function HomePage() {
  const {
    data: services,
    isSuccess,
    isLoading: serviceLoading,
  } = useAllServicesQuery({ limit: 6 });

  // const { data: lorries, isLoading: lorryLoading } = useAllLorriesQuery({});

  const [value, setValue] = useState("react");
  return (
    <>
      <section>
        <Banner />
      </section>
      <div className="w-full lg:max-w-7xl mx-auto px-5 lg:px-0 pb-10">
        <section className="my-20">
          <StatsSection />
        </section>
        <section className="my-10">
          <AvailableServices
            services={isSuccess && services?.data?.result}
            isLoading={serviceLoading}
          />
          {services?.data?.length && (
            <div className="flex justify-end  px-5 lg:px-16 mt-8">
              <Link
                href="/services"
                className="py-0.5 px-2 border-2 border-secondary rounded text-primary"
              >
                Load More
              </Link>
            </div>
          )}
        </section>
        <section className="my-20">
          {/* <LorriesByCategory
            lorries={lorries?.data?.result?.slice(0, 10)}
            isLoading={lorryLoading}
          />
          {lorries?.data?.result?.length && (
            <div className="flex justify-end  px-5 lg:px-16 mt-8">
              <Link
                href="/lorries"
                className="py-0.5 px-2 border-2 border-secondary rounded text-primary"
              >
                Load More
              </Link>
            </div>
          )} */}
        </section>
        <section className="my-20">
          {/* <UpcomingServices />
          <div className="flex justify-end  px-5 lg:px-16 mt-8">
            <Link
              href="/categories"
              className="py-0.5 px-2 border-2 border-secondary rounded text-primary"
            >
              Load More
            </Link>
          </div> */}
        </section>
        <section className="my-20">
          <LatestArticles />
          <div className="flex justify-center px-5 lg:px-16 mt-8">
            <Link
              href="/articles"
              className="py-0.5 px-2 border-2 border-secondary rounded text-primary"
            >
              Load More
            </Link>
          </div>
        </section>
        <section className="my-20">
          <DownloadSection />
        </section>
        <section className="my-20">
          <CustomerFeedbacks />
          <div className="flex justify-center px-5 lg:px-16 mt-8">
            <Link
              href="/customer-feedbacks"
              className="py-0.5 px-2 border-2 border-secondary rounded text-primary"
            >
              Load More
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
