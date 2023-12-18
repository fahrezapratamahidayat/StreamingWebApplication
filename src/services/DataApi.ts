import axios, { AxiosRequestConfig } from "axios";

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

const optionFetching = (parameter: string) => {
  const res = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/${parameter}`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGY5NjJhOWZlNjRmYzFhMTllYWQyYzlkMDAyYmRhNSIsInN1YiI6IjY0ZmVjZGY4ZmZjOWRlMGVlMTc2MWU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUMhd53wIlwrwTXIs68rIT64CRLoXxXxZO5wQVDDaNw',
    },
  };
  return res;
}

export const FetchingData = async (parameter: string) => {
  const requestOptions = optionFetching(parameter);

  try {
    const res = await fetch(requestOptions.url, {
      method: requestOptions.method,
      headers: requestOptions.headers
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}