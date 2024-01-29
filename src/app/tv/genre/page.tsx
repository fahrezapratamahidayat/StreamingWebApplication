import { fetchGenreTv } from "@/app/actions";
import LoadMore from "@/components/button/LoadMore";
import CardLayouts from "@/components/layouts/CardLayout";
import PageLayout from "@/components/layouts/PageLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import { tvShowsSidebarItem, } from "@/utils/data";

export const metadata = {
  title: "TV Genre",
  description: "TV Genre",
};

export default async function tvGenrePage({ searchParams }: any) {
  const ParamsId = searchParams["id"];
  const ParamsName = searchParams["name"];
  const TvShowGenre = await fetchGenreTv(1, ParamsId);
  return (
    <>
      <Sidebar items={tvShowsSidebarItem} />
      <PageLayout>
        <CardLayouts title={ParamsName}>
          {TvShowGenre}
        </CardLayouts>
        <LoadMore fetchData={fetchGenreTv} endpoint={ParamsId} />
      </PageLayout>
    </>
  );
}
