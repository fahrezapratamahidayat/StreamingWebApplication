"use client";
import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import PageLayouts from "@/layouts/PageLayouts";
import { fetchData } from "@/services/DataApi";
import { useEffect, useState } from "react";

export default function TvShowsView() {
  const [data, setData] = useState([]);

  const fetchDataAsync = async () => {
    try {
      const data = await fetchData("/trending/tv/day");
      setData(data.results);
    } catch (error) {}
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
