import React, { useState, useEffect, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const SignupPage = () => {

  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Form values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Auth context
  const { signupSendOtp } = useAuth();


  // 🔁 Listen for screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 👉 Handle "Continue" button click
  const handleContinue = async () => {
    console.log("🚀 Signup attempt with:", { firstName, lastName, email, phone, password });
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      setLoading(true);
      setError("");

      await signupSendOtp(email, password);
      console.log("✅ OTP sent successfully to:", email);

      // Save draft to sessionStorage
      sessionStorage.setItem(
        "signupDraft",
        JSON.stringify({ email, password, firstName, lastName, phone })
      );
      navigate("/signup_page2"); // ✅ ONLY THIS NAVIGATION
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

// 🎨 Posters array
  const images = Array.from({ length: 15 }, (_, i) => `/images/login_img${i + 1}.png`);
  const imagesToShow = isMobile ? [] : images.slice(0, 10); // Posters hidden on mobile

  // 🎭 Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // 🎭 Image animation variants
  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen md:h-[150vh] bg-black text-white flex flex-col md:flex-row overflow-hidden">
      {/* Left Side — Logo and Posters (Posters only on Desktop) */}
      <div className="relative md:w-1/2 p-4 flex flex-col items-start overflow-hidden">
        <div
          className="z-50 mt-10 relative cursor-pointer"
          onClick={() => navigate("/")}
          style={{
            marginLeft: "-12px",
            transform: "translateY(-10px)",
            width: isMobile ? "150px" : "200px",
            height: isMobile ? "65px" : "85px",
            filter: isMobile
              ? `
                drop-shadow(0 0 4px rgba(255, 255, 255, 0.5)) 
                drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))
              `
              : `
                drop-shadow(0 0 15px rgba(200, 200, 200, 0.9)) 
                drop-shadow(0 0 30px rgba(180, 180, 180, 0.7)) 
                drop-shadow(0 0 45px rgba(150, 150, 150, 0.5))
              `,
          }}
        >
          <img
            src="/logo/tv-ish-1.png"
            alt="TV Ish Logo"
            className="object-contain w-full h-full"
          />
        </div>

        {!isMobile && (
          <>
            <div className="absolute top-[100px] left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />
            <motion.div
              className="grid grid-cols-5 gap-3 relative z-0 overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {imagesToShow.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Poster ${index + 1}`}
                  className="object-cover rounded-md w-[173.8px] h-[359.67px]"
                  variants={imageVariants}
                />
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* Right Side — Signup Form */}
      <motion.div
        className="flex-1 flex items-center justify-center p-6 overflow-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-md space-y-6">
          <div className="w-full flex items-center justify-between text-sm text-gray-300 mb-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-blue-400 hover:underline"
            >
              <span className="text-lg">&larr;</span> Back
            </button>
            <div className="text-right">
              <p className="text-xs text-gray-400">Step 1 of 2</p>
              <p className="font-semibold text-blue-400">Signup</p>
            </div>
          </div>

          <div>
            <h2 className="text-red-500 text-2xl font-bold">Register your account</h2>
            <p className="text-sm text-gray-300 mt-1">
              Fill the details below to submit register account.
            </p>
          </div>

          {/* First & Last Name */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your firstname"
              className="w-full sm:w-1/2 p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Your lastname"
              className="w-full sm:w-1/2 p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
          />

          {/* Phone */}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(+123) 9876543210"
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              className="w-full p-3 pr-12 rounded-md bg-gray-800 border border-gray-700 text-white"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-white"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}


          <p className="text-xs text-gray-400">
            By signing in, you're agree to our{" "}
            <span className="text-blue-400 underline cursor-pointer">Terms & Condition</span> and{" "}
            <span className="text-blue-400 underline cursor-pointer">Privacy Policy.</span>
          </p>
          <button
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 transition p-2 rounded-md disabled:opacity-60"
            onClick={handleContinue}
          >
            {loading ? "Sending Code..." : "Continue"}
          </button>


          <p className="text-center text-sm text-gray-400">
            Already have account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
