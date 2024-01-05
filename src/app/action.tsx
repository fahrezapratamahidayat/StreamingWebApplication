"use server";

import CardPosterMovies from "@/components/card/CardPosterMovies";
import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import { fetchData } from "@/services/DataApi";
import { MovieProps, TvShowProps } from "@/types/CardProps";
  // const handleShowMore = async () => {
  //   const res = await fetchMovies(page);
  //   setMovies([...movies, ...res]);
  //   page++;
  // }


export const fetchMovies = async (page: number,endpoint: string) => {
    const res = await fetchData(`movie/${endpoint}?page=${page}&limit=10`);
    return res.results.map((item : MovieProps,index: number) => (
        <CardPosterMovies
            key={item.id}
            movie={item}
            index={index}
        />
    ))
}

export const fetchTvShow = async (page: number,endpoint: string) => {
    const res = await fetchData(`tv/${endpoint}?page=${page}&limit=10`);
    return res.results.map((item : TvShowProps,index: number) => (
        <CardPosterTvShows
            key={item.id}
            tv={item}
            index={index}
        />
    ))
}

export const fetchGenreTv = async (page?: number, params?: string) => {
    const res = await fetchData(`discover/tv?page=${page}&with_genres=${params}`);
    return res.results.map((item : TvShowProps,index: number) => (
        <CardPosterTvShows
            key={item.id}
            tv={item}
            index={index}
        />
    ))
}

export const fetchGenreMovies = async (page?: number, params?: string) => {
    const res = await fetchData(`discover/movie?page=${page}&with_genres=${params}`);
    return res.results.map((item : MovieProps,index: number) => (
        <CardPosterMovies
            key={item.id}
            movie={item}
            index={index}
        />
    ))
}

export const tes = async (page: number,endpoint: string) => {
    const res = await fetchData(`movie/${endpoint}?page=${page}&limit=10`);
    return res.results
}