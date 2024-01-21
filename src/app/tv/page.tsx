import { Metadata } from "next";
import { fetchTvShow } from "../action";
import TvPageView from "@/components/views/TvPage";

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
