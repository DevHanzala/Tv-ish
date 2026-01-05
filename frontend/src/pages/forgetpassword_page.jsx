import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = Array.from({ length: 15 }, (_, i) => `/images/login_img${i + 1}.png`);
  const imagesToShow = isMobile ? [] : images.slice(0, 10); // ❌ hide posters on mobile

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleNext = () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    navigate("/forgetpassword_page2", { state: { email: email.trim() } });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden">
      
      {/* ✅ Left Side — Glowing Logo + Posters (Desktop Only) */}
      <div className="relative md:w-1/2 p-4 flex flex-col items-start overflow-hidden">
        
        {/* ✅ Clickable Logo */}
        <div 
          className="z-50 mt-10 relative cursor-pointer" 
          onClick={() => navigate("/")}
          style={{
            marginLeft: "-12px",  
            transform: "translateY(-10px)",
            width: isMobile ? "150px" : "200px",
            height: isMobile ? "65px" : "85px", 
            filter: isMobile 
              ? `drop-shadow(0 0 4px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))`
              : `drop-shadow(0 0 15px rgba(200, 200, 200, 0.9)) drop-shadow(0 0 30px rgba(180, 180, 180, 0.7)) drop-shadow(0 0 45px rgba(150, 150, 150, 0.5))`,
          }}
        >
          <img
            src="/logo/tv-ish-1.png"
            alt="TV Ish Logo"
            className="object-contain w-full h-full"
          />
        </div>

        {/* ✅ Posters only on desktop */}
        {!isMobile && (
          <>
            <div className="absolute top-[100px] left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />

            <motion.div
              className="grid grid-cols-5 gap-3 relative z-0 overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              aria-label="Login posters gallery"
            >
              {imagesToShow.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Poster ${index + 1}`}
                  className="object-cover rounded-md w-[173.8px] h-[359.67px]"
                  variants={imageVariants}
                  loading="lazy"
                />
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* ✅ Right Side — Forgot Password Form */}
      <motion.div
        className="flex-1 flex items-center justify-center p-6 overflow-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-md space-y-6" role="main">
          
          {/* Top Nav */}
          <div className="w-full flex items-center justify-between text-sm text-gray-300 mb-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              aria-label="Go back to home"
            >
              <span className="text-lg" aria-hidden="true">&larr;</span> Back
            </button>
            <div className="text-right">
              <p className="text-xs text-gray-400">Step 1 of 3</p>
              <p className="font-semibold text-blue-400">Forgot Password</p>
            </div>
          </div>

          {/* Header */}
          <section aria-labelledby="forgot-password-title">
            <h2 id="forgot-password-title" className="text-red-500 text-2xl font-bold">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Enter the email of your account and we will send the email to reset your password.
            </p>
          </section>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              aria-required="true"
              aria-describedby="email-desc"
            />
            <p id="email-desc" className="sr-only">
              Enter the email address associated with your account.
            </p>
          </div>

          {/* Next Button */}
          <button
            className="w-full bg-blue-700 hover:bg-blue-800 transition p-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleNext}
            type="button"
            aria-label="Proceed to next step"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
