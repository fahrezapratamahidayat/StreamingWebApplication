import MainLayouts from "@/components/layouts/MainLayouts";
import SearchPageView from "@/components/views/SearchPage";


export const metadata = {
  title: "Search",
  description: "Search",
};
export default function Search() {
  return (
    <>
    <MainLayouts>
        <SearchPageView />
    </MainLayouts>
    </>
  );
}
