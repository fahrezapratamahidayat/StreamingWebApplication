import { Metadata } from "next";
import { fetchTvShow } from "../actions";
import TvPageView from "@/components/views/TvPage";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import { TvshowEndpoints, tvShowsSidebarItem } from "@/utils/data";
import PageLayout from "@/components/layouts/PageLayout";
import CardLayouts from "@/components/layouts/CardLayout";
import { Console } from "console";
import LoadMore from "@/components/button/LoadMore";

export const metadata: Metadata = {
  title: "Tv Shows",
  description: "...",
};

const endpoint = [
  { value: "on_the_air", label: "On The Air",params: "on-the-air"},
  { value: "airing_today", label: "Airing Today",params: "airing-today"},
  { value: "popular", label: "Popular",params: "popular"},
  { value: "top_rated", label: "Top Rated",params: "top-rated" },
]

export default async function TvShowsPage({searchParams}: {searchParams: any}) {
  const params = searchParams["sort"] ?? "popular";
  const { title, endpoints } = await TvshowEndpoints(params);
  const TvShows = await fetchTvShow(1, endpoints);
  return (
    <>
    <Sidebar items={tvShowsSidebarItem}/>
    <PageLayout>
      <CardLayouts title={title} options={endpoint}>
        {TvShows}
      </CardLayouts>
      <LoadMore fetchData={fetchTvShow} endpoint={endpoints} />
    </PageLayout>
    </>
  );
}
