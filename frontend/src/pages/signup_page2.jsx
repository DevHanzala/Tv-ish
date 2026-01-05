import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChannelContext } from "../context/ChannelContext";

const SignupPage2 = () => {
  const navigate = useNavigate();
  const { signupDraft, setChannel, login } = useContext(ChannelContext);

  const email = signupDraft?.email || "username@gmail.com";
  const DEFAULT_CODE = "123456"; // ✅ Hardcoded OTP

  const [code, setCode] = useState(new Array(6).fill(""));
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const firstInput = document.getElementById("code-0");
    if (firstInput) firstInput.focus();
  }, []);

  const images = Array.from({ length: 15 }, (_, i) => `/images/login_img${i + 1}.png`);
  const imagesToShow = isMobile ? [] : images.slice(0, 10);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleChange = (element, index) => {
    if (!/^\d*$/.test(element.value)) return;
    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);
    if (element.value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      setCode(pasteData.split(""));
      const lastInput = document.getElementById("code-5");
      if (lastInput) lastInput.focus();
    }
  };

  const verifyCode = () => {
    const enteredCode = code.join("");
    if (enteredCode.length < 6) {
      alert("Please enter the complete 6-digit code.");
      return;
    }

    if (enteredCode !== DEFAULT_CODE) {
      alert("Incorrect code. Please try again.");
      return;
    }

    if (!signupDraft) {
      alert("Signup data missing. Please restart registration.");
      navigate("/signup");
      return;
    }

    const newUser = {
      ...signupDraft,
      verified: true,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("tvish-user", JSON.stringify(newUser));
    setChannel(newUser);
    login();

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden">

      {/* Left Side — Logo + Posters */}
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

      {/* Right Side — OTP Form */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 max-w-md mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full">
          <div className="w-full flex justify-between text-sm text-gray-400 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-blue-400 hover:underline"
            >
              <span className="text-lg">&larr;</span> Back
            </button>
            <div className="text-right">
              <p>Step 2 of 2</p>
              <p className="font-semibold text-blue-400">Signup</p>
            </div>
          </div>

          <h2 className="text-red-600 text-3xl font-bold mb-3 text-center sm:text-left">
            Check your Mail
          </h2>

          <p className="text-sm text-gray-300 mb-8 text-center sm:text-left">
            We've sent a 6-digit confirmation code to{" "}
            <span className="text-blue-600 underline">{email}</span>.<br />
            <span className="text-green-400 font-semibold">Dev Note:</span>{" "}
            Use code <span className="text-yellow-400 font-bold">{DEFAULT_CODE}</span> to continue.
          </p>

          <div
            className="grid grid-cols-6 gap-2 sm:gap-4 justify-center mb-8"
            onPaste={handlePaste}
          >
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="w-full h-14 sm:h-16 text-center text-2xl sm:text-3xl rounded-md bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={digit}
                onChange={(e) => handleChange(e.target, idx)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <button
            onClick={verifyCode}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-md font-semibold"
          >
            Verify
          </button>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Didn&apos;t receive code?{" "}
            <button
              onClick={() => alert(`Resend feature coming soon!\nTry using ${DEFAULT_CODE}`)}
              className="text-blue-400 underline hover:text-blue-600"
            >
              Resend Code
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage2;
