import { Metadata } from "next";
import { fetchTvShow } from "../actions";
import TvPageView from "@/components/views/TvPage";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Tv Shows",
  description: "...",
};

export default async function TvShowsPage() {
  const TvShows = await fetchTvShow(1,'popular');
  return (
    <>
      {/* <Sidebar items={tvShowsSidebarItem} />
      <PagesLayouts>
        <CardLayouts title="Popular" className="">
          {TvShows}
        </CardLayouts>
        <LoadMore fetchData={fetchTvShow} endpoint="popular"/>
      </PagesLayouts> */}
      <TvPageView />
    </>
  );
}
