"use client";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { NavbarContext } from "@/context/NavbarContext";
import { usePathname, useRouter } from "next/navigation";
import CardShowMoreLayouts from "../layouts/CardShowMoreLayouts";
let page = 2;

export type ItemCard = JSX.Element;

interface LoadMoreProps {
  fetchData: (
    page: number,
    endpoint: string,
    params?: string
  ) => Promise<ItemCard[]>;
  endpoint: string;
}
export default function LoadMore({ fetchData, endpoint }: LoadMoreProps) {
  const { ref, inView } = useInView();
  const [items, setItems] = useState<ItemCard[]>([]);
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;
  const pathname = usePathname();

  useEffect(() => {
    setItems([]);
    page = 2; // Reset items when pathname changes
  }, [pathname,endpoint]);

  const handleShowMore = async () => {
    const res = await fetchData(page, endpoint);
    setItems([...items, ...res]);
    page++;
  };

  // useEffect(() => {
  //   if (inView) {
  //     fetchData(page,endpoint).then((res) => setItems([...items, ...res]));
  //     page++;
  //   }
  // }, [inView, items]);

  return (
    <>
      <CardShowMoreLayouts className="">
        {items}
      </CardShowMoreLayouts>
      <div
        className={`${
          showNavbar ? "lg:w-[78%] w-full" : "w-full"
        } flex items-center justify-center pb-10 lg:mt-0 mt-5`}
      >
        <button
          type="button"
          className="text-white flex gap-3 px-4 py-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          ref={ref}
          onClick={handleShowMore}
        >
          {/* <svg
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
            </svg> */}
          Show More
        </button>
      </div>
    </>
  );
}
