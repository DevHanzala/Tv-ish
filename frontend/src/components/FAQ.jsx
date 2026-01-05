import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const faqs = [
  {
    id: 1,
    question: "Is all the content free to watch?",
    answer:
      "Yes! All movies, shows, podcasts, and music on our platform are completely free to stream anytime, anywhere.",
  },
  {
    id: 2,
    question: "Can I use the service on mobile devices and smart TVs?",
    answer:
      "Absolutely! You can stream content on any device including smartphones, tablets, smart TVs, and more.",
  },
  {
    id: 3,
    question: "Can I create my own watchlist?",
    answer:
      "Yes, you can create and manage your own watchlist to keep track of movies and shows you want to watch.",
  },
  {
    id: 4,
    question: "Do you offer original podcasts and music?",
    answer:
      "Yes, we offer a wide range of original podcasts and music exclusive to our platform.",
  },
  {
    id: 5,
    question: "Is there a subscription or signup required?",
    answer:
      "No subscription or signup is required. All content is free and available to watch instantly.",
  },
  {
    id: 6,
    question: "Can I stream on multiple devices with one account?",
    answer:
      "Yes, you can stream on multiple devices simultaneously with a single account.",
  },
  {
    id: 7,
    question: "Can I download content to watch offline?",
    answer:
      "Currently, downloading content for offline viewing is not supported.",
  },
  {
    id: 8,
    question: "Do you offer kids-friendly content?",
    answer:
      "Yes, we provide a selection of kids-friendly content suitable for all ages.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(1);
  const navigate = useNavigate();

  const toggleFAQ = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  const handleNavigateToSupport = () => {
    navigate("/support");
    window.scrollTo(0, 0); // ✅ Scroll to top when navigating
  };

  return (
    <div className="min-h-screen bg-black text-white select-none px-6 py-10 max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Heading and Ask a Question button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <button
            onClick={handleNavigateToSupport}
            className="bg-blue-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded whitespace-nowrap"
          >
            Ask a Question
          </button>
        </div>

        <p className="text-gray-400 mb-6 text-sm max-w-xl">
          Got questions? We've got answers! Check out our FAQ section to find
          answers to the most common questions about StreamVibe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {faqs.map(({ id, question, answer }, idx) => (
            <div
              key={id}
              className={`pb-6 ${
                idx !== faqs.length - 1 ? "border-b border-red-700/30" : ""
              }`}
            >
              <button
                onClick={() => toggleFAQ(id)}
                className="flex items-center justify-between w-full text-left font-medium hover:text-red-600 transition"
              >
                <div className="flex items-center gap-5">
                  <div className="bg-gray-900 rounded-lg w-10 h-10 flex items-center justify-center font-mono text-sm text-gray-400 select-none">
                    {id.toString().padStart(2, "0")}
                  </div>
                  <span>{question}</span>
                </div>

                <div className="text-3xl font-bold select-none">
                  {openId === id ? "−" : "+"}
                </div>
              </button>

              {openId === id && (
                <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-prose">
                  {answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
