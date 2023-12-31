import MainLayouts from "@/components/layouts/MainLayouts";
import PageLayouts from "@/components/layouts/PageLayouts";
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
