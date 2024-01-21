"use server";

import CardPosterMovies from "@/components/card/CardPosterMovies";
import CardPosterSearch from "@/components/card/CardPosterSearch";
import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import { fetchData } from "@/services/DataApi";
import { CardSearchProps, MovieProps, TvShowProps } from "@/types/CardProps";

export const fetchMovies = async (page: number, endpoint: string) => {
  const res = await fetchData(`movie/${endpoint}?page=${page}&limit=10`);
  return res.results.map((item: MovieProps, index: number) => (
    <CardPosterMovies key={item.id} movie={item} index={index} />
  ));
};

export const fetchTvShow = async (page: number, endpoint: string) => {
  const res = await fetchData(`tv/${endpoint}?page=${page}&limit=10`);
  return res.results.map((item: TvShowProps, index: number) => (
    <CardPosterTvShows key={item.id} tv={item} index={index} />
  ));
};

export const fetchGenreTv = async (page?: number, params?: string) => {
  const res = await fetchData(`discover/tv?page=${page}&with_genres=${params}`);
  return res.results.map((item: TvShowProps, index: number) => (
    <CardPosterTvShows key={item.id} tv={item} index={index} />
  ));
};

export const fetchGenreMovies = async (page?: number, params?: string) => {
  const res = await fetchData(
    `discover/movie?page=${page}&with_genres=${params}`
  );
  return res.results.map((item: MovieProps, index: number) => (
    <CardPosterMovies key={item.id} movie={item} index={index} />
  ));
};

export const fetchSearch = async (page?: number, params?: string) => {
  const res = await fetchData(`search/multi?page=${page}&query=${params}`);
  return res.results.map((item: CardSearchProps, index: number) => (
    <CardPosterSearch key={item.id} data={item} index={index} />
  ))
};
