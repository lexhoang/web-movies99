// import logo from './logo.svg';
import './App.css';
import './styles/cardMovie.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import TreadingPage from './pages/TreadingPage';
import TvSeriesPage from './pages/TvSeriesPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='movies' element={<MoviesPage />}></Route>
          <Route path='treading' element={<TreadingPage />}></Route>
          <Route path='tvseries' element={<TvSeriesPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
