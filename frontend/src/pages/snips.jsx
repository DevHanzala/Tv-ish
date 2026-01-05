import React from 'react';
import FrontPodcast from '../components/frontpodcast';
import LatestPodcast from '../components/Latestpodcast';
import WeeklyTopCategory from '../components/podcastcategory';
import MovieBox from "../components/moviebox";
import MoviesGrid from "../components/MoviesGrid";
import FAQ from "../components/FAQ";
import Container from "../components/banner";
import CategorySlider from "../components/CategorySlider";
import TopPodcaster from "../components/toppodcaster"; 
import SnipFront from '../components/snipfront'; // Path adjust karen agar folder alag hai



const Toprated = [
  {
      image: "/images/111.png",
      title: "Lorem ipsum dolor sit amet...",
      views: "4 thousand views",
    },
    {
      image: "/images/222.png",
      title: "Lorem ipsum dolor sit amet...",
      views: "1 million views",
    },
    {
      image: "/images/555.png",
      title: "Lorem ipsum dolor sit amet...",
      views: "4 thousand views",
    },
    {
      image: "/images/777.png",
      title: "Lorem ipsum dolor sit amet...",
      views: "1 million views",
    },
    {
      image: "/images/999.png",
      title: "Lorem ipsum dolor sit amet...",
      views: "4 thousand views",
    },
    {
      image: "/images/888.png",
      title: "Lorem ipsum dolor sit amet...",
      views: "1 million views",
    },
];


const ForYouItems = [
  {
    image: "/images/333.png",
    title: "Dance Challenge",
    subtitle: "Trending dance moves",
  },
  {
    image: "/images/444.png",
    title: "Guitar Solo",
    subtitle: "Acoustic guitar performance",
  },
  {
    image: "/images/555.png",
    title: "Singing Cover",
    subtitle: "Popular song cover",
  },
  {
    image: "/images/666.png",
    title: "Basketball Tricks",
    subtitle: "Amazing basketball skills",
  },
  {
    image: "/images/777.png",
    title: "Cooking Tutorial",
    subtitle: "Delicious recipe",
  },
    {
    image: "/images/111.png",
    title: "Basketball Tricks",
    subtitle: "Amazing basketball skills",
  },
  {
    image: "/images/333.png",
    title: "Cooking Tutorial",
    subtitle: "Delicious recipe",
  },
];

const Followartist = [
  {
    image: "/images/888.png",
    title: "Dance Challenge",
    subtitle: "Trending dance moves",
  },
  {
    image: "/images/999.png",
    title: "Guitar Solo",
    subtitle: "Acoustic guitar performance",
  },
  {
    image: "/images/1000.png",
    title: "Singing Cover",
    subtitle: "Popular song cover",
  },
  {
    image: "/images/1100.png",
    title: "Basketball Tricks",
    subtitle: "Amazing basketball skills",
  },
  {
    image: "/images/1200.png",
    title: "Cooking Tutorial",
    subtitle: "Delicious recipe",
  },
];

const Toptrending = [
  {
    image: "/images/222.png",
    title: "Dance Challenge",
    subtitle: "Trending dance moves",
  },
  {
    image: "/images/333.png",
    title: "Guitar Solo",
    subtitle: "Acoustic guitar performance",
  },
  {
    image: "/images/666.png",
    title: "Singing Cover",
    subtitle: "Popular song cover",
  },
  {
    image: "/images/777.png",
    title: "Basketball Tricks",
    subtitle: "Amazing basketball skills",
  },
  {
    image: "/images/111.png",
    title: "Cooking Tutorial",
    subtitle: "Delicious recipe",
  },
];

const Topsnips = [
  {
    image: "/images/999.png",
    title: "Dance Challenge",
    subtitle: "Trending dance moves",
  },
  {
    image: "/images/1000.png",
    title: "Guitar Solo",
    subtitle: "Acoustic guitar performance",
  },
  {
    image: "/images/1100.png",
    title: "Singing Cover",
    subtitle: "Popular song cover",
  },
  {
    image: "/images/1200.png",
    title: "Basketball Tricks",
    subtitle: "Amazing basketball skills",
  },
  {
    image: "/images/1300.png",
    title: "Cooking Tutorial",
    subtitle: "Delicious recipe",
  },
];

// Categories
const categoriesData = [
  {
    name: "Funny",
    images: ["/images/rambo.png", "/images/captain america.png", "/images/gold.png", "/images/homepic4.png"],
  },
  {
    name: "current Events",
    images: ["/images/homepic5.png", "/images/12.jpg", "/images/homepic7.png", "/images/homepic8.png"],
  },
  {
    name: "News",
    images: ["/images/login_img15.png", "/images/login_img13.png", "/images/homepic9.png", "/images/homepic10.png"],
  },
  {
    name: "Fashion",
    images: ["/images/homepic11.png", "/images/13.jpg", "/images/homepic12.png", "/images/homepic13.png"],
  },
  {
    name: "TEch",
    images: ["/images/homepic20.png", "/images/homepic21.png", "/images/homepic22.png", "/images/homepic23.png"],
  },
  {
    name: "Life",
    images: ["/images/homepic24.png", "/images/homepic25.png", "/images/homepic26.png", "/images/homepic27.png"],
  },
];


  
const Snip = () => {
  return (
    <div>
      <SnipFront />
      
      <MoviesGrid
        title="Top Rated "
        movies={Toprated}
        showProgress={false}
        showViewAllButton={false}
        />
      
       <MoviesGrid
        title="For You"
        movies={ForYouItems}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="Follow More Artists"
        movies={Followartist}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="Top Trending"
        movies={Toptrending}
        showProgress={false}
        showViewAllButton={false}
      />

       <MoviesGrid
        title="Top 10 Snips"
        movies={Topsnips}
        showProgress={false}
        showViewAllButton={false}
      />

      <div className="mt-15 px-4 md:px-5 max-w-15xl mx-auto">
        <CategorySlider 
        categories={categoriesData} 
        mainHeading="Categories" 
        subHeading="" />
      </div>

      <div className="mt-10 px-10 md:px-70 max-w-6xl mx-auto pb-10">
        <Container />
      </div>
    
    </div>
  );
};

export default Snip;
