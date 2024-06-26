import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import type { Metadata } from "next";
import Providers from "@/lib/Provider";
import { Poppins } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../../theme";
import { Notifications } from "@mantine/notifications";

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
          <MantineProvider theme={theme}>
            <Notifications position="top-right" zIndex={1000} limit={1} />
            {children}
          </MantineProvider>
        </body>
      </html>
    </Providers>
  );
}
