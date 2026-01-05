import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-black text-gray-300 overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[75vh] flex flex-col justify-center items-center text-center px-6 pb-10">
        {/* Background gradient + texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#1e1b4b,_#000)]" />
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          {/* 🔵 UPDATED HEADING (BLUE THEME ONLY) */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 via-blue-500 to-white bg-clip-text text-transparent">
            TV-ish Entertainment Inc.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Revolutionizing how the world experiences content — connecting creators, stories, and audiences through a next-generation entertainment platform.
          </p>
        </motion.div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl p-8 shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]"
        >
          <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-red-500 pl-4">
            Our Mission
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            At <strong className="text-blue-400">TV-ish Entertainment Inc.</strong>, our mission is to empower creators and entertain audiences through a unified platform that bridges imagination and innovation. We aim to give storytellers total creative freedom while delivering unforgettable cinematic experiences to viewers everywhere.
          </p>
        </motion.div>
      </section>

      {/* ===== VISION SECTION ===== */}
      <section className="relative py-14 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Vision
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            We envision a world where creativity flows freely — where content transcends borders, cultures, and languages. Our vision is to build the ultimate destination for digital storytelling — a home for filmmakers, musicians, and dreamers who are redefining entertainment for the modern era.
          </p>
        </motion.div>
      </section>

      {/* ===== VALUES SECTION ===== */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4"
        >
          What Drives Us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-7">
          {[
            {
              title: "Creative Freedom",
              desc: "We give creators the power to express without limits — to experiment, inspire, and tell stories the way they’re meant to be told.",
              color: "from-red-500 to-orange-500",
              icon: "🎥",
            },
            {
              title: "Empowerment & Ownership",
              desc: "Creators retain full control of their content — their art, their audience, their earnings. We just give them the stage.",
              color: "from-purple-500 to-pink-500",
              icon: "🚀",
            },
            {
              title: "Excellence in Experience",
              desc: "Our platform is designed for high performance, stunning visuals, and seamless interaction — because great stories deserve great presentation.",
              color: "from-blue-500 to-cyan-500",
              icon: "💎",
            },
            {
              title: "Diversity & Inclusion",
              desc: "We celebrate voices from every culture and background, creating a space where all creators can shine equally.",
              color: "from-emerald-500 to-teal-500",
              icon: "🌍",
            },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative bg-zinc-950 border border-white/10 rounded-xl p-7 shadow-[0_0_20px_-8px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_-8px_rgba(255,255,255,0.3)] transition transform hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${value.color} opacity-10 blur-xl`}
              ></div>
              <div className="relative z-10">
                <h3
                  className={`text-2xl font-semibold mb-2 bg-gradient-to-r ${value.color} bg-clip-text text-transparent flex items-center gap-2`}
                >
                  <span className="text-3xl">{value.icon}</span> {value.title}
                </h3>
                <p className="text-gray-400 text-[15px] leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
