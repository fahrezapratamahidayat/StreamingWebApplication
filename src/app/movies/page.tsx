import Sidebar from "@/components/sidebar/Sidebar";
import Homeviews from "@/pages/MoviesViewPage";
import { Metadata } from "next";
import { fetchMovies } from "../actions";
import { movieSidebaritem} from "@/utils/data";
import LoadMore from "@/components/button/LoadMore";
import CardLayouts from "@/components/layouts/CardLayout";

export const metadata: Metadata = {
  title: "Movies",
  description: "...",
};

export default async function Home() {
  const Movies = await fetchMovies(1);
  return (
    <>
      <Sidebar items={movieSidebaritem} />
      <Homeviews>
        <CardLayouts title="Now Playing" className="">
          {Movies}
        </CardLayouts>
        <LoadMore fetchData={fetchMovies}  />
      </Homeviews>
    </>
  );
}
