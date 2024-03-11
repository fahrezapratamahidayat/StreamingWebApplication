"use client";
import Image from "next/image";
import { useRef, useState } from "react";

interface TvEpisodeProps {
  name: string;
  overview: string;
  air_date: string;
  runtime: number;
  still_path: string;
  vote: number;
  language: string;
  iframeSrc: string;
}
export default function TvEpisode({
  name,
  overview,
  air_date,
  runtime,
  still_path,
  vote,
  language,
  iframeSrc,
}: TvEpisodeProps) {
  const [modal, setModal] = useState(false);
  const overlay = useRef(null);

  return (
    <>
      {modal && (
        <div
          ref={overlay}
          className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/80 z-50 ${
            modal ? "modal-open" : ""
          }`}
        >
          <div className="absolute top-5 left-5 flex items-center justify-center z-50 rounded shadow-md text-white">
            <button
              type="button"
              onClick={() => setModal(false)}
              className="w-10 h-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M18 6.5L6 18.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6.5L18 18.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 right-0 bottom-0 flex items-center justify-center z-50 rounded shadow-md text-white">
            <iframe
              src={iframeSrc}
              frameBorder="0"
              allowFullScreen
              width={"100%"}
              height={"100%"}
            ></iframe>
          </div>
        </div>
      )}
      <div className="">
        <section className="py-12 lg:py-24">
          <div className="container px-4 grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  {name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">{overview}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground py-2 h-11 px-8 text-white"
                  type="button"
                  onClick={() => setModal(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 -translate-x-1"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Play
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${still_path}`}
                alt={name}
                width={500}
                height={500}
                className="aspect-video overflow-hidden rounded-xl object-bottom"
              />
            </div>
          </div>
        </section>
        <section className="border-t border-b py-6">
          <div className="container px-4 flex flex-col gap-2">
            <div className="flex justify-around">
              <div className="">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Release date
                </p>
                <p className="text-white">{air_date}</p>
              </div>
              <div className="">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Runtime
                </p>
                <p className="text-white">{runtime}m</p>
              </div>
              <div className="">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Vote Average
                </p>
                <p className="text-white">{vote}</p>
              </div>
              <div className="">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Language
                </p>
                <p className="text-white">{language}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
