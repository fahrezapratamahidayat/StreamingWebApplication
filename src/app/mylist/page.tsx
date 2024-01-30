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
        alert("Please sign in to continue");
      }
      const snapshot = await fetch(
        `http://localhost:3000/api/user?id=${session.user.id}`
      );
      const data = await snapshot.json();
      setUserWatchList(data.user.watchlist);
      console.log(data.user.watchlist);
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
        <div className="mt-[5rem] mx-5">
          {userWatchList && userWatchList.length > 0 ? (
            <CardPosterWatchList title="Watchlist" data={userWatchList} />
          ) : (
            <h1 className="text-white text-3xl font-bold">No data</h1>
          )}
        </div>
      </MainLayouts>
    </>
  );
}
