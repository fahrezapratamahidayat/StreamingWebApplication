"use client";
import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  linkFormat,
  translate,
}: {
  items: {
    id: number;
    title: string;
    media_type: string;
    backdrop_path: string;
    name: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  linkFormat: "movies" | "tv";
  translate?: MotionValue<number>;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-auto flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <motion.div
          style={{
            x: translate
          }}
            whileHover={{
              y: -20,
            }}
            key={item.name || item.title}
            className="group/product lg:h-60 h-52 w-[28rem] lg:w-[30rem] relative flex-shrink-0 rounded-lg"
          >
            <Link href={`${linkFormat}/${item.id}`} className="block group-hover/product:shadow-2xl ">
              <Image
                src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${item.backdrop_path}`}
                height="400"
                width="400"
                className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
                alt={item.name || item.title}
              />
            </Link>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
              {item.name || item.title}
            </h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
