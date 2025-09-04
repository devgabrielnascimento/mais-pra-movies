import { useState } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import SearchComponent from "../components/SearchComponent";
import { MovieService } from "../services/movieService";
import ListMovies from "../components/ListMovies";
import movieImage from "../assets/img/movie-image.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Search = () => {
  const [searchValueFormatted, setsearchValueFormatted] = useState("");
  const [searchValueNonFormatted, setsearchValueNonFormatted] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [maxPages, setMaxPages] = useState(0);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const api = new MovieService();
    api
      .getMovies(
        `/search/movie?query=${searchValueFormatted}&language=pt-BR&page=${value}`
      )
      .then((data) => {
        setMoviesList(data.results);
        setMaxPages(data.total_pages);
      });
  };

  const formatValue = (value: string) => {
    const removeSpaces = value.trim().replace(/\s+/g, " ");
    const formattedValue = removeSpaces.replaceAll(" ", "%20");
    return formattedValue;
  };

  const handleTargetValue = (value: string) => {
    setsearchValueNonFormatted(value.trim());
    const valueFormatted = formatValue(value);
    setsearchValueFormatted(valueFormatted);
  };

  const handleSearchClick = () => {
    const api = new MovieService();
    api
      .getMovies(`/search/movie?query=${searchValueFormatted}&language=pt-BR`)
      .then((data) => {
        setMoviesList(data.results);
        setMaxPages(data.total_pages);
      });
  };

  return (
    <>
      <Menu />
      <main className="flex items-center justify-center flex-col mt-16">
        <h1 className="text-center text-xl md:text-2xl font-bold p-4">
          Pesquise por qualquer filme
        </h1>
        <SearchComponent
          sendTargetValue={handleTargetValue}
          sendEventClick={handleSearchClick}
        />
        {moviesList.length === 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center h-[calc(100vh-320px)]">
            <img src={movieImage} alt="movie image" className="w-48" />
            <h2 className="text-xl font-semibold px-4 text-center">
              Nenhum resultado para sua pesquisa ainda. Pesquise seu filme
              favorito!
            </h2>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-light text-center p-4">
              Pesquisando por:
              <strong className="font-bold"> {searchValueNonFormatted}</strong>
            </h2>
            <h2 className="text-xl font-semibold text-center p-4">
              {maxPages} resultados encontrados
            </h2>
            <ListMovies moviesList={moviesList} />
            {maxPages === 1 ? (
              <></>
            ) : (
              <Stack spacing={2} className="m-auto w-fit py-8">
                <Pagination
                  count={maxPages}
                  onChange={handleChange}
                  color="secondary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "white",
                    },
                  }}
                />
              </Stack>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Search;
