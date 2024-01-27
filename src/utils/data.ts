export const movieSidebaritem = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const tvShowsSidebarItem = [
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const tvTitleGenre = (params: any) => {
  let title;
  if (params === "10759") {
    title = "Action";
  } else if (params === "16") {
    title = "Animation";
  } else if (params === "16") {
    title = "Animation";
  } else if (params === "35") {
    title = "Comedy";
  } else if (params === "80") {
    title = "Crime";
  } else if (params === "99") {
    title = "Documentary";
  } else if (params === "18") {
    title = "Drama";
  } else if (params === "10751") {
    title = "Family";
  } else if (params === "14") {
    title = "Fantasy";
  } else if (params === "36") {
    title = "History";
  } else if (params === "27") {
    title = "Horror";
  } else if (params === "10402") {
    title = "Music";
  } else if (params === "9648") {
    title = "Mystery";
  } else if (params === "1079") {
    title = "Romance";
  } else if (params === "878") {
    title = "Science Fiction";
  } else if (params === "53") {
    title = "Thriller";
  } else if (params === "10752") {
    title = "War";
  } else if (params === "37") {
    title = "Western";
  } else if (params === "12") {
    title = "Adventure";
  } else title = "";
  return title;
};

export const movieTitleGenre = (params: any) => {
  let title;
  if (params === "28") {
    title = "Action";
  } else if (params === "16") {
    title = "Animation";
  } else if (params === "16") {
    title = "Animation";
  } else if (params === "35") {
    title = "Comedy";
  } else if (params === "80") {
    title = "Crime";
  } else if (params === "99") {
    title = "Documentary";
  } else if (params === "18") {
    title = "Drama";
  } else if (params === "10751") {
    title = "Family";
  } else if (params === "14") {
    title = "Fantasy";
  } else if (params === "36") {
    title = "History";
  } else if (params === "27") {
    title = "Horror";
  } else if (params === "10402") {
    title = "Music";
  } else if (params === "9648") {
    title = "Mystery";
  } else if (params === "1079") {
    title = "Romance";
  } else if (params === "878") {
    title = "Science Fiction";
  } else if (params === "53") {
    title = "Thriller";
  } else if (params === "10752") {
    title = "War";
  } else if (params === "37") {
    title = "Western";
  } else if (params === "12") {
    title = "Adventure";
  } else title = "";

  return title;
}

export const MovieEndpoints = async (params: any) => {
  let endpoints;
  let title;

  if (params === "now-playing") {
    endpoints = "now_playing";
    title = "Now Playing";
  } else if (params === "popular") {
    endpoints = "popular";
    title = "Popular";
  } else if (params === "top-rated") {
    endpoints = "top_rated";
    title = "Top Rated";
  } else if (params === "upcoming") {
    endpoints = "upcoming";
    title = "Upcoming";
  } else {
    console.warn("Unexpected value for params:", params);
    endpoints = "now_playing";
    title = "Now Playing";
  }

  return { endpoints, title };
};

export const TvshowEndpoints = async (params: any) => {
  let endpoints;
  let title;
  if(params === "airing-today"){
    endpoints = "airing_today";
    title = "Airing Today";
  }else if(params === "on-the-air"){
    endpoints = "on_the_air";
    title = "On The Air";
  }else if(params === "popular"){
    endpoints = "popular";
    title = "Popular";
  }else if(params === "top-rated"){
    endpoints = "top_rated";
    title = "Top Rated";
  }else{
    endpoints = "airing_today";
    title = "Airing Today";
  }
  return { endpoints, title };
}