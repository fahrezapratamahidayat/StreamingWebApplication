"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavbarContextProvider from "@/context/NavbarContext";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en" className="">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="refresh" />
      <meta
        name="description"
        content="Selamat datang di Santai!. disini kami menyediakan berbagai Film dan Tv
        Series yang berkualitas dan seru-seru pokonya!. Santai ini dibuat oleh
        seorang develover yang awalnya cuma iseng belajar tentang dunia web
        develover dan belajar Api. karena dari ke isenganya tersebut develover
        dapat membuat website ini."
      />
      <title>Santai</title>
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
          <NavbarContextProvider>{children}</NavbarContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
