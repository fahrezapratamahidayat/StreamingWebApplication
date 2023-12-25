import MainLayouts from "@/layouts/MainLayouts";
import PageLayouts from "@/layouts/PageLayouts";
import SearchPageView from "@/pages/SearchPageView";

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
