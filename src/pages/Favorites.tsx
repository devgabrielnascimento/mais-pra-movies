import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ListMovies from "../components/ListMovies";
import Menu from "../components/Menu";
import { MovieService } from "../services/movieService";;
import FilledButton from "../components/FilledButton";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favoritesId, setFavoritesId] = useState<string[]>([]);
  const [favoritesMovies, setFavoritesMovies] = useState<any[]>([]);

  const generateArrayFavoritesId = () => {
    const favoriteMoviesId: string[] = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key) {
          const item = localStorage.getItem(key);
          if (item) {
            favoriteMoviesId.push(item);
          }
        }
      }
      setFavoritesId(favoriteMoviesId);
    } else {
      setFavoritesId([]);
    }
  };

  useEffect(() => {
    const favoriteMoviesList: any[] = [];
    const api = new MovieService();

    generateArrayFavoritesId();

    if (favoritesId.length > 0) {
      favoritesId.map((movieId) => {
        api
          .detailMovie(
            `/movie/${movieId}?language=pt-BR`
          )
          .then((result: any) => {
            favoriteMoviesList.push(result.data);
          });
      });
    }
    setFavoritesMovies(favoriteMoviesList);
  }, []);

  useEffect(() => {
    if (!favoritesId.length) return;

    const api = new MovieService();

    const fetchFavorites = async () => {
      try {
        const results = await Promise.all(
          favoritesId.map((movieId) =>
            api.detailMovie(
              `/movie/${movieId}?language=pt-BR`
            )
          )
        );

        setFavoritesMovies(results.map((r: any) => r.data));
      } catch (error) {
        console.error("Erro ao buscar filmes favoritos:", error);
      }
    };

    fetchFavorites();
  }, [favoritesId]);

  return (
    <>
      <Menu />
      <main className="relative my-16">
        <h1 className="text-center text-xl md:text-2xl font-bold p-4">
          Meus favoritos
        </h1>
        {favoritesMovies.length !== 0 ? (
          <ListMovies moviesList={favoritesMovies} />
        ) : (
          <div className="flex flex-col gap-8 items-center justify-center h-[calc(100vh-210px)] p-4">
            <h2 className="font-bold text-xl text-center">
              Não há filmes na sua galeria de favoritos ainda...
            </h2>
            <p className="text-gray-400 text-center">
              Adicione seus filmes e séries favoritos clicando no ícone coração
            </p>
            <Link to="/">
              <FilledButton
                text="Acessar catálogo de filmes"
                bgColor="#6700D4"
              />
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Favorites;
