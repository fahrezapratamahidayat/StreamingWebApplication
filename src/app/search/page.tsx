import MainLayouts from "@/components/layouts/MainLayouts";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import { fetchTrendingAll } from "../actions";
import CardPosterSearch from "@/components/card/CardPosterSearch";
import { CardSearchProps } from "@/types/CardProps";

export const metadata = {
  title: "Search",
  description: "Search",
};

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Search({ params, searchParams }: Props) {
  const { query } = searchParams;

  const datas = await fetchTrendingAll(
    `search/multi?query=${query}}&include_adult=false&language=en-US&page=1`
  );
  const filteredData = datas.filter(
    (item: any) =>
      item.media_type === "tv" ||
      (item.media_type === "movie" && item.poster_path !== null)
  );

  if (query === undefined) {
    return (
      <>
        <MainLayouts>
          <NavbarFixed />
          <div className="relative flex flex-col items-center w-full min-h-screen py-12 space-y-4 text-center md:py-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-14 h-14 m-auto text-gray-400"
              >
                <rect x="2" y="6" width="20" height="8" rx="1"></rect>
                <path d="M17 14v7"></path>
                <path d="M7 14v7"></path>
                <path d="M17 3v3"></path>
                <path d="M7 3v3"></path>
                <path d="M10 14 2.3 6.3"></path>
                <path d="m14 6 7.7 7.7"></path>
                <path d="m8 6 8 8"></path>
              </svg>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl text-white">
                Sorry !
              </h1>
              <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-400">
                search not found, please enter search correctly.
              </p>
            </div>
          </div>
        </MainLayouts>
      </>
    );
  }
  return (
    <>
      <MainLayouts>
        <NavbarFixed />
        <div className=" mt-[5rem] lg:mx-5 mx-2">
          <div className="flex flex-col">
            <h1 className="text-[20px] font-semibold text-white lg:ml-0 ml-1.5">
              Results for : {query}
            </h1>
            <div className="lg:flex flex-wrap grid md:flex grid-cols-3 lg:gap-5 md:gap-1 mt-[18px] mx-2 lg:mx-0 gap-2">
              {filteredData.map((item: CardSearchProps, index: number) => (
                <CardPosterSearch data={item} key={item.id} index={index} />
              ))}
            </div>
          </div>
        </div>
      </MainLayouts>
    </>
  );
}
