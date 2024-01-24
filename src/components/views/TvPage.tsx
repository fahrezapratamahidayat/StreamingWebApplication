"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import {tvShowsSidebarItem } from "@/utils/data";
import LoadMore from "@/components/button/LoadMore";
import CardLayouts from "@/components/layouts/CardLayout";
import { fetchTvShow, } from "@/app/actions";
import { useEffect, useState } from "react";
import PagesLayout from "../layouts/PageLayout";
import PageLayout from "../layouts/PageLayout";

export default function TvPageView() {
  const [data, setData] = useState();
  const [valueSelect] = useState([
    { value: "on_the_air", label: "On The Air" },
    { value: "airing_today", label: "Airing Today" },
    { value: "popular", label: "Popular" },
    { value: "top_rated", label: "Top Rated" },
  ]);
  const [endpoint, setEndpoint] = useState("popular");
  const [title, setTitle] = useState("Popular");

  const handleSelectChange = (selectedValue: any) => {
    switch (selectedValue) {
      case "on_the_air":
        setEndpoint("on_the_air");
        setTitle("On The Air");
        break;
      case "airing_today":
        setEndpoint("airing_today");
        setTitle("Airing Today");
        break;
      case "popular":
        setEndpoint("popular");
        setTitle("Popular");
        break;
      case "top_rated":
        setEndpoint("top_rated");
        setTitle("Top Rated");
        break;
      default:
        setEndpoint("popular"); 
        setTitle("Popular");
    }
  };

  const Datas = async () => {
    const res = await fetchTvShow(1, endpoint);
    setData(res);
  };

  useEffect(() => {
    Datas();
  }, [endpoint]);

  return (
    <>
      <Sidebar items={tvShowsSidebarItem} />
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
          <LoadMore fetchData={fetchTvShow} endpoint={endpoint} />
        </PageLayout>
      )}
    </>
  );
}
