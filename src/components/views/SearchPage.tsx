"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/DataApi";
import CardPosterSearch from "@/components/card/CardPosterSearch";
import { CardSearchProps } from "@/types/CardProps";

export default function SearchPageView() {
  const [data, setData] = useState([]);
  const searchParamps: any = useSearchParams();
  const query = searchParamps.get("query");
  const fetchDataAsync = async () => {
    try {
      const data = await fetchData(
        `search/multi?query=${query}&include_adult=false&language=en-US&page=1`
      );
      const filteredData = data.results.filter(
        (item: any) =>
          item.media_type === "tv" ||
          (item.media_type === "movie" && item.poster_path !== null)
      );
      setData(filteredData);
    } catch (error) {}
  };


  useEffect(() => {
    fetchDataAsync();
  }, [query]);

  return (
    <div className=" mt-[5rem] mx-5">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Result for {query}</h1>
        <div className="lg:flex flex-wrap grid md:flex grid-cols-3 lg:gap-5 md:gap-1 mt-[18px] min-[400px]:flex max-[767px]:flex min-[400px]:gap-1 max-[767px]:gap-1 min-[400px]:ml-4 lg:ml-0">
            {data.map((item: CardSearchProps,index: number) => (
              <CardPosterSearch data={item} key={item.id} index={index}/>
            ))}
        </div>
      </div>
    </div>
  );
}
