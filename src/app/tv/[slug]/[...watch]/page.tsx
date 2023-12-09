import TvWatchPageView from "@/pages/TvShowWatchPage";
import { fetchData } from "@/services/DataApi";
import { Metadata, ResolvingMetadata } from "next";

type dataPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: dataPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug

  const snapshot = await fetchData(`tv/${id}`)
  const data = {
    title : snapshot.name,
    overview : snapshot.overview
  }
 
  return {
    title: `${data.title} | Watch`,
    description: data.overview
  }
}
export default function WatchTvPage(props: dataPageProps) {
  const { params } = props;
  

  return (
    <>
    <TvWatchPageView slug={params.slug} />
    </>
  );
}
