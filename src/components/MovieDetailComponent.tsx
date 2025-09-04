import { useEffect, useState } from "react";
import FilledButton from "./FilledButton";
import { MovieService } from "../services/movieService";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";

interface MovieId {
  movieId: string;
}

interface Movie {
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  vote_average: string;
  id?: string;
  backdrop_path: string;
  provider?: string;
}

interface Videos {
  trailerId: string;
  moviePath: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path?: string;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const MovieDetailComponent = ({ movieId }: MovieId) => {
  const [movie, setMovie] = useState<Movie>();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [videos, setVideos] = useState<Videos>();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [credits, setCredits] = useState<CrewMember[]>([]);

  const navigate = useNavigate();

  const handleOpen = () => {
    const api = new MovieService();
    api
      .detailMovie(`/movie/${movieId}/videos?language=pt-BR`)
      .then((response: any) => {
        const trailer = response.data.results.find(
          (v: any) => v.type === "Trailer"
        );
        if (trailer) {
          setVideos({
            trailerId: trailer.key,
            moviePath: trailer.id,
          });
        }
      });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const api = new MovieService();
    api.detailMovie(`/movie/${movieId}?language=pt-BR`).then((result: any) => {
      setMovie(result.data);
    });
  }, [movieId]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const api = new MovieService();
    if (movie) {
      api.detailMovie(`/movie/${movieId}/watch/providers`).then((response) => {
        const provider = response?.data?.results?.BR?.link;
        if (provider && !movie?.provider) {
          setMovie({ ...movie, provider });
        }
      });
    }
  }, [movie, movieId]);

  useEffect(() => {
    const api = new MovieService();
    api
      .detailMovie(`/movie/${movieId}/credits?language=pt-BR`)
      .then((response: any) => {
        setCast(response.data.cast);
        setCredits(response.data.crew);
      });
  }, [movieId]);

  return (
    <main className="relative w-full h-[calc(100vh)] bg-black flex items-center justify-center text-white ">
      {!movie ? (
        <Loading />
      ) : (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
            alt={movie?.title}
            className="h-full w-screen object-cover inset-0"
          />
          <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-black/80 h-full"></div>

          <Link to="/">
            <button
              className="absolute top-0 left-0 text-sm text-gray-400 w-fit h-fit p-4 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Voltar à página anterior
            </button>
          </Link>

          <div className="flex flex-col gap-4 md:gap-2 pt-80 absolute z-2 top-1/3 left-1/2 -translate-1/2 w-full max-w-[1000px] px-4 ">
            {/* Informações principais */}
            <div className="flex gap-8 md:gap-4 flex-col md:flex-row items-center md:items-start pt-50">
              {width > 768 ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                  alt={movie?.title}
                  className="w-34 h-50 sm:h-full sm:w-60 object-fill rounded"
                />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
                  alt={movie?.title}
                  className="w-full max-w-80 m-auto object-cover rounded"
                />
              )}
              <div className="flex gap-4 mt-4 flex-col">
                <h1 className="font-bold">{movie?.title}</h1>
                <span className="opacity-60 text-xs md:text-sm">
                  {movie?.release_date.slice(0, 4)}
                </span>
                <p className="text-xs md:text-sm">{movie?.overview}</p>
                <span className="font-bold text-xs">
                  Avaliação: {movie?.vote_average.toString().slice(0, 3)} / 10
                </span>
                <div className="flex gap-4">
                  <a href={movie?.provider} target="_blank" rel="noreferrer">
                    <FilledButton text="Assistir" bgColor="#6700D4" />
                  </a>
                  <FilledButton
                    text="Trailer"
                    bgColor="#ffffff"
                    eventClick={handleOpen}
                  />
                </div>
              </div>
            </div>

            {/* Elenco */}
            <div>
              <h2 className="font-bold mb-2">Elenco</h2>
              <div className="flex gap-2 overflow-y-hidden scrollbar-none">
                {cast.length === 0 && <span>Nenhum ator disponível</span>}
                {cast.slice(0, 10).map((actor) => (
                  <div key={actor.id} className="text-center w-24">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "https://via.placeholder.com/100x150?text=Sem+Foto"
                      }
                      alt={actor.name}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <p className="text-xs mt-1 font-semibold">{actor.name}</p>
                    <p className="text-[10px] opacity-60">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold mb-2">Equipe técnica</h2>
              <div className="flex gap-2 overflow-y-hidden scrollbar-none">
                {credits.length === 0 && <span>Nenhum crédito disponível</span>}
                {credits.slice(0, 10).map((crew) => (
                  <div key={crew.id} className="text-center w-24">
                    <img
                      src={
                        crew.profile_path
                          ? `https://image.tmdb.org/t/p/w185${crew.profile_path}`
                          : "https://via.placeholder.com/100x150?text=Sem+Foto"
                      }
                      alt={crew.name}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <p className="text-xs mt-1 font-semibold">{crew.name}</p>
                    <p className="text-[10px] opacity-60">{crew.job}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videos?.trailerId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Box>
      </Modal>
    </main>
  );
};

export default MovieDetailComponent;
