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
        `http://localhost:3000/api/user?id=${session.user.id}`,
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
          {userWatchList && (
            <CardPosterWatchList title="Watchlist" data={userWatchList} />
          )}
        </div>
      </MainLayouts>
    </>
  );
}
