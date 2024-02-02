"use client";
import CardPosterWatchList from "@/components/card/CardPosterWatchlist";
import MainLayouts from "@/components/layouts/MainLayouts";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function WatchListPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const { data: session, status }: { data: any; status: string } = useSession();
  const fetchData = async () => {
    try {
      if (!session) {
        return;
      }
      const respone = await fetch(`/api/user?id=${session.user.id}`, {
        method: "GET",
      });
      const result = await respone.json();
      setBookmarks(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);
  return (
    <>
      <NavbarFixed />
      <MainLayouts>
        <div className="mt-[9rem] lg:mt-[5rem] mx-2 lg:mx-5">
          <h2 className="text-white font-semibold text-[20px] lg:pl-0 pl-2">
            Watchlist
          </h2>
          <div className="grid lg:grid-cols-11 grid-cols-3 lg:mx-0 mx-2 gap-2 lg:gap-[26px] mt-[18px]">
            {bookmarks &&
              bookmarks.map((data: any, index: number) => (
                <CardPosterWatchList key={index} data={data} index={index} />
              ))}
          </div>
        </div>
      </MainLayouts>
    </>
  );
}
