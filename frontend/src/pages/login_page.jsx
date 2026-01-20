import React, { useState, useEffect, useContext } from "react";
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const LoginPage = () => {

  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [email, setEmail] = useState("");      // We'll treat this as the "user id"
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Auth context
  const { login, socialLogin } = useAuth();

  // 🔁 Listen for screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🎞️ Posters array
  const images = Array.from({ length: 15 }, (_, i) => `/images/login_img${i + 1}.png`);

  // 👉 Handle Login
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await login({ email, password, remember: rememberMe });
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden relative">
      {/* LEFT SIDE — Posters + Logo */}
      <div className="relative md:w-1/2 p-4 flex flex-col items-start overflow-hidden">
        {/* Clickable Logo */}
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

        {/* Gradient Overlays */}
        <div className="absolute top-[100px] left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />

        {/* Poster Grid */}
        {!isMobile && (
          <div className="grid gap-3 relative z-10 overflow-hidden grid-cols-5">
            {images.slice(0, 10).map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Poster ${index + 1}`}
                className="object-cover rounded-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                style={{
                  width: "173.8px",
                  height: "359.67px",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE — Login Form */}
      <motion.div
        className="flex-1 flex items-center justify-center p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-red-500 text-2xl font-bold">Welcome</h2>
          <p className="text-sm text-white">Login to continue</p>

          {/* User ID Input (Email field renamed for clarity) */}
          <input
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
          />

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-12 rounded-md bg-gray-800 border border-gray-700 text-white"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-white"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEye className="text-lg" /> : <FaEyeSlash className="text-lg" />}
            </button>
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between text-sm text-gray-400">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-red-500"
              />
              <span>Remember Me</span>
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgetpassword_page")}
              className="text-blue-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-blue-700 hover:bg-blue-800 transition p-2 rounded-md disabled:opacity-50"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>


          {/* Signup Link */}
          <p className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup_page")}
              className="text-blue-400 hover:underline"
              type="button"
            >
              Signup
            </button>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-600" />
            <span className="text-xs text-gray-400">or continue with</span>
            <hr className="flex-1 border-gray-600" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-6">
            <motion.div whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}>
              <FaFacebook
                className="text-3xl cursor-pointer hover:text-blue-500"
                onClick={() => socialLogin("facebook")}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}>
              <FaGoogle
                className="text-3xl cursor-pointer hover:text-red-500"
                onClick={() => socialLogin("google")}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}>
              <FaLinkedin
                className="text-3xl cursor-pointer hover:text-blue-400"
                onClick={() => socialLogin("linkedin_oidc")}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
