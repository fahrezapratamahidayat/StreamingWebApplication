import NavbarFixed from "@/components/navbar/NavbarFixed";
import Sidebar from "@/components/sidebar/Sidebar";
import { animeSidebarItem } from "@/utils/data";

export default async function AnimesWatchPage() {
  return (
    <>
      <NavbarFixed />
      <Sidebar items={animeSidebarItem} />
    </>
  );
}
