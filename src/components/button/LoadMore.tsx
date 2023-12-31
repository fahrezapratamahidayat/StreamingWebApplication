"use client";
import { fetchMovies } from "@/app/actions";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CardLayouts from "../layouts/CardLayout";
import { NavbarContext } from "@/context/NavbarContext";
import { usePathname, useRouter } from "next/navigation";
let page = 2;

export type ItemCard = JSX.Element;

interface LoadMoreProps {
  fetchData: (page: number, params?: string) => Promise<ItemCard[]>;
  genre?: string;
}
export default function LoadMore({ fetchData, genre }: LoadMoreProps) {
  const { ref, inView } = useInView();
  const [items, setItems] = useState<ItemCard[]>([]);
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext
  const pathname = usePathname();
  
  useEffect(() => {
    setItems([]);
    page = 2; // Reset items when pathname changes
  }, [pathname]);

  useEffect(() => {
    if (inView) {
      fetchData(page,genre).then((res) => setItems([...items, ...res]));
      page++;
    }
  }, [inView, items]);

  return (
    <>
      <CardLayouts className="lg:mr-[1.2rem]">{items}</CardLayouts>
      <div className={`${showNavbar ? "w-[78%]" : "w-full"} flex items-center justify-center pb-10`}>
          <button type="button" className="text-white flex gap-3" ref={ref}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="animate-bounce transition-all"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12L12 16L16 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Show More
          </button>
        </div>
    </>
  );
}
