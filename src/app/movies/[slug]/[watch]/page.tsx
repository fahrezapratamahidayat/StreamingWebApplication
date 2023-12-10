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
        <div className=" mt-[5rem] mx-5 w-full pt-[4rem] lg:pt-0">
            <iframe 
            src={`https://www.2embed.cc/embed/${params.slug}`} 
            className="lg:h-[27.5rem] lg:w-[63rem] w-full h-full"
            allowFullScreen
            >
            </iframe>
        </div>
        </>
    );
}