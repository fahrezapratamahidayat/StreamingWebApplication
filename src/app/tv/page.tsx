import CardLayouts from "@/components/layouts/CardLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { tvShowsSidebarItem } from "@/utils/data";
import { Metadata } from "next";
import { fetchTvShow } from "../action";
import LoadMore from "@/components/button/LoadMore";
import PagesLayouts from "@/components/layouts/PagesLayouts";
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
