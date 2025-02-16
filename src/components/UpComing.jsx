// 메인 개봉상영작(movComing)
import React from 'react';

import { useState, useEffect } from "react";
import axios from 'axios';

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const UpComing = () => {
  const APIKEY = process.env.REACT_APP_API_KEY;

  const [nextMov,setNextMov] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getMovies = async()=>{
    try{
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=ko`);
      setNextMov(response.data.results);
      // setAppMov(response.data.results.slice(0, 8));
      console.log("UpComing.jsx==", response);                                                                                                                                                                          
      setIsLoading(false);
    } catch(err){
      console.log("Error:", err)
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    getMovies();
  }, [])

  return (
    <>
      {/* main - UpComing section */}
      <section className="movComing">
        <div className="layout-fix">
          { isLoading ? (<p className="loading">로딩중</p>) : (
            <>
              <h2>개봉 예정작</h2>
              <Swiper className="coming-list"
                  modules={[A11y, Autoplay, Navigation, Pagination]}
                  a11y={{
                    enabled: true,
                    prevSlideMessage: '이전 슬라이드',
                    nextSlideMessage: '다음 슬라이드',   
                  }}
                  slidesPerView={1}
                  spaceBetween={20} 
                  grabCursor={true}
                  navigation={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  onSwiper={(swiper) => swiper.el.classList[window.innerWidth <= 767 ? 'add' : 'remove']("my-custom-class")}
                  breakpoints={{
                    767: {
                      slidesPerView: 3,
                    },
                  }}>
                    {nextMov.map((el,idx) => (
                      <SwiperSlide key={idx}>
                        <Link to={`movies/${el.id}`}>
                          <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={`${el.title}`}/>
                          <div className="tit">{el.title}</div>
                          <div className="tit-en">{el.original_title}</div>
                        </Link>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </>
          )}



        </div>
      </section>
    </>
  );
};

export default UpComing;