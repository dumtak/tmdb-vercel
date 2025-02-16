import React from 'react';
import MainComing from '../components/MainComing';
import Search from '../components/Search';
import MainNow from '../components/MainNow';
import MainUpComing from '../components/MainUpComing';

const Home = () => {
  return (
    <>
      <div className="home">
        <MainComing/>
        <Search/>
        <MainNow/>
        <MainUpComing/>
      </div>
    </>
  );
};

export default Home;