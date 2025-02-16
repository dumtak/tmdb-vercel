import React from 'react';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SearchDetail = () => {
  const APIKEY = process.env.REACT_APP_API_KEY;

  const {movieId} = useParams(); //(App.js) <Route path="/search/:movieId" element={<SearchDetail/>}/>
  const [detailInfo,setDetailInfo] = useState({}); //선택영화 상세정보
  const [actors,setActors] = useState([]); //출연배우정보
  
  const imgPath = "http://image.tmdb.org/t/p/original"; //tmdb이미지 경로
  
  const fetchMovDetail = async ()=>{
    try { 
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}&language=ko`); //async 쓰면 무조건 await
      setDetailInfo(response.data);
      console.log("setDetailInfo", response, {movieId});
    } catch(err) {
      console.log("SearchDetail(setDetailInfo)", err)
    }

    try { 
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${APIKEY}&language=ko`);
      setActors(response.data.cast);
      console.log("/credits?", response.data.cast);
    } catch(err) {
      console.log("SearchDetail(setActors)", err)
    }
  }
  useEffect(()=>{
    fetchMovDetail();
  },[])

  return (
    <>
      {/* SearchDetail Page */}
      <div className="searchDetail">
          <div className="layout-fix">
            {/* <div className="mov-back" style={{background:`transparent url(${imgPath}${detailInfo.backdrop_path})no-repeat center/cover`}}> */}
            <div className="mov-back">
              <div className="mov-poster">
                <img src={`${imgPath}${detailInfo.poster_path}`} alt={detailInfo.title}/>
              </div>
              <div className="mov-info">
                  <p className="date">{detailInfo.release_date}</p>
                  <h3>{detailInfo.original_title}</h3>
                  <h2>{detailInfo.title}</h2>
                  <p className="desc">{detailInfo.overview}</p>
                  <ul className="actor-list">
                    {actors.slice(0,10).map((el)=> ( //slice10개만
                      <li key={el.id}>
                        <img src={`${imgPath}${el.profile_path}`} alt={el.name}/>
                        <p className="name">{el.original_name}</p>
                        <p className="character">({el.character})</p>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default SearchDetail;