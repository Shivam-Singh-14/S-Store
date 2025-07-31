import React from 'react';
import { Link } from 'react-router-dom';
import HomeBanner from '../components/Home/HomeBanner';
import Categories from '../components/Home/Categories';
import VideoSection from '../components/Home/VideoSection';
import Brands from '../components/Home/brands';
import PopularCategories from '../components/Home/PopularCategories';
import Advantages from '../components/Home/Advantages';
const Home = () => {
  return (
    <div>
      <HomeBanner />
      <Categories />
      <PopularCategories />
      <Advantages />
      <VideoSection />
      <Brands />
      {/* Test link to product page */}
      <div className="text-center my-4">
        
      </div>
    </div>
  );
};

export default Home;