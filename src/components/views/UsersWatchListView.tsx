// UsersWatchListView.tsx
"use client";
import React, { useState, useEffect } from "react";
import MainLayouts from "@/components/layouts/MainLayouts";
import { useSession } from "next-auth/react";

export default function UsersWatchListView({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userSession, setUserSession] = useState<any | null>(null);
  const { data: session, status }: { data: any; status: string } = useSession();

  useEffect(() => {
    setUserSession(session);
  }, [session]);

  return (
    <MainLayouts>
      {status === "authenticated" ? (
        <>
          {/* Pass the user session to children */}
          {React.cloneElement(children as React.ReactElement, { session: userSession })}
        </>
      ) : (
        <>
          <h1 className="text-white font-bold text-3xl">
            Please login to see your watchlist
          </h1>
        </>
      )}
    </MainLayouts>
  );
}
