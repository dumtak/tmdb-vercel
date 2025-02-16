import React from 'react';

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const Coming = () => {
  const APIKEY = process.env.REACT_APP_API_KEY;

  const {id} = useParams();
  const [isLoading,setIsLoading] = useState(true);
  const [comingMov,setComingMov] = useState(null);
  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=ko`)
    .then((res)=>{
      console.log("Coming.jsx==", res);
      setComingMov(res.data);
      setIsLoading(false);
    })
    .catch((err)=>{ console.log("Coming.jsx==", err); })
  },[])
  return (
    <>
      <div className="movComing">
        {isLoading ? (<p className="loading">로딩중</p>) : (
          <>
            <div className="movDetail">
              <img src={`https://image.tmdb.org/t/p/w1280/${comingMov.backdrop_path}`} alt={`${comingMov.title}`}/>
              <div className="overlayInfo">
                <div className="layout-fix">
                  <p className="vote">{comingMov.vote_average.toFixed(1)}</p>
                  <h2 className="title">{comingMov.title}</h2>
                  <h3 className="titleEn">{comingMov.original_title}</h3>
                  <p className="desc">{comingMov.overview}</p>
                  <p className="genres">{comingMov.genres.map((el,idx) => <span key={idx}>{el.name}</span>)}</p>
                  <p className="date">{comingMov.release_date}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Coming;