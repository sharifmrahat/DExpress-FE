import "./globals.css";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import Providers from "@/lib/Provider";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../../theme";

import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "DExpress",
  description: "The incredible tale of reliable logistics",
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
        <head>
          <ColorSchemeScript />
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body className={`${poppins.className} bg-background`}>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </body>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </html>
    </Providers>
  );
}
