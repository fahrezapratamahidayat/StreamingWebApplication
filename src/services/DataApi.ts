import axios, { AxiosRequestConfig } from "axios";

export const trendingAllDay = {
  method: "GET",
  url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/trending/all/day`,
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGY5NjJhOWZlNjRmYzFhMTllYWQyYzlkMDAyYmRhNSIsInN1YiI6IjY0ZmVjZGY4ZmZjOWRlMGVlMTc2MWU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUMhd53wIlwrwTXIs68rIT64CRLoXxXxZO5wQVDDaNw",
  },
};

export const ApiOptions = (parameter: string): AxiosRequestConfig => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/${parameter}`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGY5NjJhOWZlNjRmYzFhMTllYWQyYzlkMDAyYmRhNSIsInN1YiI6IjY0ZmVjZGY4ZmZjOWRlMGVlMTc2MWU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUMhd53wIlwrwTXIs68rIT64CRLoXxXxZO5wQVDDaNw',
    },
  };
  return options;
};

export const fetchData = async (parameter: string) => {
  try {
    const response = await axios.request(ApiOptions(parameter));
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};