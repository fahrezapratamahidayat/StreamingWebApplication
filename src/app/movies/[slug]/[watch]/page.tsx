'use client'
import Sidebar from "@/components/sidebar/Sidebar";
import { movieSidebaritem } from "@/utils/ItemSidebar";

type watchMovieProps = {
    params: {
      watch: string;
      slug: string;
    };
  };
export default function watchMovie(props: watchMovieProps) {
    const { params } = props;
    return (
        <>
        <Sidebar items={movieSidebaritem}/>
        <div className="ml-[21rem] mt-[5rem]">
            <iframe 
            src={`https://www.2embed.cc/embed/${params.slug}`} 
            className="h-[27.5rem] w-[67rem]"
            allowFullScreen
            >
            </iframe>
        </div>
        </>
    );
}