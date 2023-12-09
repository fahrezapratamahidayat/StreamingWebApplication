import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayouts from "@/layouts/MainLayouts";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import MovieContextProvider from "@/context/DataMovies";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body
        className={`${inter.className} scrollbar-rounded-lg scrollbar scrollbar-track-gray-700 scrollbar-thumb-gray-900`}
      >
        <MainLayouts>
          <NavbarFixed />
          <MovieContextProvider>{children}</MovieContextProvider>
        </MainLayouts>
      </body>
    </html>
  );
}
