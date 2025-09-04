import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import Building from "./pages/Building";
import RandomMovie from "./pages/RandomMovie";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/building" element={<Building />} />
        <Route path="/random-movie" element={<RandomMovie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export  default Router;