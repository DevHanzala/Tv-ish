import React from 'react';
import FrontPodcast from '../components/frontpodcast';
import LatestPodcast from '../components/Latestpodcast';
import WeeklyTopCategory from '../components/podcastcategory';
import MovieBox from "../components/moviebox";
import MoviesGrid from "../components/MoviesGrid";
import FAQ from "../components/FAQ";
import Container from "../components/banner";
import CategorySlider from "../components/CategorySlider";
import TopPodcaster from "../components/toppodcaster"; // adjust path if needed

const promotions = [
  {
    title: "Aguas con los Descuentos",
    image: "/images/Rectangle 150 (1).png",
    
  },
  {
    title: "Combos de Coca-Cola",
    image: "/images/Rectangle 150.png",

  },
  {
    title: "Galletas Marías",
    image: "/images/Rectangle 182.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/Rectangle 183.png",

  },
];

const NewRealease = [
  {
    title: "Aguas con los Descuentos",
    image: "/images/n1.png",
    
  },
  {
    title: "Combos de Coca-Cola",
    image: "/images/n2.png",

  },
  {
    title: "Galletas Marías",
    image: "/images/n3.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/n4.png",

  },
   {
    title: "Galletas Marías",
    image: "/images/n5.png",
 
  },
  {
    title: "Energéticos Volt & Vive",
    image: "/images/n6.png",

  },
   {
    title: "Galletas Marías",
    image: "/images/n2.png",
 
  },

];


const trendingPodcasts = [
  {
    title: "Eps 3: break th...",
    image: "/images/nr1.png",
  },
  {
    title: "Eps 3: stay cal...",
    image: "/images/nr2.png",
  },
  {
    title: "Eps 13: How to",
    image: "/images/nr3.png",
  },
  {
    title: "Eps 40: remembe...",
    image: "/images/nr4.png",
  },
  {
    title: "Eps 5: Stoicism...",
    image: "/images/nr5.png",
  },
  {
    title: "Eps 12: minimal...",
    image: "/images/nr6.png",
  },
  {
    title: "Eps 17: growth...",
    image: "/images/nr7.png",
  },
];

const newEpisodes = [
  {
    title: "Eps 3: break th...",
    channel: "BREAKFAST XONE",
    duration: "23 mnt",
    image: "/images/n1.png",
  },
  {
    title: "Eps 3: stay cal...",
    channel: "Vxone",
    duration: "40 mnt",
    image: "/images/nr1.png",
  },
  {
    title: "Eps 13: How to ...",
    channel: "XONE",
    duration: "32 mnt",
    image: "/images/nr3.png",
  },
  {
    title: "Eps 40: remembe...",
    channel: "XONE",
    duration: "32 mnt",
    image: "/images/n3.png",
  },
  {
    title: "Eps 5: Stoicism...",
    channel: "BREAKFAST XONE",
    duration: "23 mnt",
    image: "/images/n6.png",
  },
  {
    title: "Eps 12: minimal...",
    channel: "Vxone",
    duration: "15 mnt",
    image: "/images/nr6.png",
  },
  {
    title: "Eps 17: growth...",
    channel: "NE Medici",
    duration: "11 mnt",
    image: "/images /n2.png",
  },
];

const podcasterData = [
  {
    id: 1,
    name: 'PODCASMASTER',
    category: 'Story Life',
    podcasts: 102,
    followers: '535K',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    followed: true,
  },
  {
    id: 2,
    name: 'GIRLSPOD',
    category: 'Rimance',
    podcasts: 94,
    followers: '412K',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    followed: false,
  },
  {
    id: 3,
    name: 'AMERICANOPOD',
    category: 'Comedy',
    podcasts: 152,
    followers: '389',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    followed: false,
  },

  {
    id: 4,
    name: 'PODCASMASTER',
    category: 'Story Life',
    podcasts: 102,
    followers: '535K',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    followed: true,
  },
  {
    id: 5,
    name: 'GIRLSPOD',
    category: 'Rimance',
    podcasts: 94,
    followers: '412K',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    followed: false,
  },
  {
    id: 6,
    name: 'AMERICANOPOD',
    category: 'Comedy',
    podcasts: 152,
    followers: '389',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    followed: false,
  },

];





const PodcastPage = () => {
  return (
    <div>
      <FrontPodcast />
      <LatestPodcast />
      <WeeklyTopCategory />

      {/* ✅ Promotions Section */}
      <MoviesGrid
        title="Promotion"
        movies={promotions}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="New Realease"
        movies={NewRealease}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="Trending Podcast"
        movies={trendingPodcasts}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid 
      title="New Episodes" 
      movies={newEpisodes} 
      showProgress={true} 
      showViewAllButton={false} 
      showChannel={true}       // channel show karna hai? 
      showDuration={true}      // duration show karna hai? 
    />

    <TopPodcaster
      podcasters={podcasterData}
      title="Top Podcaster"
      description="Here are the podcasters with the highest followers and viewers. Immediately follow to follow the podcast"
    />

    <div className="mt-10 px-4 md:px-50 max-w-6xl mx-auto pb-10">
        <Container />
      </div>
    </div>
  );
};

export default PodcastPage;
