"use client";
import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
export default function NavbarFixed() {
  const pathname : any = usePathname();
  return (
    <>
      <div
        className="fixed z-40 w-full backdrop-blur flex-none 
          transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10
        dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent"
      >
        <div className="flex items-center py-5 px-[3.44rem]  ">
          <h1
            className={`${moul.variable} font-moul font-bold text-white text-[1.25rem]`}
          >
            Movie.Z
          </h1>
          <ul className="flex items-center gap-[1.62rem] ml-[11.5rem]">
            <li
              className={`${inter.variable} font-inter ${
                pathname === "/" ? "text-white" : "text-[#939393]"
              } font-bold text-[1.25rem] hover:text-white cursor-pointer `}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`${inter.variable} font-inter ${
                pathname.startsWith("/movies") ? "text-white" : "text-[#939393]"
              } font-bold text-[1.25rem] hover:text-white cursor-pointer `}
            >
              <Link href="/movies">Movies</Link>
            </li>
            <li
              className={`${inter.variable} font-inter ${
                pathname.startsWith("/tv") ? "text-white" : "text-[#939393]"
              } font-bold text-[1.25rem] hover:text-white cursor-pointer`}
            >
              <Link href="/tv">Tv Shows</Link>
            </li>
            <li
              className={`${inter.variable} font-inter ${
                pathname === "/animes" ? "text-white" : "text-[#939393]"
              } font-bold text-[1.25rem] hover:text-white cursor-pointer`}
            >
              Animes
            </li>
          </ul>
          <div className="ml-[22.18rem] ">
            <Link
              className={`${monstserrat.variable} font-monstserrat text-[1.25rem] text-white font-bold hover:text-white cursor-pointer`}
              href="/search/movies"
            ></Link>
          </div>
        </div>
      </div>
    </>
  );
}
