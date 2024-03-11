"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { InfiniteMovingCards } from "./infinite-moving-cards";

interface parallaxProps {
  movies: {
    id: number;
    title: string;
    link: string;
    backdrop_path: string;
    media_type: string;
    name: string;
  }[];
  tv: {
    id: number;
    title: string;
    link: string;
    backdrop_path: string;
    media_type: string;
    name: string;
  }[];
}

export const HeroParallax = ({ movies, tv }: parallaxProps) => {
  const ref = React.useRef(null);
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

  return (
    <div
      ref={ref}
      className="h-[250vh] py-40 overflow-hidden w-full antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="w-full py-60 lg:py-0 sm:py-60 md:py-60"
      >
        <InfiniteMovingCards
          items={movies}
          direction="left"
          speed="normal"
          linkFormat="movies"
        />
        <InfiniteMovingCards
          items={tv}
          direction="right"
          speed="normal"
          linkFormat="tv"
        />
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 -top-20">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">Santai</h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200 text-justify">
        Selamat Datang Di Santai disini kami menyediakan berbagai Film dan Tv
        Series Yang berkualitas dan seru-seru pokonya!. Santai ini dibuat oleh
        seorang develover yang awalnya cuma iseng belajar tentang dunia web
        develover dan belajar Api. karena dari ke isenganya tersebut develover
        dapat membuat website ini.
      </p>
    </div>
  );
};
