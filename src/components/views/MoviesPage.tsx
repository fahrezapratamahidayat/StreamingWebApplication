"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { movieSidebaritem } from "@/utils/data";
import LoadMore from "@/components/button/LoadMore";
import CardLayouts from "@/components/layouts/CardLayout";
import { fetchMovies } from "@/app/action";
import { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import Link from "next/link";

export default function MoviesPageView() {
  const [data, setData] = useState();
  const [valueSelect] = useState([
    { value: "Now_Playing", label: "Now Playing" },
    { value: "popular", label: "Popular" },
    { value: "top_rated", label: "Top Rated" },
    { value: "upcoming", label: "Upcoming" },
  ]);
  const [endpoint, setEndpoint] = useState("now_playing");
  const [title, setTitle] = useState("Now Playing");

  const handleSelectChange = (selectedValue: any) => {
    switch (selectedValue) {
      case "Now_Playing":
        setEndpoint("now_playing");
        setTitle("Now Playing");
        break;
      case "popular":
        setEndpoint("popular");
        setTitle("Popular");
        break;
      case "top_rated":
        setEndpoint("top_rated");
        setTitle("Top Rated");
        break;
      case "upcoming":
        setEndpoint("upcoming");
        setTitle("Upcoming");
        break;
      default:
        setEndpoint("now_playing"); // Default to "Now Playing" if none of the cases match
        setTitle("Now Playing");
        break;
    }
  };

  const Datas = async () => {
    const res = await fetchMovies(1, endpoint);
    setData(res);
  };

  useEffect(() => {
    Datas();
  }, [endpoint]);

  return (
    <>
      <Sidebar items={movieSidebaritem} />
      {data && (
        <PageLayout>
          <CardLayouts
            title={title}
            options={valueSelect}
            selectedOption={endpoint}
            onSelectChange={handleSelectChange}
          >
            {data}
          </CardLayouts>
          <LoadMore fetchData={fetchMovies} endpoint={endpoint} />
        </PageLayout>
      )}
    </>
  );
}
