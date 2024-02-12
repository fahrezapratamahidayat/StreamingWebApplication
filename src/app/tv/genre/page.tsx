import { fetchGenreTv } from "@/app/actions";
import LoadMore from "@/components/button/LoadMore";
import Footer from "@/components/footer/Footer";
import CardLayouts from "@/components/layouts/CardLayout";
import PageLayout from "@/components/layouts/PageLayout";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import Sidebar from "@/components/sidebar/Sidebar";
import { tvShowsSidebarItem } from "@/utils/data";

export const metadata = {
  title: "TV Genre",
  description: "TV Genre",
};

export default async function tvGenrePage({ searchParams }: any) {
  const ParamsId = searchParams["id"];
  const ParamsName = searchParams["name"];
  const TvShowGenre = await fetchGenreTv(1, ParamsId);
  return (
    <>
      <NavbarFixed />
      <div className="90-zoom:px-[2rem] 80-zoom:px-[3rem] 75-zoom:px-[4rem] 67-zoom:px-[7rem] 50-zoom:px-[32rem] 33-zoom:px-[82rem] 25-zoom:px-[134rem]">
        <Sidebar items={tvShowsSidebarItem} params={ParamsName} idParams={ParamsId}/>
        <PageLayout>
          <CardLayouts title={ParamsName}>{TvShowGenre}</CardLayouts>
          <LoadMore fetchData={fetchGenreTv} endpoint={ParamsId} />
        </PageLayout>
        <Footer />
      </div>
    </>
  );
}
