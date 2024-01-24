import { fetchGenreMovies } from "@/app/actions";
import LoadMore from "@/components/button/LoadMore";
import CardLayouts from "@/components/layouts/CardLayout";
import PageLayout from "@/components/layouts/PageLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import { movieSidebaritem, movieTitleGenre } from "@/utils/data";

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
    <Sidebar items={movieSidebaritem} />
    <PageLayout>
      <CardLayouts title={title}>
        {MoviesGenre}
      </CardLayouts>
      <LoadMore fetchData={fetchGenreMovies} endpoint="" />
    </PageLayout>
    </>
  );
}
