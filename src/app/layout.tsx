"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavbarContextProvider from "@/context/NavbarContext";
import NextTopLoader from "nextjs-toploader";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const disableNavbar = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en" className="">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={`${inter.className} overflow-main bg-black`}>
        <NextTopLoader
          color="#fff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          zIndex={1600}
          showAtBottom={false}
        />
        <SessionProvider>
          <NavbarContextProvider>
            {!disableNavbar && <NavbarFixed />}
            {children}
          </NavbarContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
