import { fetchDetailTv } from "@/app/actions";
import MainLayouts from "@/components/layouts/MainLayouts";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import Select from "@/components/select/Select";
import TvWatchPageView from "@/components/views/TvShowWatchPage";
import { FetchingData, fetchData } from "@/services/DataApi";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { MotionDiv } from "@/components/motion/FramerMotion";
import { Variants } from "framer-motion";
import useZoomPadding from "@/hooks/WindowSize";

type dataPageProps = {
  params: {
    slug: string;
  };
  searchParams: any;
};

export async function generateMetadata(
  { params }: dataPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const snapshot = await FetchingData(`tv/${id}`);
  const data = {
    title: snapshot.name,
    overview: snapshot.overview,
  };

  return {
    title: `${data.title} | Watch`,
    description: data.overview,
  };
}

type TvShowSubset = {
  name: string;
  number_of_seasons: number;
  seasons: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_count: number;
    poster_path: string;
    season_number: number;
  }[];
};

export default async function WatchTvPage(props: dataPageProps) {
  const { params } = props;
  const { searchParams } = props;
  const DetailTvSeason = await fetchDetailTv(
    `${params.slug}/season/${searchParams.season}`
  );
  const TvDetails = await fetchDetailTv(params.slug);
  const tvSeasonsData: TvShowSubset = {
    name: TvDetails.name,
    number_of_seasons: TvDetails.number_of_seasons,
    seasons: TvDetails.seasons,
  };

  const seasonNumber = () => {
    if (tvSeasonsData.number_of_seasons) {
      const options: Array<{ label: string; value: string }> = [];
      for (let i = 1; i <= tvSeasonsData.number_of_seasons; i++) {
        options.push({
          label: `Season ${i}`,
          value: `${i}`,
        });
      }
      return options;
    } else {
      return [];
    }
  };
  const seasons = seasonNumber();

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  console.log(DetailTvSeason);
  return (
    <>
      <NavbarFixed title={TvDetails.name} />
      <MainLayouts>
        {/* <TvWatchPageView slug={params.slug} /> */}
        <div className="mx-4 mt-[4rem] pt-[4rem] lg:pt-0 w-full">
          <div className="flex flex-col lg:flex-row sm:flex-row justify-between lg:my-5 gap-2 w-full">
            <h1 className="text-white text-[20px] font-semibold">
              {tvSeasonsData.name} - Season {searchParams.season}
            </h1>
            <Select
              className="mb-2 lg:mb-0"
              options={seasons}
              nameTv={TvDetails.name}
              slug={params.slug}
            />
          </div>
          {DetailTvSeason.episodes.length > 0 ? (
            <>
              <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-3 gap-5 w-fit">
                {DetailTvSeason.episodes.map((episode: any, index: any) => (
                  <MotionDiv
                    key={episode.name}
                    className="relative flex flex-col "
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      type: "tween",
                    }}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${episode.still_path}`}
                      alt={episode.name}
                      width={500}
                      height={500}
                      priority
                      className="rounded-md"
                    />
                    <div className="flex gap-2 mt-1">
                      <p className="text-white text-base">
                        {episode.episode_number}.
                      </p>
                      <p className="text-white text-base">{episode.name}</p>
                      <p className="text-gray-400 text-base ml-auto">
                        {episode.runtime}m
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm flex-shrink-0">
                      {episode.overview}
                    </p>
                  </MotionDiv>
                ))}
              </div>
            </>
          ) : (
            <p className="text-white text-lg">No episodes available</p>
          )}
        </div>
      </MainLayouts>
    </>
  );
}
