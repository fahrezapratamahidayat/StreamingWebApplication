import MainLayouts from "@/components/layouts/MainLayouts";
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
export default function watchMovie(props: watchMovieProps) {
  const { params } = props;
  return (
    <>
    <MainLayouts>
    <div className=" mt-[5rem] mx-5 w-full pt-[4rem] lg:pt-0">
        <iframe
          src={`https://multiembed.mov/?video_id=${params.slug}&tmdb=1`}
          className="lg:h-[31.5rem] w-full h-full "
          allowFullScreen
        ></iframe>
      </div>
    </MainLayouts>
    </>
  );
}
