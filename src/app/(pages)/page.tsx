"use client";
import Banner from "@/components/homepage/Banner";
import StatsSection from "@/components/homepage/StatsSection";
import ServiceSection from "@/components/homepage/ServiceSection";
import PackageSection from "@/components/homepage/PacakgeService";

export default function HomePage() {
  return (
    <>
      <section>
        <Banner />
      </section>
      <div className="w-full lg:max-w-7xl mx-auto px-5 pb-10">
        <section className="my-32">
          <StatsSection />
        </section>
        <section className="my-32">
          <ServiceSection />
        </section>
        <section className="my-32">
          <PackageSection />
        </section>
      </div>
    </>
  );
}
