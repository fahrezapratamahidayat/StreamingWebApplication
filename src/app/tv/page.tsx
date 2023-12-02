import Sidebar from "@/components/sidebar/Sidebar";
import TvShowsView from "@/pages/TvShowsViewPage";
import { tvShowsSidebarItem } from "@/utils/ItemSidebar";

export default function TvShowsPage(){
    return (
        <>
        <Sidebar items={tvShowsSidebarItem}/>
        <TvShowsView/>
        </>
        )
}