import { useEffect, useState } from "react";
import { MovieItem } from "../components/MovieItem";
import Menu from "../components/Menu";
import { MovieService } from "../services/movieService";

const RandomMovie = () => {
 const [randomMovie, setRandomMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = new MovieService();

    const fetchMovies = async () => {
      try {
        const data = await api.getMovies(
          "/movie/popular?language=pt-BR&page=1"
        );

        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setRandomMovie(data.results[randomIndex]);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes populares:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Carregando filme aleatório...</p>;
  if (!randomMovie) return <p>Nenhum filme disponível</p>;

  return (
    <div>
      {" "}
      <Menu />
      <div className="flex gap-4 justify-around max-w-[1150px] w-fit flex-wrap m-auto p-4 pt-32">
        <h2 className="pb-4 text-xl w-fit">Filme aleatório</h2>
        <MovieItem
          posterPath={randomMovie.poster_path}
          title={randomMovie.title}
          releaseDate={randomMovie.release_date}
          id={randomMovie.id}
        />
        
      </div>
    </div>
  );
};

export default RandomMovie;
