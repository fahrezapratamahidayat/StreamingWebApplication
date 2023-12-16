import HomePageView from "@/pages/HomePageView";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Santai Wir",
  description: "SantaiWir",
}

export default function HomePage(){
  return (
    <>
    <HomePageView />
    </>
  )
}