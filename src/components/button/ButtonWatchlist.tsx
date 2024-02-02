"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type DataBookmarks = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  media_type: string;
  release_date: string;
  first_air_date: string;
  name: string;
};
interface ButtonProps {
  slug: any;
  data: any;
}

export default function ButtonWatchlist({ slug, data }: ButtonProps) {
  const [bookmarks, setBookmarks] = useState([]);
  const { data: session, status }: { data: any; status: string } = useSession();
  const [isLoading, setIsloading] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const pathname = usePathname();

  const handleRemoveMylist = async (event: any) => {
    setToast(false);
    setIsloading(true);
    event.preventDefault();
    try {
      const res = await fetch(`/api/user/removebookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session && session.user.id,
          watchlistItem: {
            id: slug,
            title: data?.title || data?.name,
            poster_path: data?.poster_path,
            vote_average: data?.vote_average,
            release_date: data?.release_date || data?.first_air_date,
            media_type: pathname?.includes("tv") ? "tv" : "movie",
          },
        }),
      });
      const result = await res.json();
      setToastMessage(result.message);
      await handleGetData();
    } catch (error) {
      // Handle error
    } finally {
      setIsloading(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 6000);
    }
  };

  const handleAddWatchList = async (event?: any) => {
    setIsloading(true);
    setToast(false);
    event.preventDefault();
    try {
      if (!session) {
        return;
      }
      const respone = await fetch(`/api/user/addbookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session && session.user.id,
          watchlistItem: {
            id: slug,
            title: data?.title || data?.name,
            poster_path: data?.poster_path,
            vote_average: data?.vote_average,
            release_date: data?.release_date || data?.first_air_date,
            media_type: pathname?.includes("tv") ? "tv" : "movie",
          },
        }),
      });
      const result = await respone.json();
      setToastMessage(result.message);
      await handleGetData();
    } catch (error) {
      // Handle error
    } finally {
      setIsloading(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 6000);
    }
  };

  const handleGetData = async () => {
    if (session) {
      const respone = await fetch(`/api/user?id=${session.user.id}`, {
        method: "GET",
      });
      const result = await respone.json();
      setBookmarks(result.data);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [status]);

  const variants = {
    open: { opacity: 1, y: [200, 100, 0] },
    closed: { opacity: 0, y: 200 },
  };

  return (
    <>
      <motion.div
        animate={toast ? "open" : "closed"}
        variants={variants}
        initial="closed"
        className="fixed flex items-center w-full  lg:justify-end justify-center bottom-5 lg:right-10 right-0 z-50"
        role="alert"
      >
        <div className="flex items-center justify-center p-3 border border-gray-300 rounded-md">
          <h2 className="text-white text-sm">{toastMessage}</h2>
        </div>
      </motion.div>
      {bookmarks && bookmarks.some((item: any) => item.id === slug) ? (
        <button
          disabled={isLoading}
          type="button"
          onClick={handleRemoveMylist}
          className="text-white bg-[#828486] hover:bg-[#828486]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-semibold rounded-lg text-sm lg:px-5 lg:py-2.5  p-2 px-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
        >
          {isLoading ? (
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="me-1 animate-spin transition-all"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.8273 3 17.35 4.30367 19 6.34267"
                  stroke="#ffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="me-2"
            >
              <path
                d="M3 6H5H21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 11V17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 11V17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {`${isLoading ? "Removing..." : "Watchlist"} `}
        </button>
      ) : (
        <button
          disabled={isLoading}
          type="button"
          onClick={handleAddWatchList}
          className="text-white bg-[#828486] hover:bg-[#828486]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-semibold rounded-lg text-sm lg:px-5 lg:py-2.5  p-2 px-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
        >
          {isLoading ? (
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="me-1 animate-spin transition-all"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.8273 3 17.35 4.30367 19 6.34267"
                  stroke="#ffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="me-2"
            >
              <path
                d="M12 5V19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12H19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {`${isLoading ? "Adding..." : "Watch List"} `}
        </button>
      )}
    </>
  );
}
