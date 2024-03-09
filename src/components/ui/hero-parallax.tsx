"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { CardAnimeProps } from "@/types/CardProps";

interface parallaxProps {
  movies: {
    id: number;
    title: string;
    link: string;
    backdrop_path: string;
    media_type: string;
    original_name: string;
  }[];
  tv: {
    id: number;
    title: string;
    link: string;
    backdrop_path: string;
    media_type: string;
    original_name: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const HeroParallax = ({
  movies,
  tv,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: parallaxProps) => {
  const firstRow = movies;
  const secondRow = tv;

  const ref = React.useRef(null);
  const containerRefMovie = React.useRef<HTMLDivElement>(null);
  const containerRefTv = React.useRef<HTMLDivElement>(null);
  const scrollerRefMovie = React.useRef<HTMLUListElement>(null);
  const scrollerRefTv = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (
      containerRefMovie.current &&
      scrollerRefMovie.current &&
      containerRefTv.current &&
      scrollerRefTv.current
    ) {
      const scrollerContent = Array.from(scrollerRefMovie.current.children);
      const scrollerContentTv = Array.from(scrollerRefTv.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRefMovie.current) {
          scrollerRefMovie.current.appendChild(duplicatedItem);
        }
      });

      scrollerContentTv.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRefTv.current) {
          scrollerRefTv.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRefMovie.current && containerRefTv.current) {
      if (direction === "left") {
        containerRefMovie.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
        containerRefTv.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRefMovie.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
        containerRefTv.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRefMovie.current && containerRefTv.current) {
      if (speed === "fast") {
        containerRefMovie.current.style.setProperty(
          "--animation-duration",
          "20s"
        );
        containerRefTv.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRefMovie.current.style.setProperty(
          "--animation-duration",
          "40s"
        );
        containerRefTv.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRefMovie.current.style.setProperty(
          "--animation-duration",
          "80s"
        );
        containerRefTv.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden w-full antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div
          ref={containerRefMovie}
          className={cn(
            "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
            className
          )}
        >
          <ul
            ref={scrollerRefMovie}
            className={cn(
              " flex flex-row-reverse space-x-reverse space-x-20 mb-20",
              start && "animate-scroll ",
              pauseOnHover && "hover:[animation-play-state:paused]"
            )}
          >
            {firstRow.map((product) => (
              <ProductCard
                datas={product}
                translate={translateX}
                key={product.id}
                link={`/movie/${product.id}`}
              />
            ))}
          </ul>
        </motion.div>
        <motion.div
          ref={containerRefTv}
          className={cn(
            "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
            className
          )}
        >
          <ul
            ref={scrollerRefTv}
            className={cn(
              "flex flex-row mb-20 space-x-20 ",
              start && "animate-scroll ",
              pauseOnHover && "hover:[animation-play-state:paused]"
            )}
          >
            {secondRow.map((product) => (
              <ProductCard
                datas={product}
                translate={translateXReverse}
                key={product.id}
                link={`/tv/${product.id}`}
              />
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 -top-20">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        Santai Wir
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ipsam?
        Nam veritatis, eligendi deserunt repellendus dolor a. Distinctio, est.
        Aliquam molestias architecto eligendi vero rem, dignissimos possimus.
        Doloremque, eos quae!
      </p>
    </div>
  );
};

export const ProductCard = ({
  datas,
  translate,
  link,
}: {
  datas: {
    id: number;
    title: string;
    media_type: string;
    backdrop_path: string;
    original_name: string;
  };
  translate: MotionValue<number>;
  link: string;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={datas.original_name || datas.title}
      className="group/product h-72 w-[30rem] relative flex-shrink-0 rounded-lg"
    >
      <Link href={link} className="block group-hover/product:shadow-2xl ">
        <Image
          src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${datas.backdrop_path}`}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
          alt={datas.original_name || datas.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {datas.original_name || datas.title}
      </h2>
    </motion.div>
  );
};
