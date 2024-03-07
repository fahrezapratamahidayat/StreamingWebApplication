import {
  fetchDetailAnime,
  fetchDetailAnimeCharacters,
  fetchDetailAnimeVideos,
} from "@/app/actions";
import AnimeSynopsis from "@/components/AnimeSynopsis";
import ButtonWatchNow from "@/components/button/ButtonWatchNow";
import ButtonWatchlist from "@/components/button/ButtonWatchlist";
import ListDirector from "@/components/fragments/ListDirector";
import ListStaring from "@/components/fragments/ListStaring";
import PageLayout from "@/components/layouts/PageLayout";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import Sidebar from "@/components/sidebar/Sidebar";
import { animeSidebarItem } from "@/utils/data";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

type DetailAnimePageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: DetailAnimePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  const snapshot = await fetchDetailAnime(
    `https://api.jikan.moe/v4/anime/${id}/full`
  );
  const data = {
    title: snapshot.title,
    synopsis: snapshot.synopsis,
  };

  return {
    title: `${data.title} | Anime Details`,
    description: data.synopsis,
  };
}

export default async function DetailAnime(props: DetailAnimePageProps) {
  const { params } = props;
  const anime = await fetchDetailAnime(
    `https://api.jikan.moe/v4/anime/${params.slug}/full`
  );
  const characters = await fetchDetailAnimeCharacters(
    `https://api.jikan.moe/v4/anime/${params.slug}/characters`
  );
  const videos = await fetchDetailAnimeVideos(
    `https://api.jikan.moe/v4/anime/${params.slug && params.slug}/videos`
  );

  const staff = await fetchDetailAnime(
    `https://api.jikan.moe/v4/anime/${params.slug}/staff`
  );
  return (
    <>
      <NavbarFixed title={anime.title} />
      <Sidebar items={animeSidebarItem} />
      <PageLayout>
        <div className="relative rounded-[0.65rem] lg:mx-0 w-full ">
          <div className="w-full">
            <Image
              width={425}
              height={600}
              quality={100}
              priority={true}
              className="backdrop-blur-sm w-full lg:w-[425px] object-cover rounded-[0.65rem]"
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
            />
          </div>
          <div className="absolute top-1 left-0 lg:h-full lg:w-full h-full w-full rounded-[0.65rem] inset-0 bg-gradient-to-b from-transparent to-black dark:bg-gradient-to-b dark:from-transparent dark:to-black"></div>
          <div className="flex absolute top-0 left-0 h-full w-full rounded-[0.65rem]">
            <div className="lg:ml-[30.31rem] mx-2 mt-[2.75rem] lg:mt-[2.75rem]">
              <h1 className={` text-white text-[2.25rem] font-semibold`}>
                {anime.title}
              </h1>
              <div className="flex items-center lg:gap-[1.31rem] md:gap-[1.31rem] gap-x-[1.31rem] gap-y-1 flex-wrap">
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
                  {anime.score}
                </p>
                <p className="text-white text-sm font-semibold">
                  {anime.duration}
                </p>
                <p className="text-white text-sm font-semibold">
                  {anime.aired.string}
                </p>
                <p className="text-white text-sm font-semibold">{anime.type}</p>
                <p className="text-white text-sm font-semibold">
                  {anime.status === "Currently Airing"
                    ? "Ongoing"
                    : "Completed"}
                </p>
                <p className="text-white text-sm font-semibold">{anime.type}</p>
              </div>
              <p className="text-white text-sm font-semibold mt-[1.75rem]">
                Studios :{" "}
                {anime.studios.map((producer: any) => (
                  <Link
                    key={producer.name}
                    className="hover:text-gray-400"
                    href={producer.url}
                  >
                    {producer.name},{" "}
                  </Link>
                ))}
              </p>
              <p className="text-white text-sm font-semibold">
                Genres :{" "}
                <span>
                  {anime.genres.map((genre: any) => genre.name).join(", ")}
                </span>
              </p>
              <p className="text-white text-sm font-semibold">
                Producers :{" "}
                {anime.producers.map((producer: any) => (
                  <Link
                    key={producer.name}
                    className="hover:text-gray-400"
                    href={producer.url}
                  >
                    {producer.name},{" "}
                  </Link>
                ))}
              </p>
              <AnimeSynopsis synopsis={anime.synopsis} />
              <div className="flex items-center mt-[3.25rem] lg:mt-0">
                <ButtonWatchNow
                  to={`/animes/${params.slug}/watch?q=${anime.title.replace(
                    /\s+/g,
                    "+"
                  )}`}
                />
                <ButtonWatchlist slug={params.slug} data={anime} />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex lg:flex-col lg:ml-[2.5rem] lg:mx-0 mx-3">
          <div className="lg:mt-[5.12rem] mt-[5.69rem] flex">
            <div className="flex lg:flex-row flex-col lg:items-baseline">
              <h2 className="text-white font-semibold text-[1.25rem]">
                {staff.length > 0 ? "Director" : ""}
              </h2>
              <div className="flex items-center lg:ml-[5.41rem] ml-11 lg:mt-0 mt-5 gap-[2.44rem] flex-wrap">
                {staff.map((staff: any, index: number) => (
                  <ListDirector
                    key={index}
                    nameDirector={staff.person.name}
                    jobDirector={staff.positions[0]}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-[3.12rem] flex">
            <div className="flex lg:flex-row flex-col lg:items-baseline">
              <h2 className="text-white font-semibold text-[1.25rem]">
                {characters.length > 0 ? "Staring" : ""}
              </h2>
              <div
                className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  ml-11 lg:ml-[5.81rem] mt-5 gap-[2.44rem]`}
              >
                {characters.map((character: any, index: number) => (
                  // <ListStaring nameCast={character.character.name} jobCast={character.voice_actors.map((actor: any) => actor.person.name).join(", ")}/>
                  <>
                    {character.voice_actors.length > 0 && (
                      <ListStaring
                        key={index}
                        nameCast={character.character.name}
                        jobCast={character.voice_actors[0].person.name}
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-white  font-semibold text-[1rem] mt-[5.12rem]">
            Trailer And Clips
          </h2>
          <div className="mt-[1.69rem] pb-2 flex items-center overflow-x-auto overflow-video">
            <iframe
              className="rounded-lg w-[20rem] h-[10rem] m-1"
              src={anime.trailer.embed_url}
              allowFullScreen
              title={anime.title}
            ></iframe>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
