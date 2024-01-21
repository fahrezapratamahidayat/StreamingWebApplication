"use client";

import { useSearchParams } from "next/navigation";
import MainLayouts from "../layouts/MainLayouts";
import { useEffect, useState } from "react";
import { fetchSearch } from "@/app/action";

export default function SearchPageviews() {
  const searchParamps: any = useSearchParams();
  const [data, setData] = useState([]);
  const query = searchParamps.get("query");
  const snapshot = async () => {
    const res = await fetchSearch(1, query);
    console.log(res);
  };

  useEffect(() => {
    snapshot();
  }, [query]);
  return (
    <>
    </>
  );
}
