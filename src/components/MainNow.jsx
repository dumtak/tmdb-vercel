import React, { useState,useEffect } from 'react';
import axios from "axios";

import MovieNowCard from "../components/MovieNowCard.jsx";

const MainNow = () => {
  const APIKEY = process.env.REACT_APP_API_KEY; //API_KEY(.env)

  const [appMov,setAppMov] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getMovies = async()=>{
    try{
      // const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=ko`);
      const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}&language=ko`);
      setAppMov(response.data.results);
      // setAppMov(response.data.results.slice(0, 8));
      console.log("Home.jsx==", response);                                                                                                                                                                          
      setIsLoading(false);
    } catch(err){
      console.log("Error:", err)
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    getMovies();
  }, [])


  const [movList, SetMovList] = useState(8);
  const movPerPage = 4; //더보기 클릭시 4개씩 더보기
  const handleMore = ()=>{
    SetMovList((prevVisible)=> prevVisible + movPerPage );
  }

  return (
    <>
      <section className="movNow">
        <div className="layout-fix">
        { isLoading ? (<p className="loading">로딩중</p>) : (
              <>
                <h2>현재 상영작</h2>
                <div className="now">
                  <ul className="mov-list">
                    {/* {appMov.map((el, idx)=>{ */}
                    {appMov.slice(0, movList).map((el, idx)=>{ //8개만 보여라(movList)
                      return(
                        <MovieNowCard
                        key={el.id}
                        id={el.id}
                        poster={el.backdrop_path}
                        title={el.title}
                        name={el.name}
                        titleEn={el.original_title}
                        titleOr={el.original_name}
                        vote={el.vote_average.toFixed(1)}/>
                      )
                    })}
                  </ul>
                </div>
                {appMov.length > movList && (
                    <div className="more">
                      <button className="btnMore" onClick={()=>{ handleMore() }}>더보기</button>
                    </div>
                  )}
              </>
            ) }
        </div>
      </section>
    </>
  );
};

export default MainNow;