import NavbarFixed from "@/components/navbar/NavbarFixed";
import { fetchAnimes } from "../actions";
import Sidebar from "@/components/sidebar/Sidebar";
import PageLayout from "@/components/layouts/PageLayout";
import CardLayouts from "@/components/layouts/CardLayout";
import { animeSidebarItem } from "@/utils/data";
import Footer from "@/components/footer/Footer";
import LoadMore from "@/components/button/LoadMore";

export default async function Page() {
  const animes = await fetchAnimes(1);
  return (
    <>
      <NavbarFixed />
      <div className="90-zoom:px-[2rem] 80-zoom:px-[3rem] 75-zoom:px-[4rem] 67-zoom:px-[7rem] 50-zoom:px-[32rem] 33-zoom:px-[82rem] 25-zoom:px-[134rem]">
        <Sidebar items={animeSidebarItem} />
        <PageLayout>
            <CardLayouts title="Top Animes">
                {animes}
            </CardLayouts>
            <LoadMore fetchData={fetchAnimes} endpoint=""/>
        </PageLayout>
        <Footer />
      </div>
    </>
  );
}
