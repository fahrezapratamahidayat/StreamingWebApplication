import TvGenreView from "@/pages/TvGenreView";

type genrePageProps = {
  params: {
    genre: string;
  };
};

export const metadata = {
  title: "TV Genre",
  description: "TV Genre",
}

export default function tvGenrePage(props: genrePageProps) {
  const { params } = props;
  return (
    <>
      <TvGenreView params={params} />
    </>
  );
}
