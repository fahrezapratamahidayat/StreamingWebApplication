"use client";
import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import PageLayouts from "@/layouts/PageLayouts";
import { FetchingData, fetchData } from "@/services/DataApi";
import { useEffect, useState } from "react";

export default function TvShowsView() {
  const [data, setData] = useState([]);

  const fetchDataAsync = async () => {
    const res = await fetchData("trending/tv/day");
    setData(res.results);
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);
  
  return (
    <>
      <PageLayouts>
        <CardPosterTvShows title="Trending Today" data={data}/>
      </PageLayouts>
    </>
  );
}
