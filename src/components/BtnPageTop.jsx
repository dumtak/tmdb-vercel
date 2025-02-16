import React from 'react';

import { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa6";

const BtnPageTop = () => {
  const [isVisible,setIsVisible] = useState(false);
  useEffect(()=>{
    const handleScroll = ()=>{
      setIsVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScroll);
    return()=>{
      window.removeEventListener("scroll", handleScroll);
    }
  },[])
  const scrollTop = ()=>{
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  return (
    isVisible && (
      <>
        <div className="quick-top">
          <button type="button" onClick={scrollTop}><FaArrowUp style={{}}/></button>
        </div>
      </>
    )
  );
};

export default BtnPageTop;