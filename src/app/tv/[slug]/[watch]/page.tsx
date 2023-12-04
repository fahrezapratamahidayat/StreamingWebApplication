"use client"
import Sidebar from "@/components/sidebar/Sidebar";
import { tvShowsSidebarItem } from "@/utils/ItemSidebar";
import { fetchData } from "@/services/DataApi";
import Image from "next/image";
import { useEffect, useState } from "react";

type dataPageProps = {
  params: {
    watch: string;
    slug: string;
  };
};

type SeasonData = {
  _id: string;
  air_data: string;
  name: string;
  id: number;
  overview: string;
  season_number: number;
  vote_average: number;
  poster_path: string;
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
  const [data, setData] = useState<SeasonData>([] as any);
  const fetchDataVideo = async () => {
    const snapshot = await fetchData(`tv/${params.slug}/season/1`);
    setData(snapshot);
  }

  useEffect(() => {
    fetchDataVideo()
  },[])


  return (
    <>
      <Sidebar items={tvShowsSidebarItem} />
      <div className="ml-[21rem] mt-[5rem]">

      </div>
    </>
  );
}
