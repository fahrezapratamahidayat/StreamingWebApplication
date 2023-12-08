import Sidebar from "@/components/sidebar/Sidebar";
import DetailViews from "@/pages/MovieDetailsView";
import { movieSidebaritem } from "@/utils/ItemSidebar";
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

  const data = await fetchData(`movie/${id}`)
  const product = {
    title : data.title,
    overview : data.overview
  }
 
  return {
    title: `${product.title} | Movie Details`,
    description: product.overview
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
