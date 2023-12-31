import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import CardLayouts from "@/components/layouts/CardLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import TvShowsView from "@/pages/TvShowsViewPage";
import { tvShowsSidebarItem } from "@/utils/data";
import { Metadata } from "next";
import { fetchTvShow } from "../actions";
import LoadMore from "@/components/button/LoadMore";

export const metadata: Metadata = {
  title: "Tv Shows",
  description: "...",
};

export default async function TvShowsPage() {
  const TvShows = await fetchTvShow(1);

  return (
    <>
      <Sidebar items={tvShowsSidebarItem} />
      <TvShowsView>
        <CardLayouts title="Popular" className="lg:mr-[1.2rem]">
          {TvShows}
        </CardLayouts>
        <LoadMore fetchData={fetchTvShow} />
      </TvShowsView>
    </>
  );
}
