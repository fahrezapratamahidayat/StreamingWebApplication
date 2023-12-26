"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayouts from "@/layouts/MainLayouts";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import MovieContextProvider from "@/context/DataMovies";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const disableNavbar = pathname === "/login" || pathname === "register";

  return (
    <html lang="en" className="">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body
        className={`${inter.className} scrollbar-rounded-lg scrollbar scrollbar-track-gray-700 scrollbar-thumb-gray-900 bg-black`}
      >
        <SessionProvider>
          {!disableNavbar && <NavbarFixed />}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
