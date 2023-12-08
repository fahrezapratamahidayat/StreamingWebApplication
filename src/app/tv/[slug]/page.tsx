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
  const data = await fetchData(`tv/${id}`)
  const product = data
  return {
    title: product.name,
    description: product.overview,
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
