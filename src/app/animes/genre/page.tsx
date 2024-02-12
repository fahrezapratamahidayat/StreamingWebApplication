import { fetchAnimesGenre } from "@/app/actions";
import PageLayout from "@/components/layouts/PageLayout";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import Sidebar from "@/components/sidebar/Sidebar";
import { animeSidebarItem } from "@/utils/data";

export default async function GenreAnimesPage({ searchParams }: any) {
    const genre = searchParams.name
    const id = searchParams.id
    console.log(id)
  const AnimesGenre = fetchAnimesGenre(1, genre);
  return (
    <>
      <NavbarFixed />
      <Sidebar items={animeSidebarItem} params={searchParams.name} />
      <PageLayout>
        <h1>test</h1>
      </PageLayout>
    </>
  );
}
