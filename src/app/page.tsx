
import HomePageView from "@/components/views/HomePage";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Santai Wir",
  description: "SantaiWir",
}

export default async function HomePage(){
  return (
    <>
      <HomePageView />
    </>
  )
}