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
import SnipFront from '../components/snipfront';
import MusicFront from '../components/musicfront'; 
import TrendingDJ from '../components/trendingDJ';


const Weekly = [
  {
    title: "Aguas con los Descuentos",
    image: "/images/f1.png",
    
  },
  {
    title: "Combos de Coca-Cola",
    image: "/images/f2.png",

  },
  {
    title: "Galletas Marías",
    image: "/images/f3.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/f4.png",

  },

   {
    title: "Galletas Marías",
    image: "/images/f5.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/f6.png",

  },
];

const NewRealease = [
  {
    title: "Aguas con los Descuentos",
    image: "/images/f1.png",
    
  },
  {
    title: "Combos de Coca-Cola",
    image: "/images/f2.png",

  },
  {
    title: "Galletas Marías",
    image: "/images/f3.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/f4.png",

  },

   {
    title: "Galletas Marías",
    image: "/images/f5.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/f6.png",

  },
];

const top10musicvedios = [
  {
    title: "Aguas con los Descuentos",
    image: "/images/f1.png",
    
  },
  {
    title: "Combos de Coca-Cola",
    image: "/images/f2.png",

  },
  {
    title: "Galletas Marías",
    image: "/images/f3.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/f4.png",

  },

   {
    title: "Galletas Marías",
    image: "/images/f5.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/f6.png",

  },
];

const Top10DJshows = [
  {
    title: "Aguas con los Descuentos",
    image: "/images/f1.png",
    
  },
  {
    title: "Combos de Coca-Cola",
    image: "/images/f2.png",

  },
  {
    title: "Galletas Marías",
    image: "/images/f3.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/f4.png",

  },

   {
    title: "Galletas Marías",
    image: "/images/f5.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/f6.png",

  },
];

const trendingmusic = [
  {
    title: "Aguas con los Descuentos",
    image: "/images/f1.png",
    
  },
  {
    title: "Combos de Coca-Cola",
    image: "/images/f2.png",

  },
  {
    title: "Galletas Marías",
    image: "/images/f3.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/f4.png",

  },

   {
    title: "Galletas Marías",
    image: "/images/f5.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/f6.png",

  },
];



const Music = () => {
  return (
    <div>
      <MusicFront />

      <MoviesGrid
        title="Weekly Top songs"
        movies={Weekly}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="New Release Songs"
        movies={NewRealease}
        showProgress={false}
        showViewAllButton={false}
      />

      
      <MoviesGrid
        title="Top 10 Music Videos"
        movies={top10musicvedios}
        showProgress={false}
        showViewAllButton={false}
      />

      
      <MoviesGrid
        title="Top 10 DJ SHOW"
        movies={Top10DJshows}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="Trending Music Videos"
        movies={trendingmusic}
        showProgress={false}
        showViewAllButton={false}
      />

      <TrendingDJ/>

      <div className="mt-10 px-4 md:px-50 max-w-6xl mx-auto pb-10">
              <Container />
      </div>

    </div>
  );
};

export default Music;
