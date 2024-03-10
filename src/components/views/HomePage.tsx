import { fetchTrendingAll } from "@/app/actions";
import NavbarFixed from "../navbar/NavbarFixed";
import { HeroParallax } from "../ui/hero-parallax";

export default async function HomePageView() {
  const movies = await fetchTrendingAll(`movie/upcoming`);
  const tv = await fetchTrendingAll(`tv/top_rated`);
  return (
    <>
      <NavbarFixed />
      <HeroParallax movies={movies} tv={tv} />
    </>
  );
}
