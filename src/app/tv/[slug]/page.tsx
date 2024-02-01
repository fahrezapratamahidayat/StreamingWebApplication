import Sidebar from "@/components/sidebar/Sidebar";
import { tvShowsSidebarItem } from "@/utils/data";
import { Metadata, ResolvingMetadata } from "next";
import { fetchData } from "@/services/DataApi";``
import PageLayout from "@/components/layouts/PageLayout";
import { fetchDetailTv } from "@/app/actions";
import Image from "next/image";
import ButtonWatchNow from "@/components/button/ButtonWatchNow";
import ButtonWatchlist from "@/components/button/ButtonWatchlist";
import ListStaring from "@/components/fragments/ListStaring";
import CardVideo from "@/components/card/cardVideo";
import ListDirector from "@/components/fragments/ListDirector";

type TvShowDetailPageProps = {
  params: {
    slug: string;
  };
};
export async function generateMetadata(
  { params }: TvShowDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug;
  const snapshot = await fetchData(`tv/${id}`);
  const data = {
    name: snapshot.name,
    overview: snapshot.overview,
  };
  return {
    title: `${data.name} | Tv Show Details`,
    description: data.overview,
  };
}

export default async function TvShowDetailPage(props: TvShowDetailPageProps) {
  const { params } = props;
  let slice: number = 12;
  const TvDetails = await fetchDetailTv(params.slug);
  const Credits = await fetchDetailTv(`${params.slug}/credits`);
  const Videos = await fetchDetailTv(`${params.slug}/videos`);
  const Similar = await fetchDetailTv(`${params.slug}/similar`);

  return (
    <>
      <Sidebar items={tvShowsSidebarItem} />
      <PageLayout>
        <div className="relative rounded-[0.65rem] lg:mx-0 w-full">
          <div className="w-full overflow-x-hidden">
            <Image
              width={700}
              height={400}
              quality={100}
              priority={true}
              className="backdrop-blur-sm lg:h-[27.5rem] h-[30.5rem] w-full object-cover rounded-[0.65rem]"
              src={`https://image.tmdb.org/t/p/original/${TvDetails.backdrop_path}`}
              alt={TvDetails.name}
            />
          </div>
          <div className="absolute top-0 left-0 lg:h-full lg:w-full w-full h-full rounded-[0.65rem] inset-0 bg-gradient-to-b from-transparent to-black overflow-x-hidden"></div>
          <div className=" flex absolute top-0 left-0 h-full w-full  rounded-[0.65rem]">
            <div className="lg:ml-[2.31rem] ml-3 mt-[2.75rem]">
              <h1 className={` text-white text-[2.25rem] font-semibold`}>
                {TvDetails.name}
              </h1>
              <div className="flex items-center gap-[1.31rem]">
                <p className="text-white text-sm font-semibold flex items-center ml-[0.2rem] gap-[0.4rem] ">
                  {" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.4H12.3667L10 0L7.63333 7.4H0L6.16667 11.9667L3.83333 19.3333L10 14.7667L16.1667 19.3333L13.8 11.9333L20 7.4Z"
                      fill="#FFCE31"
                    />
                  </svg>
                  {TvDetails.vote_average.toFixed(1)}
                </p>
                <p className="text-white text-sm font-semibold">
                  {TvDetails.episode_run_time &&
                  TvDetails.episode_run_time.length > 0
                    ? TvDetails.episode_run_time + "m"
                    : "N/A"}
                </p>
                <p className="text-white text-smfont-semibold ">
                  {TvDetails.first_air_date.substr(0, 4)}
                </p>
                <p className="text-white text-sm font-semibold ">
                  {TvDetails.number_of_seasons} Seasons
                </p>
              </div>
              <p className="text-white text-sm font-semibold mt-[1.88rem]">
                {TvDetails.genres.map((genre: any) => genre.name).join(", ")}
              </p>
              <p className="overflow-y-auto overflow-overview pr-2 lg:w-[30.75rem] w-[23rem] lg:h-[7.75rem] h-[12.75rem]  flex-shrink-0 text-slate-300 text-sm font-semibold mt-[2.21rem] tracking-[-0.01em] text-justify ">
                {TvDetails.overview}
              </p>
              <div className="flex items-center lg:mt-[2.25rem] mt-[1.25rem]">
                <ButtonWatchNow
                  to={`/tv/${params.slug}/watch?=${TvDetails.name.replace(
                    /\s+/g,
                    "+"
                  )}/season/1`}
                />
                <ButtonWatchlist slug={params.slug} data={TvDetails} />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex lg:flex-col lg:ml-[2.5rem] lg:mx-0 mx-3">
          <div className="lg:mt-[3.12rem] mt-[5.69rem] flex">
            <div className="flex lg:flex-row flex-col lg:items-baseline">
              <h2 className="text-white font-semibold text-[1.25rem]">
                {Credits.crew.length > 0 ? "Director" : ""}
              </h2>
              <div className="flex items-center lg:ml-[5.41rem] ml-11 lg:mt-0 mt-5 gap-[2.44rem] flex-wrap">
                {Credits.crew
                  .filter(
                    (actor: { job: string, known_for_department: string }) =>
                    actor.job === "Novel" ||
                    actor.job === "Director" ||
                    actor.job === "Writer" ||
                    actor.job === "Writing" ||
                    actor.known_for_department === "Writing"
                  )
                  .map(
                    (actor: { name: string; job: string }, index: number) => (
                      <ListDirector
                        key={index}
                        nameDirector={actor.name}
                        jobDirector={actor.job}
                      />
                    )
                  )}
              </div>
            </div>
          </div>
          <div className="mt-[3.12rem] flex">
            <div className="flex lg:flex-row flex-col lg:items-baseline">
              <h2 className="text-white font-semibold text-[1.25rem]">
                {Credits.cast.length > 0 ? "Staring" : ""}
              </h2>
              <div
                className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  ml-11 lg:ml-[5.81rem] mt-5 gap-[2.44rem]`}
              >
                {Credits.cast
                  .slice(0, slice)
                  .map(
                    (
                      castMember: { name: string; character: string },
                      index: number
                    ) => (
                      <ListStaring
                        key={index}
                        nameCast={castMember.name}
                        jobCast={castMember.character}
                      />
                    )
                  )}
              </div>
            </div>
          </div>
          <h2 className="text-white  font-semibold text-[1rem] mt-[5.12rem]">
            Trailer And Clips
          </h2>
          <div className="mt-[1.69rem] pb-2 flex items-center overflow-x-auto overflow-video">
            {Videos.results.map((video: any, index: number) => (
              <CardVideo
                key={video.id}
                keyVideo={video.key}
                title={video.name}
              />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
}
