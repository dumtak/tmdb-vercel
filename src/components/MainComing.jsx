// 메인 비주얼(upcoming)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";

const MainComing = () => {
  const APIKEY = process.env.REACT_APP_API_KEY;

  const [trendMov, setTrendMov] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=ko`
      );
      setTrendMov(response.data.results);
      // console.log("MainComing.jsx==", response);

      setIsLoading(false);
    } catch (err) {
      // console.log("Error:", err)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // console.log("data", trendMov);


  return (
    <>
      {/* discover/movie : 장르별, 평점별, 추천 수 별 영화들을 불러온다.
      /movie/{movie_id}/credits : 영화 출연진, 감독, 스태프 등을 불러온다.
      /movie/{movie_id} : 영화 상세정보를 불러온다.
      /movie/upcoming : 개봉 예정작을 불러온다.
      /movie/now_playing : 현재 상영작을 불러온다.
      /trending/{movie}/{time_window} : 일별, 주차별 인기작을 불러온다.
      /search/movie : 영화 검색 결과를 불러온다. */}
      <section className="section-visual">
        {isLoading ? (
          <p className="loading">로딩중</p>
        ) : (
          <Swiper className="swiper-visual"
            modules= {[Autoplay, A11y]}
            loop= {true}
            slidesPerView= {1}
            spaceBetween= {0}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              767: {
                slidesPerView: 3,
                spaceBetween:8
              },
            }}
          >
            { trendMov.map((el,idx)=> (
              <SwiperSlide key={idx}>
                {/* {console.log("222",el)} */}
                <Link to={`movies/${el.id}`}>
                  <img src={ el.poster_path ? `https://image.tmdb.org/t/p/original${el.backdrop_path}` : "https://via.placeholder.com/w500"} alt={el.name}/>
                  <div className="heading">
                    <h2 className="tit">{el.title}</h2>
                    <h3 className="tit-en">{el.original_title}</h3>
                    {/* <p className="date">{el.release_date}</p> */}
                    <p className="rating">{el.vote_average.toFixed(1)}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ) ) }
          </Swiper>
        )}
      </section>
    </>
  );
};

export default MainComing;
