import { Favorite } from "@mui/icons-material";
import OutlinedButton from "./OutlinedButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import posterFallback from "../assets/img/backdrop-fallback.jpg";

interface MovieProps {
  posterPath: string;
  title: string;
  releaseDate: string;
  id: string;
}

export const MovieItem = ({
  posterPath,
  title,
  releaseDate,
  id,
}: MovieProps) => {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const storedMovie = localStorage.getItem(`movieId-${id}`);
    if (storedMovie) {
      setFavorited(true);
    }
  }, [id]);

  const addToFavorite = () => {
    localStorage.setItem(`movieId-${id}`, id);
    setFavorited(true);
  };

  const removeFavorite = () => {
    localStorage.removeItem(`movieId-${id}`);
    setFavorited(false);
  };

  return (
    <>
      <div className="max-w-[238px] w-full h-full opacity-50 hover:opacity-100  hover:scale-105 hover:transition-normal">
        {posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt={title}
            className="rounded-tl-xl rounded-tr-xl h-52 object-cover w-full"
          />
        ) : (
          <img
            src={posterFallback}
            alt={title}
            className="rounded-tl-xl rounded-tr-xl h-52  object-cover w-full"
          />
        )}
        <div className="relative flex flex-col p-2 md:p-4 gap-2 bg-[#070707] rounded-bl-xl rounded-br-xl   w-full">
          {favorited ? (
            <Favorite
              className="absolute right-1 text-[#AF63FF] cursor-pointer"
              onClick={removeFavorite}
            />
          ) : (
            <FavoriteBorderIcon
              className="absolute right-1 text-gray-500 cursor-pointer hover:text-[#bb99df]"
              onClick={addToFavorite}
            />
          )}

          <h2 className="font-bold text-sm truncate w-[100px] md:w-[150px]  self-start">
            {title}
          </h2>
          {releaseDate ? (
            <span className="text-gray-500 text-xs">
              {releaseDate.slice(0, 4)}
            </span>
          ) : (
            <span className="text-gray-500 text-xs">Data indisponível</span>
          )}
          <OutlinedButton text="Detalhes" path={`/movie/${id}`} />
        </div>
      </div>
    </>
  );
};
