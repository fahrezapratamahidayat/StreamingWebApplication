import Sidebar from "@/components/sidebar/Sidebar";
import DetailViews from "@/components/views/MovieDetailsView";
import { movieSidebaritem } from "@/utils/data";
import { Metadata, ResolvingMetadata } from "next";
import { fetchData } from "@/services/DataApi";
import { fetchDetailMovie } from "@/app/actions";
import PageLayout from "@/components/layouts/PageLayout";
import Image from "next/image";
import ButtonWatchlist from "@/components/button/ButtonWatchlist";
import ListDirector from "@/components/fragments/ListDirector";
import ListStaring from "@/components/fragments/ListStaring";
import CardVideo from "@/components/card/cardVideo";
import ButtonWatchNow from "@/components/button/ButtonWatchNow";

type DetailMoviePageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: DetailMoviePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const snapshot = await fetchDetailMovie(id);
  const data = {
    title: snapshot.title,
    overview: snapshot.overview,
  };

  return {
    title: `${data.title} | Movie Details`,
    description: data.overview,
  };
}

export default async function DetailMovie(props: DetailMoviePageProps) {
  const { params } = props;
  let slice: number = 12;
  const MoviesDetail = await fetchDetailMovie(params.slug);
  const Credits = await fetchDetailMovie(`${params.slug}/credits`);
  const Videos = await fetchDetailMovie(`${params.slug}/videos`);
  const Similar = await fetchDetailMovie(`${params.slug}/similar`);
  return (
    <>
      <Sidebar items={movieSidebaritem} />
      <PageLayout>
        <div className="relative rounded-[0.65rem] lg:mx-0 w-full ">
          <div className="w-full">
            <Image
              width={700}
              height={400}
              quality={100}
              priority={true}
              className="backdrop-blur-sm lg:h-[34rem] h-[30.5rem] w-full object-cover rounded-[0.65rem]"
              src={`https://image.tmdb.org/t/p/original/${MoviesDetail.backdrop_path}`}
              alt={MoviesDetail.title}
            />
          </div>
          <div className="absolute top-0 left-0 lg:h-full lg:w-full h-full w-full rounded-[0.65rem] inset-0 bg-gradient-to-b from-transparent to-black dark:bg-gradient-to-b dark:from-transparent dark:to-black"></div>
          <div className="flex absolute top-0 left-0 h-full w-full  rounded-[0.65rem]">
            <div className="lg:ml-[2.31rem] ml-3 mt-[2.75rem]">
              <h1 className={` text-white text-[2.25rem] font-semibold`}>
                {MoviesDetail.title}
              </h1>
              <div className="flex items-center gap-[1.31rem]">
                <p className="text-white text-sm font-semibold flex items-center ml-[0.2rem] gap-[0.4rem]">
                  {" "}
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.4H12.3667L10 0L7.63333 7.4H0L6.16667 11.9667L3.83333 19.3333L10 14.7667L16.1667 19.3333L13.8 11.9333L20 7.4Z"
                      fill="#FFCE31"
                    />
                  </svg>
                  {MoviesDetail.vote_average.toFixed(1)}
                </p>
                <p className="text-white text-sm font-semibold">
                  {MoviesDetail.runtime ? MoviesDetail.runtime + "m" : "N/A"}
                </p>
                <p className="text-white text-sm font-semibold">
                  {MoviesDetail.release_date.substr(0, 4)}
                </p>
              </div>
              <p className="text-white text-sm font-semibold mt-[1.88rem]">
                {MoviesDetail.genres.map((genre: any) => genre.name).join(", ")}
              </p>
              <p className="overflow-y-auto overflow-overview pr-2 lg:w-[30.75rem] w-[23rem] lg:h-[7.75rem] h-[12.75rem]   flex-shrink-0 text-slate-300 text-sm font-semibold mt-[2.21rem] tracking-[-0.01em] text-justify ">
                {MoviesDetail.overview}
              </p>
              <div className="flex items-center lg:mt-[8.25rem] mt-[1.25rem]">
                <ButtonWatchNow
                  to={`/movies/${
                    params.slug
                  }/watch?=${MoviesDetail.title.replace(/\s+/g, "+")}`}
                />
                <ButtonWatchlist slug={params.slug} data={MoviesDetail} />
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
                    (actor: { job: string }) =>
                      actor.job === "Director" || actor.job === "Writer"
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
