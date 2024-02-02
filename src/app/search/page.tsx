import MainLayouts from "@/components/layouts/MainLayouts";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import SearchPageView from "@/components/views/SearchPage";

export const metadata = {
  title: "Search",
  description: "Search",
};
export default function Search() {
  return (
    <>
      <MainLayouts>
        <NavbarFixed />
        <SearchPageView />
      </MainLayouts>
    </>
  );
}
