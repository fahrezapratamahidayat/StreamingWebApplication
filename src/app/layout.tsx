"use client";
import { Inter } from "next/font/google";
import "./globals.css";
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
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          zIndex={1600}
          showAtBottom={false}
        />
        <SessionProvider>
          <NavbarContextProvider>
            {children}
          </NavbarContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
