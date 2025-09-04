import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Menu from "../components/Menu"
import MovieDetailComponent from "../components/MovieDetailComponent"

const MovieDetail = () => {
  const {movieId} = useParams<any>()
  return (
    <>
      <Menu />
      <MovieDetailComponent movieId={movieId ? movieId : '755898'}/>
      <Footer/>
    </>
  )
}

export default MovieDetail