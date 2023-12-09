"use client";
import Modal from "@/components/Modal";
import { fetchData } from "@/services/DataApi";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SeasonData = {
  episodes: {
    air_date: string;
    episode_number: number;
    id: number;
    episode_type: string;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: {
      id: number;
      name: string;
      job: string;
    }[];
    guest_stars: {
      id: number;
      name: string;
      character: string;
      order: number;
    }[];
  }[];
};

type TvShowSubset = {
  name: string;
  number_of_seasons: number;
  seasons: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_count: number;
    poster_path: string;
    season_number: number;
  }[];
};

export default function TvWatchPageView({ slug }: { slug: string }) {
  const [seasonData, setSeasonData] = useState<SeasonData>({ episodes: [] });
  const [tvData, setTvData] = useState<TvShowSubset | null>(null);
  const selected = useSearchParams()?.get("season") || "1";
  const [selectedSeason, setSelectedSeason] = useState(selected);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const fetchDataSeason = async () => {
    try {
      const data = await fetchData(`tv/${slug}/season/${selectedSeason}`);
      setSeasonData(data);
    } catch (error) {
      console.error("Error fetching season data:", error);
    }
  };

  const fetchDataAsync = async () => {
    try {
      const tvShowData = await fetchData(`tv/${slug}`);
      const filteredData: TvShowSubset = {
        name: tvShowData.name,
        number_of_seasons: tvShowData.number_of_seasons,
        seasons: tvShowData.seasons,
      };
      setTvData(filteredData);
    } catch (error) {
      console.error("Error fetching TV show data:", error);
    }
  };

  const renderOptions = () => {
    if (tvData?.number_of_seasons) {
      const options = [];
      for (let i = 1; i <= tvData.number_of_seasons; i++) {
        options.push(
          <option key={i} value={i}>
            Season {i}
          </option>
        );
      }
      return options;
    } else {
      return (
        <option value="1" selected disabled>
          No seasons available
        </option>
      );
    }
  };

  const SelectSeason = (event: any) => {
    setSelectedSeason(event.target.value);
    router.push(
      `/tv/${slug}/watch?=${tvData?.name.replace(/\s+/g, "+")}/season/${
        event.target.value
      }`
    );
  };



  useEffect(() => {
    fetchDataSeason();
    fetchDataAsync();
  }, [slug, selectedSeason]);

  const openModal = () => {
    // Add the CSS class to the body when the modal is open
    document.body.classList.add("modal-open");
    setShowModal(true);
  };

  const closeModal = () => {
    // Remove the CSS class when the modal is closed
    document.body.classList.remove("modal-open");
    setShowModal(false);
  };

  return (
    <>
      <div className="mx-5 mt-[5rem] ">
        <div className="flex justify-between my-5">
          <h1 className="text-white text-4xl font-bold">
            {tvData?.name} - Season {selectedSeason}
          </h1>
          {tvData?.number_of_seasons && (
            <select onChange={SelectSeason} defaultValue={selectedSeason}>
              {renderOptions()}
            </select>
          )}
        </div>
        <div className="grid lg:grid-cols-4 lg:grid-rows-4 grid-cols-1 grid-rows-1 gap-5 ">
          {seasonData.episodes.map((episode, index) => (
            <div key={episode.name} className="relative flex flex-col">
              <Image
                src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${episode.still_path}`}
                alt={episode.name}
                width={500}
                height={500}
                priority
                className="rounded-md"
                onClick={() => setShowModal(true)}
              />
              <div className="flex gap-2 mt-1">
                <p className="text-white text-base">
                  {episode.episode_number}.
                </p>
                <p className="text-white text-base">{episode.name}</p>
              </div>
              <p className="text-gray-400 text-sm flex-shrink-0">
                {episode.overview}
              </p>
              {showModal && (
                <Modal
                  slug={slug}
                  title={tvData?.name}
                  season={selectedSeason}
                  episodes={episode.episode_number}
                  onClose={closeModal}
                >
                  <iframe
                    src={`https://www.2embed.cc/embedtv/${slug}&s=${selectedSeason}&e=${episode.episode_number}`}
                    allowFullScreen
                    width="100%"
                    height="100%"
                    frameBorder="0"
                  ></iframe>
                </Modal>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
