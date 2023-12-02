"use client";
import { Context, createContext, useContext, useState } from "react";

// type MovieProviderProps = {
//   children: React.ReactNode;
// };
// type MovieContextType = {
//   movie: any;
//   setMovie: React.Dispatch<React.SetStateAction<any>>;
// };

// export const MovieContext = createContext<MovieContextType | null>(null);

// export default function MovieProvider({ children }: MovieProviderProps) {
//   const [movie, setMovie] = useState(null);
//   return (
//     <MovieContext.Provider value={{ movie, setMovie }}>
//       {children}
//     </MovieContext.Provider>
//   );
// }

// export function useMovieContext() {
//   const context = useContext(MovieContext);
//   if (!context) {
//     throw new Error("useMovieContext must be used within a MovieProvider");
//   }
//   return context;
// }
type MovieContextType = {
    dataMovies: any;
    setDataMovies: any;
}

export const MovieContext = createContext<MovieContextType | null>(null)

const MovieContextProvider = ({ children } : {children: React.ReactNode}) => {
    const [dataMovies, setDataMovies] = useState([])

    return (
        <MovieContext.Provider value={{ dataMovies, setDataMovies }}>
            {children}
        </MovieContext.Provider>
    )
}
export default MovieContextProvider