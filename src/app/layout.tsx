'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayouts from "@/layouts/MainLayouts";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import Sidebar from "@/components/sidebar/Sidebar";
import MovieContextProvider from "@/context/DataMovies";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

const disableOriginalSidebar = ["/search/movies", "/search/tvshow"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName : any = usePathname();
  return (
    <html lang="en" className="">
      <body className={`${inter.className} scrollbar-rounded-lg scrollbar scrollbar-track-gray-700 scrollbar-thumb-gray-900`}>
        <MainLayouts>
          {!disableOriginalSidebar.includes(pathName) && <NavbarFixed />}
          <MovieContextProvider>{children}</MovieContextProvider>
        </MainLayouts>
      </body>
    </html>
  );
}
