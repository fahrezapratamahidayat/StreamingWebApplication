import Sidebar from "@/components/sidebar/Sidebar";
import DetailViews from "@/components/views/MovieDetailsView";
import { movieSidebaritem } from "@/utils/data";
import { Metadata, ResolvingMetadata } from "next";
import { fetchData } from "@/services/DataApi";

type DetailMoviePageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: DetailMoviePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug

  const snapshot = await fetchData(`movie/${id}`)
  const data = {
    title : snapshot.title,
    overview : snapshot.overview
  }
 
  return {
    title: `${data.title} | Movie Details`,
    description: data.overview
  }
}

export default function DetailMovie(props: DetailMoviePageProps) {
  const { params } = props;
  return (
    <>
      <Sidebar items={movieSidebaritem}/>
      <DetailViews slug={params.slug} />
    </>
  );
}
