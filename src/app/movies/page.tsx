import { Metadata } from "next";
import { fetchMovies } from "../actions";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import { MovieEndpoints, movieSidebaritem } from "@/utils/data";
import PageLayout from "@/components/layouts/PageLayout";
import CardLayouts from "@/components/layouts/CardLayout";
import LoadMore from "@/components/button/LoadMore";
import NavbarFixed from "@/components/navbar/NavbarFixed";

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
      <NavbarFixed title={title} />
      <div className="90-zoom:px-[2rem] 80-zoom:px-[3rem] 75-zoom:px-[4rem] 67-zoom:px-[7rem] 50-zoom:px-[32rem] 33-zoom:px-[82rem] 25-zoom:px-[134rem]">
        <Sidebar items={movieSidebaritem} />
        <PageLayout>
          <CardLayouts title={title} options={endpoint}>
            {Movies}
          </CardLayouts>
          <LoadMore fetchData={fetchMovies} endpoint={endpoints} />
        </PageLayout>
        <Footer />
      </div>
    </>
  );
}
