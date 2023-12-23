'use client'
import { useSession } from "next-auth/react";

export default function WatchListPage(){
    const { data: session, status }: { data: any; status: string } = useSession();
    console.log(session)
    return (
        <>
        <div className="flex flex-col pt-[4rem] lg:pt-0 lg:mr-5">
            <div className="text-white">test</div>
        </div>
        </>
    )
}