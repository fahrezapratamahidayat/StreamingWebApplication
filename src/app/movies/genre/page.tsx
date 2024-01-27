import { fetchGenreMovies } from "@/app/actions";
import CardLayouts from "@/components/layouts/CardLayout";
import PageLayout from "@/components/layouts/PageLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import { movieSidebaritem } from "@/utils/data";

export const metadata = {
  title: "Movie Genre",
  description: "Movie Genre",
};

const options = [
    { value: "popularity.desc", label: "Popularity",params : "popularity.desc"},
    { value: "revenue.desc", label: "Revenue",params: "revenue.desc"},
    { value: "primary_release_date.desc", label: "Primary Release Date",params: "primary_release_date.desc"},
    { value: "vote_average.desc", label: "Vote Average",params: "vote_average.desc"},
    { value: "vote_count.desc", label: "Vote Count",params: "vote_count.desc"},
]
export default async function GenrePage({ searchParams}: any) {
  const ParamsId = searchParams["id"];
  const ParamsName = searchParams["name"];

  const MoviesGenre = await fetchGenreMovies(1, ParamsId);
  return (
    <>
      <Sidebar items={movieSidebaritem} />
      <PageLayout>
        <CardLayouts title={ParamsName} options={options} >
            {MoviesGenre}
        </CardLayouts>
      </PageLayout>
    </>
  );
}
