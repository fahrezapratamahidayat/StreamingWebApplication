"use client";
import CardPosterWatchList from "@/components/card/CardPosterWatchlist";
import MainLayouts from "@/components/layouts/MainLayouts";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function WatchListPage() {
  const [userWatchList, setUserWatchList] = useState([]);
  const { data: session, status }: { data: any; status: string } = useSession();
  const fetchData = async () => {
    try {
      if (!session) {
        return;
      }
      const snapshot = await fetch(
        `http://localhost:3000/api/user?id=${session.user.id}`
      );
      const data = await snapshot.json();
      setUserWatchList(data.watchlist);
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
      <MainLayouts>
        <div className="mt-[9rem] lg:mt-[5rem] mx-2 lg:mx-5">
          <h2 className="text-white font-semibold text-[20px] lg:pl-0 pl-2">Watchlist</h2>
          <div className="grid lg:grid-cols-11 grid-cols-3 lg:mx-0 mx-2 gap-2 lg:gap-[26px] mt-[18px]">
            {userWatchList && userWatchList.map((data: any, index: number) => (
              <CardPosterWatchList key={index} data={data} index={index} />
            ))}
          </div>
        </div>
      </MainLayouts>
    </>
  );
}
