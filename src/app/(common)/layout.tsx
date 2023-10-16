"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default CommonLayout;
