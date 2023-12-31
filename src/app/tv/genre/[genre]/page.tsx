import { fetchGenreTv } from "@/app/actions";
import LoadMore from "@/components/button/LoadMore";
import CardLayouts from "@/components/layouts/CardLayout";
import TvGenreView from "@/pages/TvGenreView";
import { tvTitleGenre } from "@/utils/data";
import { useSearchParams } from "next/navigation";

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
      <TvGenreView params={title}>
        <CardLayouts title={title} className="lg:mr-[1.2rem]">
          {TvShowGenre}
        </CardLayouts>
        <LoadMore fetchData={fetchGenreTv} genre={params.genre} />
      </TvGenreView>
    </>
  );
}
