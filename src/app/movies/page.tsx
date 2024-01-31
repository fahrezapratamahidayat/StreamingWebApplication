import { Metadata } from "next";
import { fetchMovies } from "../actions";
import MoviesPageView from "@/components/views/MoviesPage";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import { MovieEndpoints, movieSidebaritem } from "@/utils/data";
import PageLayout from "@/components/layouts/PageLayout";
import CardLayouts from "@/components/layouts/CardLayout";
import LoadMore from "@/components/button/LoadMore";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Movies",
  description: "...",
};

const endpoint = [
  { value: "Now_Playing", label: "Now Playing", params: "now-playing" },
  { value: "popular", label: "Popular", params: "popular" },
  { value: "top_rated", label: "Top Rated", params: "top-rated" },
  { value: "upcoming", label: "Up coming", params: "upcoming" },
];

export default async function Home({ searchParams }: { searchParams: any }) {
  const params = searchParams["sort"] ?? "now_playing";
  const { title, endpoints } = await MovieEndpoints(params);
  const Movies = await fetchMovies(1, endpoints);
  return (
    <>
      <Sidebar items={movieSidebaritem} />
      <PageLayout>
        <CardLayouts title={title} options={endpoint}>
          {Movies}
        </CardLayouts>
        <LoadMore fetchData={fetchMovies} endpoint={endpoints} />
      </PageLayout>
      <Footer />
    </>
  );
}
