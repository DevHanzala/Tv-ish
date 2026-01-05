import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    { title: "Home", items: ["Categories", "FAQ"], link: "/home_page" },
    { title: "Movies", items: ["Genres", "Trending", "New Release", "Popular"], link: "/movies" },
    { title: "Shows", items: ["Genres", "Trending", "New Release", "Popular"], link: "/tvshows" },
    { title: "Podcast", items: ["Latest Podcast", "New Release", "Trending", "Popular"], link: "/podcast" },
    { title: "Snips", items: ["Top Rated", "For You", "Popular"], link: "/snips" },
    { title: "Music", items: ["Weekly Top Song", "New Released song", "Playlist"], link: "/music" },
    { title: "Education", items: ["Trending subject", "Popular Educators"], link: "/education" },
    { title: "Sports", items: ["Popular Activity", "Feature Event", "Trending Sports Event"], link: "/sports" },
    { title: "AI", items: ["Weekly Top AI Content", "Top AI Created Vedio"], link: "/ai" },
    { title: "Support", items: ["Contact Us", "About Us"], link: "/support" },
    { title: "Subscription", items: ["How we work", "Features"], link: "/plans" },
  ];

  const handleFAQClick = () => {
    if (location.pathname !== "/home_page") {
      navigate("/home_page", { state: { scrollToFAQ: true } });
    } else {
      const faqEl = document.getElementById("faq");
      if (faqEl) faqEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-zinc-900 text-white py-8 px-3 sm:py-10 sm:px-10 text-xs sm:text-sm mt-10 mb-20">
      <div className="max-w-7xl mx-auto">
        {/* Top grid links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">
                <Link to={section.link} className="hover:text-white transition cursor-pointer">
                  {section.title}
                </Link>
              </h4>
              <ul className="space-y-1 text-zinc-400">
                {section.items.map((item, index) => (
                  <li key={index} className="hover:text-white transition cursor-pointer">
                    {section.title === "Home" && item === "FAQ" ? (
                      <span onClick={handleFAQClick}>{item}</span>
                    ) : section.title === "Support" && item !== "About Us" ? (
                      <Link to="/support" className="hover:text-white transition cursor-pointer">
                        {item}
                      </Link>
                    ) : item === "About Us" ? (
                      <Link to="/aboutus" className="hover:text-white transition cursor-pointer">
                        {item}
                      </Link>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <motion.div
          className="mt-6 sm:mt-10 flex items-center flex-wrap gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.span
            className="text-xs sm:text-sm font-semibold text-white cursor-default"
            whileHover={{ color: "#60A5FA" }}
            transition={{ duration: 0.3 }}
          >
            Connect With Us
          </motion.span>

          <div className="flex gap-2 sm:gap-3">
            <motion.a
              href="#"
              aria-label="Facebook"
              className="p-1.5 sm:p-2 bg-zinc-800 rounded hover:bg-[#1877F2] text-white transition duration-300"
              whileHover={{ scale: 1.15 }}
            >
              <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>

            <motion.a
              href="#"
              aria-label="Twitter"
              className="p-1.5 sm:p-2 bg-zinc-800 rounded hover:bg-[#1DA1F2] text-white transition duration-300"
              whileHover={{ scale: 1.15 }}
            >
              <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>

            <motion.a
              href="#"
              aria-label="LinkedIn"
              className="p-1.5 sm:p-2 bg-zinc-800 rounded hover:bg-[#0077B5] text-white transition duration-300"
              whileHover={{ scale: 1.15 }}
            >
              <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom links */}
        <div className="mt-6 sm:mt-8 border-t border-zinc-700 pt-3 sm:pt-4 text-xs sm:text-sm flex flex-col sm:flex-row justify-between text-zinc-400">
          <p>©2025 TV-ish Entertainment, All Rights Reserved</p>
          <div className="flex space-x-3 mt-2 sm:mt-0">
            {["Terms of Use", "Privacy Policy", "Cookie Policy"].map((link, idx) => (
              <a key={idx} href="#" className="hover:text-blue-400 transition duration-200">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
