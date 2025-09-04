import FilledButton from "./FilledButton";
import backdropFallback from "../assets/img/backdrop-fallback.jpg";
import { Link } from "react-router-dom";

const Cover = ({ movie }: any) => {
  return (
    <section className="w-full flex justify-center items-center h-full lg:h-[500px] p-4  pt-30">
      <div className="relative flex justify-center items-start w-full sm:max-w-[1200px] h-full flex-col ">
        <h2 className="text-3xl md:text-2xl lg:text-2xl font-bold">Em alta</h2>
        <img
          src={
            movie?.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
              : backdropFallback
          }
          alt="superman"
          className="flex w-full max-w-[1200px] h-full min-h-[400px] lg:max-h-[425px] object-cover"
        />
        <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3),rgba(0,0,0,1))] bottom-[-1px]"></div>
        <div className="absolute flex flex-col gap-4 bottom-4 left-4 md:bottom-25 md:left-8">
          <div className="flex flex-col gap-1">
          </div>
          <h1 className="uppercase font-bold text-xl md:text-5xl">
            {movie?.title ? `${movie?.title}` : "CARREGANDO..."}
          </h1>

          <span className="text-sm">
            {movie?.release_date
              ? movie.release_date.slice(0, 4)
              : "CARREGANDO..."}
          </span>
          <span className="text-sm">
            ⭐ {movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A"} (
            {movie?.vote_count} votos)
          </span>
          <Link to={`${movie?.provider}`}>
            <FilledButton text="Assistir agora" bgColor="#6700D4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cover;
