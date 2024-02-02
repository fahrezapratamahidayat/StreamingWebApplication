import MainLayouts from "@/components/layouts/MainLayouts";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import { FetchingData } from "@/services/DataApi";
import { Metadata, ResolvingMetadata } from "next";

type watchMovieProps = {
  params: {
    watch: string;
    slug: string;
  };
};

export async function generateMetadata(
  { params }: watchMovieProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const snapshot = await FetchingData(`movie/${id}`);
  const data = {
    title: snapshot.title,
    overview: snapshot.overview,
  };

  return {
    title: `${data.title} | Watch`,
    description: data.overview,
  };
}
export default async function watchMovie(props: watchMovieProps) {
  const { params } = props;
  return (
    <>
      {/* <div className=" mt-[5rem] mx-5 w-full pt-[4rem] lg:pt-0"> */}
      <div className="">
        <iframe
          id="iframe"
          src={`https://multiembed.mov/?video_id=${params.slug}&tmdb=1`}
          className="min-h-screen w-full"
          width={"100%"}
          height={"100%"}
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
