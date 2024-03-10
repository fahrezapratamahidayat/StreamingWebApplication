import HomePageView from "@/components/views/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Santai",
  description: `Selamat Datang Di Santai disini kami menyediakan berbagai Film dan Tv
  Series Yang berkualitas dan seru-seru pokonya!. Santai ini dibuat oleh
  seorang develover yang awalnya cuma iseng belajar tentang dunia web
  develover dan belajar Api. karena dari ke isenganya tersebut develover
  dapat membuat website ini`,
};

export default async function HomePage() {
  return (
    <>
      <HomePageView />
    </>
  );
}
