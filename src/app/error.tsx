"use client";

import Link from "next/link";

export default function Error() {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full flex-col">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          500
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        Something bad just happened
        </div>
        <Link href="/">
          <button className="mt-5 text-white">Go Home</button>
        </Link>
      </div>
    </>
  );
}
