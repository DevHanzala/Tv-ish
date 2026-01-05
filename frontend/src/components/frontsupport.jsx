import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FrontSupport = () => {
  const images = [
    "/images/homepic1.png",
    "/images/homepic2.png",
    "/images/homepic3.png",
    "/images/homepic4.png",
    "/images/homepic5.png",
    "/images/homepic7.png",
    "/images/homepic8.png",
    "/images/homepic9.png",
    "/images/homepic10.png",
    "/images/homepic11.png",
    "/images/homepic12.png",
    "/images/homepic13.png",
    "/images/homepic14.png",
    "/images/homepic15.png",
    "/images/homepic16.png",
    "/images/homepic17.png",
    "/images/homepic18.png",
    "/images/homepic19.png",
    "/images/homepic20.png",
    "/images/homepic21.png",
  ];

  const [phone, setPhone] = React.useState("");

  return (
    <div
      className="min-h-screen bg-black text-white 
                 flex flex-col md:flex-row 
                 justify-center items-start 
                 px-4 sm:px-6 md:px-10 
                 pt-16 md:pt-20 pb-12 gap-10 relative"
    >
      {/* ================= STYLES ================= */}
      <style>{`
        .react-tel-input .form-control {
          background-color: #1e1e1e !important;
          color: white !important;
          border: 1px solid #444 !important;
          border-radius: 0.375rem !important;
          padding-left: 3.5rem !important;
          height: 2.5rem !important;
          width: 100% !important;
        }
        .react-tel-input .selected-flag {
          background-color: #1e1e1e !important;
          border: 1px solid #dc2626 !important;
        }
        .react-tel-input .country-list {
          background-color: #000 !important;
          color: white !important;
        }

        @keyframes verticalScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        .animate-vertical-scroll {
          animation: verticalScroll 18s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-vertical-scroll {
            animation-duration: 14s;
          }
        }
      `}</style>

      {/* ================= LEFT SECTION ================= */}
      <div className="md:w-1/2 w-full space-y-6 relative z-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to our support page!
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            We're here to help you with any problems you may be having with our product.
          </p>
        </div>

        {/* IMAGE BOX */}
        <div
          className="bg-[#1e1e1e] p-5 rounded-xl overflow-hidden relative
                     w-full md:w-[533px]
                     max-h-[360px] md:max-h-none md:h-[477px]
                     md:mb-[-100px]"
        >
          <div className="grid grid-cols-4 gap-2 animate-vertical-scroll">
            {[...images, ...images].map((img, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden"
                style={{ width: "100%", aspectRatio: "3 / 4" }}
              >
                <img
                  src={img}
                  alt={`img-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div
        className="md:w-1/2 w-full bg-[#111] 
                   p-4 sm:p-5 md:p-6 
                   rounded-lg shadow-md 
                   flex flex-col justify-start z-10
                   mt-6 md:mt-[120px]"
      >
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">First Name</label>
              <input type="text" className="w-full p-2 rounded bg-[#1e1e1e] border border-gray-700" />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Last Name</label>
              <input type="text" className="w-full p-2 rounded bg-[#1e1e1e] border border-gray-700" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Email</label>
              <input type="email" className="w-full p-2 rounded bg-[#1e1e1e] border border-gray-700" />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Phone Number</label>
              <PhoneInput country="us" value={phone} onChange={setPhone} containerClass="w-full" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea rows="4" className="w-full p-2 rounded bg-[#1e1e1e] border border-gray-700" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-red-600" />
            <span className="text-sm text-gray-400">
              I agree with Terms of Use and Privacy Policy
            </span>
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default FrontSupport;
