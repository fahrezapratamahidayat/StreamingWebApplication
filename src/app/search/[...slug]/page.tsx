"use client";
import CardPoster from "@/components/card/CardPosterMovies";
import NavbarSearch from "@/components/navbar/NavbarSearch";
import Sidebar from "@/components/sidebar/Sidebar";
import { MovieContext } from "@/context/DataMovies";
import { SearchMovie } from "@/services/SearchMovie";
import axios from "axios";
import { useEffect, useState, useContext } from "react";

type searchPageProps = {
  params: {
    slug: string;
  };
};
const getPopularMoviesList = {
  method: "GET",
  url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/movie/popular`,
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_TOKEN}`,
  },
};

export default function SearchPage(props: searchPageProps) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDataPopularMovies = async () => {
    const snapshot = await axios
      .request(getPopularMoviesList)
      .then(function (response) {
        setPopularMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getSearchMovieList = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/search/movie?query=${searchQuery}`,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_TOKEN}`,
    },
  };



  useEffect(() => {
    fetchDataPopularMovies();
  }, []);


  return (
    <>
      <NavbarSearch>
        <input
          id="default-search"
          
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
        />
      </NavbarSearch>
      <Sidebar />
      <div className="flex flex-col ml-[21rem] w-auto h-auto">
        <div className="mt-[5rem]">
          <CardPoster data={popularMovies} title={`Search`} />
        </div>
      </div>
    </>
  );
}
