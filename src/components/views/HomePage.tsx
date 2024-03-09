import {fetchTrendingAll } from "@/app/actions";
import NavbarFixed from "../navbar/NavbarFixed";
import { HeroParallax } from "../ui/hero-parallax";

export default async function HomePageView() {
  const movies = await fetchTrendingAll(`movie/upcoming`);
  const tv = await fetchTrendingAll(`tv/top_rated`);

  return (
    <>
      <NavbarFixed />
      <HeroParallax movies={movies} tv={tv} speed="slow" direction="left" />
        {/* <div className="">
          <div className="flex items-center justify-center">
            <h1
              className={`font-bold lg:text-7xl text-5xl text-white tracking-widest relative z-10`}
            >
              Santai Movies
            </h1>
          </div>
        </div> */}
    </>
  );
}
