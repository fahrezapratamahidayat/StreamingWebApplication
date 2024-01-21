"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import { movieSidebaritem } from "@/utils/data";
import LoadMore from "@/components/button/LoadMore";
import CardLayouts from "@/components/layouts/CardLayout";
import PagesLayouts from "@/components/layouts/PagesLayouts";
import { fetchTvShow, } from "@/app/action";
import { useEffect, useState } from "react";

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
      <Sidebar items={movieSidebaritem} />
      {data && (
        <PagesLayouts>
          <CardLayouts
            title={title}
            options={valueSelect}
            selectedOption={endpoint}
            onSelectChange={handleSelectChange}
          >
            {data}
          </CardLayouts>
          <LoadMore fetchData={fetchTvShow} endpoint={endpoint} />
        </PagesLayouts>
      )}
    </>
  );
}
