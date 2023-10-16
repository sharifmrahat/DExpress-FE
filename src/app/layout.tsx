import Header from "@/components/common/Header";
import "./globals.css";
import type { Metadata } from "next";

import Footer from "@/components/common/Footer";
import Providers from "@/lib/Provider";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Lorry Lagbe",
  description: "Lorry Booking Application",
};

const poppins = Poppins({ style: "normal", weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${poppins.className} bg-background`}>{children}</body>
      </html>
    </Providers>
  );
}
