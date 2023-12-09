import Sidebar from "@/components/sidebar/Sidebar";
import TvShowDetailView from "@/pages/TvShowDetailView";
import { tvShowsSidebarItem } from "@/utils/ItemSidebar";
import { Metadata, ResolvingMetadata } from "next";
import { fetchData } from "@/services/DataApi";

type TvShowDetailPageProps = {
  params: {
    slug: string;
  };
};
export async function generateMetadata(
  { params }: TvShowDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug
  const snapshot = await fetchData(`tv/${id}`)
  const data = {
    name: snapshot.name,
    overview: snapshot.overview
  }
  return {
    title: `${data.name} | Tv Show Details`,
    description: data.overview,
  }
}

export default function TvShowDetailPage(props: TvShowDetailPageProps) {
  const { params } = props;
  return (
    <>
      <Sidebar items={tvShowsSidebarItem} />
      <TvShowDetailView slug={params.slug}/>
    </>
  );
}
