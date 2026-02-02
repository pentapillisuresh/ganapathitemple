import React from 'react';
import HeroBanner from './HomeSections/HeroBanner';
import QuickActions from './HomeSections/QuickActions';
import FeaturedActivities from './HomeSections/FeaturedActivities';
import FeaturedGanapathis from './HomeSections/FeaturedGanapathis';
import FeaturedBanquetHalls from './HomeSections/FeaturedBanquetHalls';
import FeaturedIdols from './HomeSections/FeaturedIdols';
import FeaturedBlog from './HomeSections/FeaturedBlog';

const Home = ({ data }) => {
  return (
    <div>
      <HeroBanner templeInfo={data.templeInfo} />
      {/* <QuickActions /> */}
      <FeaturedActivities activities={data.activities} />
      <FeaturedGanapathis ganapathis={data.ganapathis32} />
      <FeaturedBanquetHalls banquetHalls={data.banquetHalls} />
      <FeaturedIdols idols={data.idols} />
      <FeaturedBlog blogPosts={data.blogPosts} />
    </div>
  );
};

export default Home;