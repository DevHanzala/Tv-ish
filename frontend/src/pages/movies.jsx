import React from "react";
import MovieBox from "../components/moviebox";
import MoviesGrid from "../components/MoviesGrid";
import FAQ from "../components/FAQ";
import Container from "../components/banner";
import CategorySlider from "../components/CategorySlider"; // ✅ Make sure this is imported

// Featured Movies
const Movies = [
  {
    title: "Avengers : Endgame",
    description:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and restore balance to the universe.",
    image: "/images/Container.png",
  },
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea into a CEO’s mind.",
    image: "/images/14.jpg",
  },
  {
    title: "Interstellar",
    description:
      "A group of explorers travel through a wormhole in space to ensure humanity's survival.",
    image: "/images/15.jpg",
  },
];

// Popular Movies
const popularMovies = [
  { title: "Captain Marvel", image: "/images/captonmarval.png" },
  { title: "Captain America", image: "/images/captain america.png" },
  { title: "Jai Ho Rambo", image: "/images/rambo.png" },
  { title: "Gold", image: "/images/gold.png" },
  { title: "Avengers: Ultron", image: "/images/captain america.png" },
  { title: "Black Panther", image: "/images/12.jpg" },
  { title: "Spider-Man", image: "/images/13.jpg" },
];

// Trending Movies
const Toptrending = [
  {
    title: "Morbius",
    image: "/images/Image (42).png",
    duration: "1h 30min",
    views: "2K",
  },
  {
    title: "Kisi Ka Bhai Kisi Ki Jaan",
    image: "/images/Image (43).png",
    duration: "1h 57min",
    views: "1.5K",
  },
  {
    title: "Suraj Pe Mangal Bhari",
    image: "/images/Image (44).png",
    duration: "2h 10min",
    views: "1.8K",
  },
  {
    title: "Pathaan",
    image: "/images/Image (45).png",
    duration: "2h 20min",
    views: "3K",
  },
  {
    title: "Ant-Man",
    image: "/images/Image (46).png",
    duration: "1h 42min",
    views: "5K",
  },
  {
    title: "Iron Man",
    image: "/images/ironman.jpg",
    duration: "2h 6min",
    views: "4.2K",
  },
  {
    title: "The Dark Knight",
    image: "/images/darkknight.jpg",
    duration: "2h 32min",
    views: "6K",
  },
];

// New Releases
const newReleases = [
  {
    title: "Capton Marvel",
    image: "/images/captonmarval.png",
    releaseDate: "14 April 2026",
    progress: 0.5,
  },
  {
    title: "Pathan",
    image: "/images/Image (45).png",
    releaseDate: "01 Sept 2025",
    progress: 0.3,
  },
];

// Top Rated Movies
const topRatedMovies = [
  {
    title: "Kantara",
    image: "/images/kantara.jpg",
    duration: "1h 57min",
    views: "20K",
    rating: 5,
  },
  {
    title: "Pushpa 2",
    image: "/images/pushpa2.jpg",
    duration: "1h 30min",
    views: "20K",
    rating: 4,
  },
  {
    title: "Blade Runner",
    image: "/images/blade.jpg",
    duration: "1h 42min",
    views: "20K",
    rating: 4,
  },
  {
    title: "Adipurush",
    image: "/images/adipurush.jpg",
    duration: "2h 10min",
    views: "20K",
    rating: 3,
  },
];

// Categories
const categoriesData = [
  {
    name: "Action",
    images: ["/images/rambo.png", "/images/captain america.png", "/images/gold.png", "/images/homepic4.png"],
  },
  {
    name: "Adventure",
    images: ["/images/homepic5.png", "/images/12.jpg", "/images/homepic7.png", "/images/homepic8.png"],
  },
  {
    name: "Comedy",
    images: ["/images/login_img15.png", "/images/login_img13.png", "/images/homepic9.png", "/images/homepic10.png"],
  },
  {
    name: "Drama",
    images: ["/images/homepic11.png", "/images/13.jpg", "/images/homepic12.png", "/images/homepic13.png"],
  },
  {
    name: "Horror",
    images: ["/images/homepic20.png", "/images/homepic21.png", "/images/homepic22.png", "/images/homepic23.png"],
  },
  {
    name: "Sci-Fi",
    images: ["/images/homepic24.png", "/images/homepic25.png", "/images/homepic26.png", "/images/homepic27.png"],
  },
];

// horor zone
const hororzone = [
  { title: "Captain Marvel", image: "/images/captonmarval.png" },
  { title: "Captain America", image: "/images/captain america.png" },
  { title: "Jai Ho Rambo", image: "/images/rambo.png" },
  { title: "Gold", image: "/images/gold.png" },
  { title: "Avengers: Ultron", image: "/images/captain america.png" },
  { title: "Black Panther", image: "/images/12.jpg" },
  { title: "Spider-Man", image: "/images/13.jpg" },
];

const MoviesPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <section className="w-full overflow-hidden">
        <MovieBox
          movies={Movies}
          heading=""
          showArrows={false}
          showViewAllButton={false}
        />
      </section>

      <MoviesGrid
        title="Our Choice"
        movies={popularMovies}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="Trending Now"
        movies={Toptrending}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="New Releases"
        movies={newReleases}
        showProgress={false} // Enable progress bar if you want to show it
        showViewAllButton={false}
      />

      <MoviesGrid
        title="Most - Watch Movies"
        movies={topRatedMovies}
        showViewAllButton={false}
      />

      <div className="mt-15 px-4 md:px-5 max-w-15xl mx-auto">
        <CategorySlider categories={categoriesData} />
      </div>

      <MoviesGrid
        title="Horror zone"
        movies={hororzone}
        showViewAllButton={false}
      />

      <div className="mt-10 px-4 md:px-50 max-w-6xl mx-auto pb-10">
              <Container />
      </div>
      

    </div>
  );
};

export default MoviesPage;
