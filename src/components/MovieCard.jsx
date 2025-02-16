// 메인 현재상영작(movNow)
import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ( {id, poster, title, name, titleEn, titleOr, vote} ) => {
  return (
    <>
      <li key={id}>
        <Link to={`movies/${id}`}>
          <img src={`https://image.tmdb.org/t/p/w500/${poster}`} />
          <div className="tit">{title ? title : name}</div>
          <div className="tit-en">{titleEn ? titleEn : titleOr}</div>
          <div className="vote">★ {vote}</div>
        </Link>
      </li>
    </>
  );
};

export default MovieCard;
