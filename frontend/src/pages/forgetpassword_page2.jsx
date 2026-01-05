import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPasswordPage2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "username@gmail.com";

  const [code, setCode] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/forgetpassword_page");
    }

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    inputsRef.current[0]?.focus();

    return () => window.removeEventListener("resize", handleResize);
  }, [location.state, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(paste)) {
      setCode(paste.split(""));
      inputsRef.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const finalCode = code.join("");
    if (finalCode.length !== 6 || code.includes("")) {
      alert("Please enter the complete 6-digit code.");
      return;
    }

    navigate("/resetpassword_page", { state: { email } });
  };

  const images = Array.from({ length: 15 }, (_, i) => `/images/login_img${i + 1}.png`);
  const imagesToShow = isMobile ? [] : images.slice(0, 10); // ❌ Hide posters on mobile

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden">
      
      {/* ✅ Left: Glowing Clickable Logo + Posters (desktop only) */}
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

        {/* ✅ Posters Grid (desktop only) */}
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
                  loading="lazy"
                />
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* ✅ Right: OTP Form */}
      <motion.div
        className="flex-1 flex items-center justify-center p-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-md space-y-6 text-center">
          
          {/* Top Nav */}
          <div className="flex justify-between items-start text-sm text-gray-300">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-blue-400 hover:underline"
            >
              <span className="text-lg">&larr;</span> Back
            </button>
            <div className="text-right">
              <p className="text-xs text-gray-400">Step 2 of 3</p>
              <p className="font-semibold text-white">Forgot Password</p>
            </div>
          </div>

          {/* Header */}
          <h2 className="text-red-500 text-2xl font-bold">Check your Mail</h2>
          <p className="text-sm text-gray-300">
            We've sent a 6-digit confirmation code to{" "}
            <span className="text-blue-400">{email}</span>. Make sure you enter the correct code.
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mt-4" onPaste={handlePaste}>
            {code.map((value, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-14 text-2xl text-center font-bold rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition p-3 rounded-md font-semibold"
          >
            Next
          </button>

          {/* Resend / Try Different Email */}
          <p className="text-xs text-gray-400 mt-4">
            Didn’t receive any email? Check in spam or <br />
            <button
              onClick={() => navigate("/forgetpassword_page")}
              className="text-blue-400 underline hover:text-blue-500"
            >
              Try another email address
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage2;
