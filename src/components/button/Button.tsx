"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MovieData = {
  backdrop_path: string;
  id: number;
  poster_path: string;
  title: string;
  runtime: number;
  vote_average: number;
  release_date: string;
  overview: string;
  genres: { id: number; name: string }[];
  directors: { id: number; name: string }[];
  cast: { id: number; name: string; job: string; character: string }[];
  crew: { id: number; name: string; job: string }[];
  job: string;
  video: string;
  results: { id: string; name: string; key: string }[];
};

type TvShowProps = {
  id: number;
  original_name: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  popularity: number;
  first_air_date: string;
  episode_run_time: number[];
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  video: string;
  results: { id: string; name: string; key: string }[];
  cast: {
    id: number;
    name: string;
    job: string;
    character: string;
    known_for_department: string;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    known_for_department: string;
  }[];
};

interface ButtonProps {
  slug: any;
  data: any;
}

export default function ButtonWatchlist({ slug, data }: ButtonProps) {
  const [userWatchList, setUserWatchList] = useState([]);
  const { data: session, status }: { data: any; status: string } = useSession();
  const [isLoading, setIsloading] = useState(false);
  const pathname = usePathname();

  const handleRemoveMylist = async (event: any) => {
    setIsloading(true);
    const res = await fetch("/api/user/removemylist", {
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
    handleGetData();
    setIsloading(false);
  };

  const handleAddWatchList = async (event?: any) => {
    setIsloading(true);
    event.preventDefault();
    const res = await fetch(`/api/user/addmylist`, {
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
    handleGetData();
    setIsloading(false);
  };

  const handleGetData = async () => {
    if (session) {
      const res = await fetch(`/api/user?id=${session.user.id}`, {});
      const data = await res.json();
      setUserWatchList(data.user.watchlist);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [status]);
  return (
    <>
      <form>
        {userWatchList &&
        userWatchList.some((item: any) => item.id === slug) ? (
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
      </form>
    </>
  );
}
