import React from 'react';

import { LuSearch } from "react-icons/lu";

import { useState } from "react";
import axios from 'axios';

import { Link } from "react-router-dom";
import SearchDetail from '../pages/SearchDetail';

const Search = () => {
  const APIKEY = process.env.REACT_APP_API_KEY;
  
  const [searchWord,setSearchWord] = useState(""); //inputValue
  const [isSearch,setIsSearch] = useState(false);

  const [movies,setMovies] = useState([]);
  const search = ()=>{ //영화검색함수(입력처리)
    
    // export const API_URL = 'https://api.themoviedb.org/3/';
    // export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
    
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=ko&page=1&include_adult=false&query=${searchWord}`)
    .then((res)=>{ 
      setMovies(res.data.results);

      console.log("UpComing.jsx==", res);           
      console.log("Search.jsx==", res.data.total_results);           
    })
    .catch((err)=>{ console.log("Search.jsx==", err) })
  }
  const handleKeyPress = (e)=>{
    // console.log(e.key);
    if(e.key == "Enter"){
      search();
      searchWord === "" ? setIsSearch(false) : setIsSearch(true);
    }
  }

  const imgPath = "http://image.tmdb.org/t/p/original"; //tmdb이미지 경로
  const [mode,setMode] = useState("list"); //list일때, detail일때 화면관리
  
  const [selectMovID,setSelectMovId] = useState(null); //선택한 영화id값
  const showDetail = (movieId)=>{
    setMode("detail");
    setSelectMovId(movieId);
  }

  console.log("movies", movies, "searchWord", searchWord)

  return (
    <>
    <section className="movSearch">
      <div className="layout-fix">
        <div className="search-box">
          <input type="text" value={searchWord}
          onKeyPress={handleKeyPress}
          onChange={(e)=>{ setSearchWord(e.target.value) }}
          placeholder="영화 제목을 입력해주세요"/>
          <button onClick={()=>{ search(); }} className="btnSearch"><LuSearch/></button>
        </div>
        <div className="search-result">
          <ul className="search-list" style={{ display:mode === "list" ? "flex" : "none" }}>
            { movies.map((el)=>( //{return} (바로태그)
               <li key={el.id}>
                 {/* <Link to={`/movies/${el.id}`}> */}
                 <Link to={`/search/${el.id}`} onClick={()=>{ showDetail(el.id); }}>
                   <img src={`${imgPath}${el.poster_path}`} alt={movies.title}/>
                   <p className="title">{el.title}</p>
                   <span className="date">{el.release_date}</span>
                 </Link>
               </li>
             )) }
            { isSearch && movies.length === 0 && ( <li className="empty">일치하는 영화가 없습니다</li> ) }
          </ul>
        </div>
        {mode === "detail" && <SearchDetail selectMovID/>}
      </div>
    </section>
    </>
  );
};

export default Search;