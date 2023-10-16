"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

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
