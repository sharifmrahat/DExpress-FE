import AvailableServices from "@/components/homepage/AvailableServices";
import FeatureSection from "@/components/homepage/FeatureSection";
import HeroSection from "@/components/homepage/HeroSection";
import UpcomingServices from "@/components/homepage/UpcomingServices";

export default function HomePage() {
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
          <AvailableServices />
        </section>
        <section className="my-20">
          <UpcomingServices />
        </section>
      </main>
    </>
  );
}
