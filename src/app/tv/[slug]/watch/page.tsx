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
import CardTvEpisodes from "@/components/card/CardTvEpisodes";
import Modal from "@/components/Modal";

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

  const detailEpisode =
    searchParams.episode &&
    (await fetchData(
      `tv/${params.slug}/season/${searchParams.season}/episode/${searchParams.episode}`
    ));
  console.log(detailEpisode);
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
  const searchParamsEpisode = searchParams.episode ? true : false;
  return (
    <>
      <NavbarFixed title={TvDetails.name} />
      <MainLayouts>
        {/* <TvWatchPageView slug={params.slug} /> */}
        <div className="mx-4 mt-[4rem] pt-[4rem] lg:pt-0 w-full">
          <div className="flex flex-col lg:flex-row sm:flex-row justify-between lg:my-5 gap-2 w-full">
            <h1 className="text-white text-[20px] font-semibold">
              {tvSeasonsData.name} - Season {searchParams.season}{" "}
              {searchParams.episode ? `- Episode ${searchParams.episode}` : ""}
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
              {searchParamsEpisode ? (
                <div className="">
                  
                </div>
              ) : (
                <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-3 gap-5 w-fit">
                  {DetailTvSeason.episodes.map((episode: any, index: any) => (
                    <>
                      <CardTvEpisodes
                        key={episode.name}
                        episode={episode}
                        index={index}
                        linkUrlModal={`/tv/${
                          params.slug
                        }/watch?q=${tvSeasonsData.name.replace(
                          /\s+/g,
                          "+"
                        )}&season=${searchParams.season}&episode=${
                          episode.episode_number
                        }`}
                      />
                    </>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-white text-lg">No episodes available</p>
          )}
        </div>
      </MainLayouts>
    </>
  );
}
