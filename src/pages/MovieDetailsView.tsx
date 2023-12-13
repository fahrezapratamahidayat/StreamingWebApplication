"use client";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/DataApi";
import ListStaring from "@/components/fragments/ListStaring";
import CardVideo from "@/components/card/cardVideo";
import ListDirector from "@/components/fragments/ListDirector";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

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

export default function MovieDetailView({ slug }: { slug: string }) {
  const [data, setData] = useState<MovieData | null>(null);
  const [dataVideos, setDataVideos] = useState<MovieData | null>(null);
  const [credits, setCredits] = useState<MovieData | null>(null);

  const fetchDataAsync = async () => {
    const data = await fetchData(`movie/${slug}`);
    setData(data);
  };

  const fetchDataVideo = async () => {
    const data = await fetchData(`movie/${slug}/videos`);
    setDataVideos(data);
  };

  const fetchCredits = async () => {
    const data = await fetchData(`movie/${slug}/credits`);
    setCredits(data);
  };

  const castList = credits?.cast
    .slice(0, 12)
    .map((castMember, index) => (
      <ListStaring
        key={index}
        nameCast={castMember.name}
        jobCast={castMember.character}
      />
    ));

  const videoList = dataVideos?.results.map((video) => (
    <CardVideo key={video.id} keyVideo={video.key} title={video.name} />
  ));

  const crewList = credits?.crew
    .filter(
      (actor) =>
        actor.job === "Novel" ||
        actor.job === "Director" ||
        actor.job === "Writer"
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
  return (
    <>
      {data && credits && dataVideos && (
        <div className="flex flex-col lg:ml-[19rem] pb-[5rem] pt-[4rem] lg:pt-0">
          <div className="mt-[5rem] ">
            <div className="relative rounded-[0.65rem] lg:mx-0 w-full">
              <div className="w-full">
                <Image
                  width={500}
                  height={500}
                  priority={true}
                  className="backdrop-blur-sm lg:h-[27.5rem] h-[30.5rem] w-full object-cover rounded-[0.65rem]"
                  src={`https://image.tmdb.org/t/p/original/${
                    data && data?.backdrop_path
                  }`}
                  alt=""
                />
              </div>
              <div className="absolute top-0 left-0 lg:h-full lg:w-full h-full w-full rounded-[0.65rem] inset-0 bg-gradient-to-b from-transparent to-black dark:bg-gradient-to-b dark:from-transparent dark:to-black"></div>
              <div className=" flex absolute top-0 left-0 h-full w-full  rounded-[0.65rem]">
                <div className="lg:ml-[2.31rem] ml-3 mt-[2.75rem]">
                  <h1
                    className={`${poppins.variable} text-white text-[2.25rem] font-semibold`}
                  >
                    {data && data?.title}
                  </h1>
                  <div className="flex items-center gap-[1.31rem]">
                    <p className="text-white text-sm font-semibold flex items-center ml-[0.2rem] gap-[0.4rem]">
                      {" "}
                      <svg
                        width="19"
                        height="19"
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
                      {data && data?.runtime ? data.runtime + "m" : "N/A"}
                    </p>
                    <p className="text-white text-sm font-semibold">
                      {data && data?.release_date.substr(0, 4)}
                    </p>
                  </div>
                  <p className="text-white text-sm font-semibold mt-[1.88rem]">
                    {data && data?.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p className="overflow-y-auto overflow-overview pr-2 lg:w-[30.75rem] w-[23rem] lg:h-[7.75rem] h-[12.75rem]   flex-shrink-0 text-slate-300 text-sm font-semibold mt-[2.21rem] tracking-[-0.01em] text-justify ">
                    {data && data?.overview}
                  </p>
                  <div className="flex items-center lg:mt-[2.25rem] mt-[1.25rem]">
                    <Link
                      href={`/movies/${slug}/watch?=${encodeURIComponent(
                        data.title
                      )}`}
                    >
                      <button
                        type="button"
                        className="text-black bg-white hover:bg-white/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-semibold rounded-lg text-sm lg:px-5 lg:py-2.5  p-2 px-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
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
                    </Link>
                    <button
                      type="button"
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
                      WatchList
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:flex lg:flex-col lg:ml-[3rem] lg:mx-0 mx-3">
              <div className="lg:mt-[3.12rem] mt-[5.69rem] flex">
                <div className="flex lg:flex-row flex-col lg:items-baseline">
                  <h2 className="text-white font-semibold text-[1.25rem]">
                    {credits?.crew && credits.crew.length > 0 ? "Director" : ""}
                  </h2>
                  <div className="flex items-center lg:ml-[5.41rem] ml-11 lg:mt-0 mt-5 gap-[2.44rem] flex-wrap">
                    {crewList}
                  </div>
                </div>
              </div>
              <div className="mt-[3.12rem] flex">
                <div className="flex lg:flex-row flex-col lg:items-baseline">
                  <h2 className="text-white font-semibold text-[1.25rem]">
                    {credits?.cast && credits.cast.length > 0 ? "Staring" : ""}
                  </h2>
                  <div className="grid lg:grid-cols-4  grid-cols-2 ml-11 lg:ml-[5.81rem] mt-5 gap-[2.44rem] flex-wrap">
                    {castList}
                  </div>
                </div>
              </div>
              <h2 className="text-white  font-semibold text-[1rem] mt-[5.12rem]">
                Trailer And Clips
              </h2>
              <div className="mt-[1.69rem] lg:w-[60rem] w-[22rem]  flex items-center gap-[2.44rem] overflow-x-auto overflow-video">
                {videoList}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
