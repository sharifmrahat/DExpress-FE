"use client";
import AvailableServices from "@/components/homepage/AvailableServices";
import DownloadSection from "@/components/homepage/DownloadSection";
import FeatureSection from "@/components/homepage/Survey";
import HeroSection from "@/components/homepage/HeroSection";
import UpcomingServices from "@/components/homepage/UpcomingServices";
import { useAllCategoriesQuery } from "@/redux/api/categoryApi";
import Link from "next/link";
import LorriesByCategory from "@/components/homepage/LorriesByCategory";
import { useAllLorriesQuery } from "@/redux/api/lorryApi";
import LatestArticles from "@/components/homepage/LatestArticles";
import CustomerFeedbacks from "@/components/homepage/CustomerFeedbacks";

export default function HomePage() {
  const { data: categories, isLoading } = useAllCategoriesQuery({});

  const { data: lorries, isLoading: lorryLoading } = useAllLorriesQuery({});
  return (
    <>
      <main className="w-full lg:max-w-7xl mx-auto px-5 lg:px-0 pb-10">
        <section>
          <HeroSection />
        </section>
        <section className="my-20">
          <FeatureSection />
        </section>
        <section className="my-10">
          <AvailableServices
            categories={categories?.data?.slice(0, 10)}
            isLoading={isLoading}
          />
          {categories?.data?.length && (
            <div className="flex justify-end  px-5 lg:px-16 mt-8">
              <Link
                href="/categories"
                className="py-0.5 px-2 border-2 border-secondary rounded text-primary"
              >
                Load More
              </Link>
            </div>
          )}
        </section>
        <section className="my-20">
          <LorriesByCategory
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
          )}
        </section>
        <section className="my-20">
          <UpcomingServices />
          <div className="flex justify-end  px-5 lg:px-16 mt-8">
            <Link
              href="/categories"
              className="py-0.5 px-2 border-2 border-secondary rounded text-primary"
            >
              Load More
            </Link>
          </div>
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
      </main>
    </>
  );
}
