import { fetchGenreTv } from "@/app/actions";
import LoadMore from "@/components/button/LoadMore";
import CardLayouts from "@/components/layouts/CardLayout";
import PageLayout from "@/components/layouts/PageLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import { tvShowsSidebarItem, tvTitleGenre } from "@/utils/data";
type genrePageProps = {
  params: {
    genre: string;
  };
};

export const metadata = {
  title: "TV Genre",
  description: "TV Genre",
}

export default async function tvGenrePage(props: genrePageProps) {
  const { params } = props;
  const TvShowGenre = await fetchGenreTv(1, params.genre);
  const title = tvTitleGenre(params.genre);

  return (
    <>
    <Sidebar items={tvShowsSidebarItem} />
      <PageLayout>
        <CardLayouts title={title}>
          {TvShowGenre}
        </CardLayouts>
        {TvShowGenre && <LoadMore fetchData={fetchGenreTv} endpoint={params.genre} />}
      </PageLayout>
    </>
  );
}
