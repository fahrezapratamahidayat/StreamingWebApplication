"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SelectOption({
  seasons,
  to,
  valueParams,
}: {
  seasons: string;
  to: string;
  valueParams: string;
}) {
  const router = useRouter();
  function handleClick(event: any) {
    router.push(to);
  }
  return (
    <>
      <li
        role="option"
        aria-selected
        onClick={handleClick}
        className={`hover:bg-[#3F3F46] cursor-pointer text-white text-sm p-2 rounded-lg flex items-center justify-between`}
      >
        Season {seasons}
      </li>
    </>
  );
}
