import Sidebar from "@/components/sidebar/Sidebar";
import { Metadata } from "next";
import { fetchMovies } from "../action";
import { movieSidebaritem} from "@/utils/data";
import LoadMore from "@/components/button/LoadMore";
import CardLayouts from "@/components/layouts/CardLayout";
import PagesLayouts from "@/components/layouts/PagesLayouts";
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
