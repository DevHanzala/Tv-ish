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
import EducationFront from '../components/educationfront';

const subject = [
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

const populareducaters = [
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

const trengingsubject = [
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

const Education = () => {
  return (
    <div>
      <EducationFront />
      
      {/* Added top padding here */}
      <div className="pt-8">
        <MoviesGrid
          title="Trending Subject"
          movies={trengingsubject}
          showProgress={false}
          showViewAllButton={false}
        />
      </div>

      <MoviesGrid
        title="Popular Educators"
        movies={populareducaters}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="Subjects"
        movies={subject}
        showProgress={false}
        showViewAllButton={false}
      />

      <div className="mt-10 px-4 md:px-50 max-w-6xl mx-auto pb-10">
        <Container />
      </div>
    </div>
  );
};

export default Education;
