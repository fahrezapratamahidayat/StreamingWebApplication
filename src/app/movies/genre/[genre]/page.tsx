import { fetchGenreMovies } from "@/app/action";
import Loading from "@/app/tv/loading";
import LoadMore from "@/components/button/LoadMore";
import CardLayouts from "@/components/layouts/CardLayout";
import SkeletonSidebar from "@/components/skeleton/SkeletonSidebar";
import MoviesGenreView from "@/pages/MoviesGenreView";
import { movieTitleGenre } from "@/utils/data";

type genrePageProps = {
  params: {
    genre: string;
  };
};

export const metadata = {
  title: "Movie Genre",
  description: "Movie Genre",
}

export default async function GenrePage(props: genrePageProps) {
  const { params } = props;
  const MoviesGenre = await fetchGenreMovies(1, params.genre);
  const title = movieTitleGenre(params.genre);
  
  return (
    <>
    <MoviesGenreView params={params.genre}>
      <CardLayouts title={title}>
        {MoviesGenre}
      </CardLayouts>
      <LoadMore fetchData={fetchGenreMovies} endpoint="" />
    </MoviesGenreView>
    </>
  );
}
