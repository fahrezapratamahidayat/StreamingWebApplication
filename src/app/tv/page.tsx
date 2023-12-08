import Sidebar from "@/components/sidebar/Sidebar";
import TvShowsView from "@/pages/TvShowsViewPage";
import { tvShowsSidebarItem } from "@/utils/ItemSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tv Shows',
    description: '...',
  }

export default function TvShowsPage(){
    return (
        <>
        <Sidebar items={tvShowsSidebarItem}/>
        <TvShowsView/>
        </>
        )
}