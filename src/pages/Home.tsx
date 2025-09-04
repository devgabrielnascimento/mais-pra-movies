import Menu from "../components/Menu";
import Cover from "../components/Cover";
import SplideListMovies from "../components/SplideListMovies";
import Footer from "../components/Footer";
import { MovieService } from "../services/movieService";
import { useEffect, useState } from "react";


function Home() {
  interface Movie {
    poster_path?: string;
    title: string;
    release_date: string;
    id: string;
    provider: string;
  }
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setnowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upComingMovies, setUpComingMovies] = useState<Movie[]>([]);
  const [randomPopularMovie, setRandomPopularMovie] = useState<Movie>();

  useEffect(() => {
    const randomNumber: number =
      popularMovies?.length > 0
        ? Math.floor(Math.random() * popularMovies.length)
        : 0;
    setRandomPopularMovie(popularMovies[randomNumber]);
  }, [popularMovies]);

  useEffect(() => {
    const api = new MovieService();
    api.getMovies("/movie/popular?language=pt-BR&page=1").then((data) => {
      setPopularMovies(data.results);
    });

    api.getMovies("/movie/now_playing?language=pt-BR&page=1").then((data) => {
      setnowPlayingMovies(data.results);
    });

    api.getMovies("/movie/top_rated?language=pt-BR&page=1").then((data) => {
      setTopRatedMovies(data.results);
    });

    api.getMovies("/movie/upcoming?language=pt-BR&page=1").then((data) => {
      setUpComingMovies(data.results);
    });
  }, []);

  useEffect(() => {
    const api = new MovieService();
    if (randomPopularMovie) {
      api
        .detailMovie(`/movie/${randomPopularMovie?.id}/watch/providers`)
        .then((response) => {
          const provider = response?.data?.results?.BR?.link;
          if (provider && !randomPopularMovie?.provider) {
            setRandomPopularMovie({ ...randomPopularMovie, provider });
          }
        });
    }
  }, [randomPopularMovie]);

  return (
    <>
      <Menu />
      <Cover movie={randomPopularMovie} />
      <main className="w-full flex justify-center items-center">
        <div className="w-full max-w-[1200px]">
          <SplideListMovies
            movies={nowPlayingMovies}
            categoryName="Em cartaz"
          />
          <SplideListMovies
            movies={topRatedMovies}
            categoryName="Melhor avaliados"
          />
          <SplideListMovies movies={popularMovies} categoryName="Populares" />
          <SplideListMovies movies={upComingMovies} categoryName="Em Breve" />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
