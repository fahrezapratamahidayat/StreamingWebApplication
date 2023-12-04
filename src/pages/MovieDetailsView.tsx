import Image from "next/image";
import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
import Sidebar from "@/components/sidebar/Sidebar";
import Link from "next/link";

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

export default function MovieDetailView({
  poster_path,
  backdrop_path,
  title,
  runtime,
  vote_average,
  release_date,
  overview,
  genres,
  video,
  credits,
  crew,
  id,
}: any) {
  return (
    <>
      <div className="flex flex-col  ml-[21rem] pb-[5rem]">
        <div className="mt-[5rem]">
          <div className="relative h-[27.5rem] w-[67rem]  rounded-[0.65rem]">
            <Image
              width={1072}
              height={440}
              priority={true}
              className="backdrop-blur-sm h-[27.5rem] w-[67rem] object-cover rounded-[0.65rem]"
              src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
              alt=""
            />
            <div className="absolute top-0 left-0 h-full w-full rounded-[0.65rem] inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className=" flex absolute top-0 left-0 h-full w-full  rounded-[0.65rem]">
              <div className="ml-[2.31rem] mt-[2.75rem]">
                <h1
                  className={`${poppins.variable} text-white text-[2.25rem] font-semibold`}
                >
                  {title}
                </h1>
                <div className="flex items-center gap-[1.31rem]">
                  <p className="text-white text-[1rem] font-semibold flex items-center ml-[0.2rem] gap-[0.4rem]">
                    {" "}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 7.4H12.3667L10 0L7.63333 7.4H0L6.16667 11.9667L3.83333 19.3333L10 14.7667L16.1667 19.3333L13.8 11.9333L20 7.4Z"
                        fill="#FFCE31"
                      />
                    </svg>
                    {vote_average}
                  </p>
                  <p className="text-white text-[1rem] font-semibold">
                    {runtime}m
                  </p>
                  <p className="text-white text-[1rem] font-semibold">
                    {release_date}
                  </p>
                </div>
                <p className="text-white text-[1rem] font-semibold mt-[1.88rem]">
                  {genres}
                </p>
                <p className="overflow-y-auto overflow-overview pr-2 w-[30.75rem] h-[7.75rem]  flex-shrink-0 text-white/90 text-[1rem] font-semibold mt-[2.21rem] tracking-[-0.01em] text-justify ">
                  {overview}
                </p>
                {/* <p className="w-[30.75rem] h-[7.75rem] flex-shrink-0 text-white text-[1rem] font-semibold mt-[2.21rem] tracking-[-0.01em] text-justify">
                  {overview}
                </p> */}
                <div className="flex items-center mt-[1.25rem]">
                  <Link href={`/movies/${id}/watch?=${encodeURIComponent(title)}`}>
                  <button
                    type="button"
                    className="text-black bg-white hover:bg-white/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
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
                    className="text-white bg-[#828486] hover:bg-[#828486]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5 12H19"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    WatchList
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-[3.5rem]">
            <div className="mt-[3.12rem]  flex">
              <div className="flex">
                <h2 className="text-white font-semibold text-[1rem]">
                  {crew && crew.length > 0 ? "Director" : ""}
                </h2>
                <div className="flex items-center ml-[5.81rem] gap-[2.44rem]">
                  {crew}
                </div>
              </div>
            </div>
            <div className="mt-[3.12rem] flex">
              <div className="flex">
                <h2 className="text-white font-semibold text-[1rem]">
                  {credits && credits.length > 0 ? "Staring" : ""}
                </h2>
                <div className="grid grid-cols-4 grid-rows-3 ml-[5.81rem] gap-[2.44rem] flex-wrap">
                  {credits}
                </div>
              </div>
            </div>
            <h2 className="text-white  font-semibold text-[1rem] mt-[5.12rem]">
              Trailer And Clips
            </h2>
            <div className="mt-[1.69rem] w-[64.25rem] flex items-center gap-[2.44rem] overflow-x-auto scrollbar-rounded-lg scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-900 ">
              {video}
            </div>
            {/* <div className="mt-[3.12rem] flex">
              <div className="flex">
                <Link className="" href={`/movies/${id}/watch=${encodeURIComponent(title)}`}>
                  <button className="w-[13.75rem] h-[3.75rem] bg-[#FFCE31] text-[1rem] text-black font-semibold rounded-[0.65rem] hover:bg-[#f7c32d]"></button>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
