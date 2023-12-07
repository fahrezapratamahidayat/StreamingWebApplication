"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { tvShowsSidebarItem } from "@/utils/ItemSidebar";
import { fetchData } from "@/services/DataApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type dataPageProps = {
  params: {
    watch: string;
    slug: string;
  };
};

type SeasonData = {
  episodes: {
    air_date: string;
    episode_number: number;
    id: number;
    episode_type: string;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: {
      id: number;
      name: string;
      job: string;
    }[];
    guest_stars: {
      id: number;
      name: string;
      character: string;
      order: number;
    }[];
  }[];
};

export default function WatchTvPage(props: dataPageProps) {
  const { params } = props;
  const searchParamps : any = useSearchParams();
  const [seasonData, setSeasonData] = useState<SeasonData>({ episodes: [] });

  const fetchDataSeason = async () => {
    try {
      const data = await fetchData(`tv/${params.slug}/season/1`);
      setSeasonData(data);
    } catch (error) {
      console.error('Error fetching season data:', error);
    }
  };

  useEffect(() => {
    fetchDataSeason();
  }, [params.slug]);

  return (
    <>
      <div className="mx-5 mt-[5rem]">
        <div className="grid grid-cols-4 grid-rows-4 gap-5">
          {seasonData.episodes.map((episode, index) => (
            <div key={episode.id} className="flex flex-col">
              <Image
                src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${episode.still_path}`}
                alt={episode.name}
                width={500}
                height={500}
                className="rounded-md"
              />
              <div className="flex gap-2 mt-1">
                <p className="text-white text-base">{episode.episode_number}.</p>
                <p className="text-white text-base">{episode.name}</p>
              </div>
              <p className="text-gray-400 text-sm flex-shrink-0">{episode.overview}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
