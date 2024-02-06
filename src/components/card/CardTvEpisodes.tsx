"use client";

import { Variants } from "framer-motion";
import { MotionDiv } from "../motion/FramerMotion";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  episode: any;
  index: number;
  linkUrlModal: any;
}
export default function CardTvEpisodes({ episode, index,linkUrlModal }: CardProps) {
  const [episodeSelected, setEpisodeSelected] = useState<number>();
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const router = useRouter()
  return (
    <>
      <MotionDiv
        key={episode.name}
        className="relative flex flex-col "
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          type: "tween",
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${episode.still_path}`}
          alt={episode.name}
          width={500}
          height={500}
          priority
          className="rounded-md"
          onClick={() => {
            router.push(linkUrlModal)
          }}
        />
        <div className="flex gap-2 mt-1">
          <p className="text-white text-base">{episode.episode_number}.</p>
          <p className="text-white text-base">{episode.name}</p>
          <p className="text-gray-400 text-base ml-auto">{episode.runtime}m</p>
        </div>
        <p className="text-gray-400 text-sm flex-shrink-0">
          {episode.overview}
        </p>
      </MotionDiv>
    </>
  );
}
