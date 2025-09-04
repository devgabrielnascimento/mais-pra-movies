import { MovieItem } from "./MovieItem";
import Loading from "./Loading";

interface SplideMovies {
  movies: any[];
  categoryName:string

}
const SplideListMovies = ({ movies, categoryName }: SplideMovies) => {
  return (
    <>
      {!movies || movies.length === 0 ? (
        <Loading />
      ) : (
        <section className="m-auto font-bold p-4  max-w-[1900px]">
          <h2 className="pb-4 text-xl w-fit">{categoryName}</h2>
          <div className="flex gap-4 xl:gap-8 overflow-x-scroll overflow-y-hidden scrollbar-none ">
            {movies.map((movie) => (
              <MovieItem
                posterPath={movie.poster_path}
                title={movie.title}
                releaseDate={movie.release_date}
                key={movie.id}
                id={movie.id}
                
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default SplideListMovies;
