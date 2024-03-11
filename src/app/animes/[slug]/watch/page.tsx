import { fetchDetailAnime } from "@/app/actions";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import Sidebar from "@/components/sidebar/Sidebar";
import { animeSidebarItem } from "@/utils/data";
import { Metadata, ResolvingMetadata } from "next";

type DetailAnimePageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: DetailAnimePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const snapshot = await fetchDetailAnime(
    `https://api.jikan.moe/v4/anime/${id}/full`
  );
  const data = {
    title: snapshot.title,
    synopsis: snapshot.synopsis,
  };

  return {
    title: `${data.title} | Watch`,
    description: data.synopsis,
  };
}

export default async function AnimesWatchPage() {
  return (
    <>
      <NavbarFixed />
      <Sidebar items={animeSidebarItem} />
    </>
  );
}
