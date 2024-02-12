import { fetchGenreMovies } from "@/app/actions";
import LoadMore from "@/components/button/LoadMore";
import Footer from "@/components/footer/Footer";
import CardLayouts from "@/components/layouts/CardLayout";
import PageLayout from "@/components/layouts/PageLayout";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import Sidebar from "@/components/sidebar/Sidebar";
import { movieSidebaritem } from "@/utils/data";

export const metadata = {
  title: "Movie Genre",
  description: "Movie Genre",
};

const options = [
  { value: "popularity.desc", label: "Popularity", params: "popularity.desc" },
  { value: "revenue.desc", label: "Revenue", params: "revenue.desc" },
  {
    value: "primary_release_date.desc",
    label: "Primary Release Date",
    params: "primary_release_date.desc",
  },
  {
    value: "vote_average.desc",
    label: "Vote Average",
    params: "vote_average.desc",
  },
  { value: "vote_count.desc", label: "Vote Count", params: "vote_count.desc" },
];
export default async function GenrePage({ searchParams }: any) {
  const ParamsId = searchParams["id"];
  const ParamsName = searchParams["name"];

  const MoviesGenre = await fetchGenreMovies(1, ParamsId);
  return (
    <>
      <NavbarFixed />
      <div className="90-zoom:px-[2rem] 80-zoom:px-[3rem] 75-zoom:px-[4rem] 67-zoom:px-[7rem] 50-zoom:px-[32rem] 33-zoom:px-[82rem] 25-zoom:px-[134rem]">
        <Sidebar items={movieSidebaritem} params={ParamsName} idParams={ParamsId} />
        <PageLayout>
          <CardLayouts title={ParamsName} options={options}>
            {MoviesGenre}
          </CardLayouts>
          <LoadMore fetchData={fetchGenreMovies} endpoint={ParamsId} />
        </PageLayout>
        <Footer />
      </div>
    </>
  );
}
