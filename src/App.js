// import logo from './logo.svg';
import './App.css';
import './styles/cardMovie.scss';
import './styles/MUI.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-modal-video/scss/modal-video.scss"
import 'animate.css';

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import TvSeriesPage from './pages/TvSeriesPage';
import TreadingPage from './pages/TreadingPage';
import MediaDetailPage from './pages/MediaDetailPage';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/page/:page" element={<MoviesPage />} />

        <Route path="tvseries" element={<TvSeriesPage />} />
        <Route path="tvseries/page/:page" element={<TvSeriesPage />} />

        <Route path="treading" element={<TreadingPage />} />
        <Route path="treading/page/:page" element={<TreadingPage />} />

        <Route path=":type/:movieId" element={<MediaDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
