'use client'
import { useParams,useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/DataApi";
import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import CardPosterSearch from "@/components/card/CardPosterSearch";

export default function Search() {
    const [data, setData] = useState([]);
    const searchParamps : any = useSearchParams();
    const query = searchParamps.get("query");
    const fetchDataAsync = async () => {
        try {
          const data = await fetchData(`search/multi?query=${query}&include_adult=false&language=en-US&page=1`);
          const filteredData = data.results.filter((item: any) => item.media_type === "tv" || item.media_type === "movie" && item.poster_path !== null);
          setData(filteredData);
        } catch (error) {}
      };

    useEffect(() => {
        fetchDataAsync();
    }, [query]);
    return (
        <div className="text-white items-center justify-center flex  mt-[5rem] mx-5">
            {data && (
                <CardPosterSearch title={`Search Result for ${query}`} data={data} />
            )}
        </div>
    );
}