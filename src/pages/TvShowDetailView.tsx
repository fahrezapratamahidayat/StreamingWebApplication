"use client";
import Image from "next/image";
import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import ListDirector from "@/components/fragments/ListDirector";
import ListStaring from "@/components/fragments/ListStaring";
import CardVideo from "@/components/card/cardVideo";
import { FetchingData, fetchData } from "@/services/DataApi";
import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

const moul = Moul({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-moul",
});

const monstserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-monstserrat",
});

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

export default function TvShowDetailView({ original_name, id, slug }: any) {
  const router = useRouter();
  const [data, setData] = useState<TvShowProps | null>(null);
  const [dataVideos, setDataVideos] = useState<TvShowProps | null>(null);
  const [credits, setCredits] = useState<TvShowProps | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const { data: session, status }: { data: any; status: string } =
    useSession() || {};
  const [userWatchList, setUserWatchList] = useState([]);

  const fetchDataAsync = async () => {
    const data = await fetchData(`tv/${slug}`);
    setData(data);
  };

  const fetchDataVideo = async () => {
    const data = await fetchData(`tv/${slug}/videos`);
    setDataVideos(data);
  };

  const fetchCredits = async () => {
    const data = await fetchData(`tv/${slug}/credits`);
    setCredits(data);
  };

  const videoList = dataVideos?.results.map((video) => (
    <CardVideo key={video.id} keyVideo={video.key} title={video.name} />
  ));

  const castList = credits?.cast
    .slice(0, 12)
    .map((cast, index) => (
      <ListStaring key={index} nameCast={cast.name} jobCast={cast.character} />
    ));

  const crewList = credits?.crew
    .filter(
      (actor) =>
        actor.job === "Novel" ||
        actor.job === "Director" ||
        actor.job === "Writer" ||
        actor.job === "Writing" ||
        actor.known_for_department === "Writing"
    )
    .map((actor, index) => (
      <ListDirector
        key={index}
        nameDirector={actor.name}
        jobDirector={actor.job}
      />
    ));

  useEffect(() => {
    fetchDataAsync();
    fetchDataVideo();
    fetchCredits();
  }, []);

  const handleWatchNow = () => {
    router.push(
      `/tv/${slug}/watch?=${data?.name.replace(/\s+/g, "+")}/season/1`
    );
  };

  const handleAddWatchList = async (event: any) => {
    event.preventDefault();
    setIsloading(true);
    const res = await fetch(`/api/account/addwatchlist?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        watchlistItem: {
          id: slug,
          title: data?.name,
          poster_path: data?.poster_path,
          vote_average: data?.vote_average,
          release_date: data?.first_air_date,
          media_type: "tv",
        },
        email: session?.user?.email,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      alert(`${data.message}`);
      setIsloading(false);
    } else {
      const data = await res.json();
      alert(`${data.message}`);
      setIsloading(false);
    }
  };

  const handleRemoveWatchList = async (event: any) => {
    event.preventDefault();
    setIsloading(true);
    const res = await fetch(`/api/account/removewatchlist?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        watchlistItem: {
          id: slug,
          title: data?.name,
          poster_path: data?.poster_path,
          vote_average: data?.vote_average,
          release_date: data?.first_air_date,
          media_type: "tv",
        },
        email: session?.user?.email,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      alert(`${data.message}`);
      setIsloading(false);
    } else {
      const data = await res.json();
      alert(`${data.message}`);
      setIsloading(false);
    }
  };

  const fetchDataWatchlist = async () => {
    try {
      if (!session) {
        return;
      }
      const email = encodeURIComponent(session.user.email);
      const response = await fetch(`/api/account/user?email=${email}&key=${process.env.NEXT_PUBLIC_API_KEY}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch watchlist. Status: ${response.status}`
        );
      }
      const data = await response.json();
      setUserWatchList(data.user.watchlist);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };


  useEffect(() => {
    fetchDataWatchlist();
  }, [userWatchList]);
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    {data && dataVideos && credits && (
        <div className="flex flex-col lg:ml-[19rem] pb-[5rem] pt-[4rem] lg:pt-0">
          <div className="mt-[5rem]">
            <div className="relative rounded-[0.65rem] lg:mx-0 w-full">
              <div className="w-full overflow-x-hidden lg:pr-[1.2rem]">
                <Image
                  width={1072}
                  height={440}
                  priority={true}
                  className="backdrop-blur-sm lg:h-[27.5rem] h-[30.5rem] w-full object-cover rounded-[0.65rem]"
                  src={`https://image.tmdb.org/t/p/original/${
                    data && data?.backdrop_path
                  }`}
                  alt=""
                />
              </div>
              <div className="absolute top-0 left-0 lg:h-full lg:w-full w-full h-full rounded-[0.65rem] inset-0 bg-gradient-to-b from-transparent to-black overflow-x-hidden"></div>
              <div className=" flex absolute top-0 left-0 h-full w-full  rounded-[0.65rem]">
                <div className="lg:ml-[2.31rem] ml-3 mt-[2.75rem]">
                  <h1
                    className={`${poppins.variable} text-white text-[2.25rem] font-semibold`}
                  >
                    {data && data?.name}
                  </h1>
                  <div className="flex items-center gap-[1.31rem]">
                    <p className="text-white text-sm font-semibold flex items-center ml-[0.2rem] gap-[0.4rem] ">
                      {" "}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.4H12.3667L10 0L7.63333 7.4H0L6.16667 11.9667L3.83333 19.3333L10 14.7667L16.1667 19.3333L13.8 11.9333L20 7.4Z"
                          fill="#FFCE31"
                        />
                      </svg>
                      {data && data?.vote_average.toFixed(1)}
                    </p>
                    <p className="text-white text-sm font-semibold">
                      {data &&
                      data?.episode_run_time &&
                      data.episode_run_time.length > 0
                        ? data.episode_run_time + "m"
                        : "N/A"}
                    </p>
                    <p className="text-white text-smfont-semibold ">
                      {data && data?.first_air_date.substr(0, 4)}
                    </p>
                    <p className="text-white text-sm font-semibold ">
                      {data && data?.number_of_seasons} Seasons
                    </p>
                  </div>
                  <p className="text-white text-sm font-semibold mt-[1.88rem]">
                    {data && data?.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p className="overflow-y-auto overflow-overview pr-2 lg:w-[30.75rem] w-[23rem] lg:h-[7.75rem] h-[12.75rem]  flex-shrink-0 text-slate-300 text-sm font-semibold mt-[2.21rem] tracking-[-0.01em] text-justify ">
                    {data && data?.overview}
                  </p>
                  <div className="flex items-center lg:mt-[2.25rem] mt-[1.25rem]">
                    <button
                      type="button"
                      className="text-black bg-white hover:bg-white/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-semibold rounded-lg text-sm lg:px-5 lg:py-2.5  p-2 px-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                      onClick={handleWatchNow}
                    >
                      <svg
                        className="me-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="24"
                        viewBox="0 0 18 20"
                        fill="none"
                      >
                        <path
                          d="M16.5775 8.38513L2.82801 0.25655C1.71087 -0.40358 0 0.23702 0 1.86977V18.123C0 19.5878 1.58978 20.4706 2.82801 19.7362L16.5775 11.6116C17.804 10.8889 17.8079 9.10775 16.5775 8.38513Z"
                          fill="black"
                        />
                      </svg>
                      Watch Now
                    </button>
                    {userWatchList.some((item: any) => item.id === slug) ? (
                      <button
                        disabled={isLoading}
                        type="button"
                        onClick={handleRemoveWatchList}
                        className="text-white bg-[#828486] hover:bg-[#828486]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-semibold rounded-lg text-sm lg:px-5 lg:py-2.5  p-2 px-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                      >
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
                        {`${isLoading ? "Removing..." : "Watchlist"} `}
                      </button>
                    ) : (
                      <button
                        disabled={isLoading}
                        type="button"
                        onClick={handleAddWatchList}
                        className="text-white bg-[#828486] hover:bg-[#828486]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-semibold rounded-lg text-sm lg:px-5 lg:py-2.5  p-2 px-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                      >
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
                        {`${isLoading ? "Adding..." : "Watch List"} `}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:flex lg:flex-col lg:ml-[3rem] mx-3 lg:mx-0">
              <div className="lg:mt-[3.12rem] mt-[5.69rem] flex">
                <div className="flex lg:flex-row flex-col lg:items-baseline">
                  <h2 className="text-white font-semibold text-[1.25rem]">
                    {credits?.crew && credits.crew.length > 0 ? "Director" : ""}
                  </h2>
                  <div className="flex items-center lg:ml-[5.41rem] mx-5 lg:mt-0 mt-5 gap-[2.44rem] flex-wrap">
                    {crewList}
                  </div>
                </div>
              </div>
              <div className="mt-[3.12rem] flex">
                <div className="flex lg:flex-row flex-col lg:items-baseline">
                  <h2 className="text-white font-semibold text-[1.25rem] ">
                    {credits?.cast && credits.cast.length > 0 ? "Staring" : ""}
                  </h2>
                  <div className="grid lg:grid-cols-4  grid-cols-2 mx-5 lg:ml-[5.81rem] mt-5 gap-[2.44rem] flex-wrap">
                    {castList}
                  </div>
                </div>
              </div>
              <h2 className="text-white  font-semibold text-base mt-[5.12rem]">
                Trailer And Clips
              </h2>
              <div className="mt-[1.69rem] lg:w-[60rem] w-[22rem] flex items-center gap-[2.44rem] overflow-x-auto overflow-video scrollbar-rounded-lg scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-900 ">
                {videoList}
              </div>
            </div>
          </div>
        </div>
      )}
      </Suspense>
    </>
  );
}
