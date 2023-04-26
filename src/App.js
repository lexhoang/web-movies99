// import logo from './logo.svg';
import './App.css';
import './styles/cardMovie.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
