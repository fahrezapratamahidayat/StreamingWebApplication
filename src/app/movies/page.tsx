import { Metadata } from "next";
import { fetchMovies } from "../action";
import MoviesPageView from "@/components/views/MoviesPage";

export const metadata: Metadata = {
  title: "Movies",
  description: "...",
};

export default async function Home() {
  const Movies = await fetchMovies(1,'now_playing');
  return (
    <>
      {/* <Sidebar items={movieSidebaritem} />
      <PagesLayouts>
        <CardLayouts title="Now Playing" className="">
          {Movies}
        </CardLayouts>
        <LoadMore fetchData={fetchMovies} endpoint="now_playing"  />
      </PagesLayouts> */}
      <MoviesPageView />
    </>
  );
}
