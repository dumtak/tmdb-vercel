import React from 'react';

import { Link, NavLink } from "react-router-dom";
import { RiMovie2Fill } from "react-icons/ri";

const Nav = () => {
  const activeStyle = {
    color: '#ff3e3e',
  };
  return (
    <>
      <header>
        <div className="layout-fix">
          <h1><Link to="/"><RiMovie2Fill style={{color:"#fff"}}/></Link></h1>
          <ul className="displaynone gnb">
            <li><NavLink to="/" style={({isActive})=>(isActive ? activeStyle : null)}>Home</NavLink></li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Nav;