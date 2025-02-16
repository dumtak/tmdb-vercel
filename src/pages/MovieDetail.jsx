import React from 'react';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

const Movies = () => {
  const APIKEY = process.env.REACT_APP_API_KEY;

  //<Route path="/movies/:id" element={<MovieDetail/>}/> 에서
  // :id면 const {id} 로 불러와야함 :a면 {a}
  const { id } = useParams();
  const [isLoading,setIsLoading] = useState(true);
  const [mov, setMov] = useState(null);
  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=ko`)
    .then(res => {
      console.log("MovieDetail.jsx==", res);
      setMov(res.data);
      setIsLoading(false);
    } );
  },[])
  return (
    <>
      {/* MoviesDetail Page */}
      {isLoading ? (<p className="loading">로딩중</p>) : (
        <>
          <div className="movDetail">
            <img src={`https://image.tmdb.org/t/p/w1280/${mov.backdrop_path}`} alt={`${mov.title}`}/>
            <div className="overlayInfo">
              <div className="layout-fix">
                <p className="vote">{mov.vote_average.toFixed(1)}</p>
                <h2 className="title">{mov.title}</h2>
                <h3 className="titleEn">{mov.original_title}</h3>
                <p className="desc">{mov.overview}</p>
                <p className="genres">{mov.genres.map((el,idx) => <span key={idx}>{el.name}</span>)}</p>
                <p className="date">{mov.release_date}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Movies;