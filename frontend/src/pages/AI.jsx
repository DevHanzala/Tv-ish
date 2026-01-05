// src/pages/ai.jsx
import React from 'react';
import FrontAI from '../components/frontAI';
import Container from "../components/banner";    // Assuming Container is in components folder

import MoviesGrid from "../components/MoviesGrid";

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


const AICREATED = [
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


const AIanimated = [
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


const TOPWATCHED = [
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



const AI = () => {
  return (
    <>

      <FrontAI />

      <MoviesGrid
        title="Weekly Top AI Content"
        movies={Weekly}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="Top AI Created Videos"
        movies={AICREATED}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="AI Animated Videos"
        movies={AIanimated}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="TOP WATCHED AI Videos"
        movies={TOPWATCHED}
        showProgress={false}
        showViewAllButton={false}
      />
      
      <div className="mt-10 px-4 md:px-50 max-w-6xl mx-auto pb-10">
        <Container />
      </div>
    </>
  );
};

export default AI;
