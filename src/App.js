import "./App.scss";

import Nav from './components/Nav';

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx"; //비주얼
import SearchDetail from "./pages/SearchDetail.jsx"; //개봉예정작

import BtnPageTop from "./components/BtnPageTop.jsx";


function App() {
  return (
    <>
      <div className="App">
        <Nav/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/movies/:id" element={<MovieDetail/>}/>
            <Route path="/search/:movieId" element={<SearchDetail/>}/>
          </Routes>
        </main>
        <BtnPageTop/>
      </div>
    </>
  );
}

export default App;
