"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import CardPoster from "@/components/card/CardPosterMovies";
import Link from "next/link";
import Sidebar from "@/components/sidebar/Sidebar";
import Homeviews from "@/pages/MoviesViewPage";
import DetailViews from "@/pages/MovieDetailsView";
import NavbarFixed from "@/components/navbar/NavbarFixed";
import ListDirector from "@/components/fragments/ListDirector";
import List from "@/components/fragments/ListDirector";
import ListStaring from "@/components/fragments/ListStaring";
import CardVideo from "@/components/card/cardVideo";
import { movieSidebaritem } from "@/utils/ItemSidebar";

type DetailMoviePageProps = {
  params: {
    slug: string;
  };
};

type MovieData = {
  backdrop_path: string;
  id: number;
  poster_path: string;
  title: string;
  runtime: number;
  vote_average: number;
  release_date: string;
  overview: string;
  genres: { id: number; name: string }[];
  directors: { id: number; name: string }[];
  cast: { id: number; name: string; job: string; character: string }[];
  crew: { id: number; name: string; job: string }[];
  job: string;
  video: string;
  results: { id: string; name: string; key: string }[];
};

export default function DetailMovie(props: DetailMoviePageProps) {
  const { params } = props;
  const [data, setData] = useState<MovieData | null>(null);
  const [video, setVideo] = useState<MovieData | null>(null);
  const [credits, setCredits] = useState<MovieData | null>(null);

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${params.slug}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGY5NjJhOWZlNjRmYzFhMTllYWQyYzlkMDAyYmRhNSIsInN1YiI6IjY0ZmVjZGY4ZmZjOWRlMGVlMTc2MWU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUMhd53wIlwrwTXIs68rIT64CRLoXxXxZO5wQVDDaNw",
    },
  };

  const fetchData = async () => {
    const snapshot = await axios
      .request(options)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const optionsVideo = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${params.slug}/videos`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGY5NjJhOWZlNjRmYzFhMTllYWQyYzlkMDAyYmRhNSIsInN1YiI6IjY0ZmVjZGY4ZmZjOWRlMGVlMTc2MWU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUMhd53wIlwrwTXIs68rIT64CRLoXxXxZO5wQVDDaNw",
    },
  };

  const fetchVideo = async () => {
    const snapshot = await axios
      .request(optionsVideo)
      .then(function (response) {
        setVideo(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const optionsCredits = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${params.slug}/credits`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGY5NjJhOWZlNjRmYzFhMTllYWQyYzlkMDAyYmRhNSIsInN1YiI6IjY0ZmVjZGY4ZmZjOWRlMGVlMTc2MWU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUMhd53wIlwrwTXIs68rIT64CRLoXxXxZO5wQVDDaNw",
    },
  };

  const fetchCredits = async () => {
    const snapshot = await axios
      .request(optionsCredits)
      .then(function (response) {
        setCredits(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCredits();
    fetchVideo();
    fetchData();
  }, []);

  const castList = credits?.cast
    .slice(0, 12)
    .map((castMember, index) => (
      <ListStaring
        key={index}
        nameCast={castMember.name}
        jobCast={castMember.character}
      />
    ));

  const videoList = video?.results.map((video) => (
    <CardVideo key={video.id} keyVideo={video.key} title={video.name} />
  ));

  const crewList = credits?.crew
    .filter(
      (actor) =>
        actor.job === "Novel" ||
        actor.job === "Director" ||
        actor.job === "Writer"
    )
    .map((actor, index) => (
      <ListDirector
        key={index}
        nameDirector={actor.name}
        jobDirector={actor.job}
      />
    ));

  return (
    <>
      <Sidebar items={movieSidebaritem}/>
      {data && data.backdrop_path && data.poster_path ? (
        <DetailViews
          backdrop_path={data.backdrop_path}
          poster_path={data.poster_path}
          title={data.title}
          runtime={data.runtime}
          vote_average={data.vote_average.toFixed(1)}
          release_date={data.release_date.substr(0, 4)}
          overview={data.overview}
          genres={data.genres.map((genre) => genre.name).join(", ")}
          credits={castList}
          video={videoList}
          crew={crewList}
          id={data.id}
        />
      ) : (
        <div className="">Objek kosong atau terjadi kesalahan</div>
      )}
    </>
  );
}
