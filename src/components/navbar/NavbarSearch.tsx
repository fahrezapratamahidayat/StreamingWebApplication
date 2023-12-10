import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
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
export default function NavbarSearch({children} : {children: React.ReactNode})  {
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
            Movie.INFC
          </h1>
          <ul className="lg:flex hidden items-center gap-[1.62rem] ml-[10.6rem]">
            <li
              className={`${inter.variable} font-inter text-white font-bold text-[1.25rem] hover:text-white cursor-pointer `}
            >
              <Link href="/">Movies</Link>
            </li>
            <li
              className={`${inter.variable} font-inter text-[#939393] font-bold text-[1.25rem] hover:text-white cursor-pointer`}
            >
              <Link href="/tvshow">Tv Show</Link>
            </li>
            <li
              className={`${inter.variable} font-inter text-[#939393] font-bold text-[1.25rem] hover:text-white cursor-pointer`}
            >
              Animes
            </li>
          </ul>
          <div className="ml-[22.18rem] ">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
