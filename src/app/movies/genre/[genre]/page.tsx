import MoviesGenreView from "@/pages/MoviesGenreView";

type genrePageProps = {
  params: {
    genre: string;
  };
};

export const metadata = {
  title: "Movie Genre",
  description: "Movie Genre",
}

export default function GenrePage(props: genrePageProps) {
  const { params } = props;
  return (
    <>
    <MoviesGenreView params={params}/>
    </>
  );
}
