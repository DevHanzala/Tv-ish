import  { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaVideo,
  FaThumbsUp,
  FaList,
  FaHeart,
  FaHistory,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaUpload,
  FaBars,
  FaTimes,
  FaChartBar,
} from "react-icons/fa";

import { useAuth } from "../hooks/useAuth";
import Notification from "./notification";



const DashboardSidebar = ({
  showSearch = true,
  showUpload = true,
  showNotifications = true,
}) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const {  profile, logout, user } = useAuth();


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotif = () => setNotifOpen(!notifOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Home", icon: <FaHome />, path: "/" },
    { label: "Content", icon: <FaVideo />, path: "/my-videos" },
    { label: "History", icon: <FaHistory />, path: "/history" },
    { label: "Liked Videos", icon: <FaThumbsUp />, path: "/liked" },
    { label: "Playlist", icon: <FaList />, path: "/playlist" },
    { label: "Watch Later", icon: <FaHeart />, path: "/watch-later" },
  ];

  const bottomItems = [
    { label: "Settings", icon: <FaCog />, path: "/settings" },
    { label: "Support", icon: <FaQuestionCircle />, path: "/support" },
    { label: "Plan", icon: <FaChartBar />, path: "/plans" },
    {
      label: "Log out",
      icon: <FaSignOutAlt />,
      path: "/login",
      red: true,
      onClick: async () => {
        await logout();
        navigate("/login");
        setSidebarOpen(false);
      },

    },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-black text-white flex-col z-40 shadow-lg border-r border-gray-800">
        <SidebarContent
          menuItems={menuItems}
          bottomItems={bottomItems}
          profile={profile}
          user={user}
          onItemClick={() => { }}
        />
      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white transform z-50 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        <div className="flex justify-end p-4 border-b border-gray-700">
          <FaTimes
            className="text-xl cursor-pointer hover:text-red-500"
            onClick={toggleSidebar}
          />
        </div>
        <SidebarContent
          menuItems={menuItems}
          bottomItems={bottomItems}
          profile={profile}
          user={user}
        />

      </aside>

      {/* TOPBAR */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black text-white flex items-center justify-between px-4 lg:pl-64 z-30 border-b border-gray-800 shadow">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          {/* HAMBURGER ICON FOR MOBILE */}
          <div className="flex items-center lg:hidden">
            <FaBars
              className="text-xl cursor-pointer hover:text-red-500 transition"
              onClick={toggleSidebar}
            />
          </div>

          {/* SEARCH */}
          {showSearch && (
            <div className="hidden sm:flex items-center bg-gray-800 px-4 py-2 rounded-full border border-gray-700 shadow-inner w-full max-w-sm sm:max-w-md md:max-w-lg xl:max-w-2xl transition-all">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-sm"
              />
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 ml-auto relative" ref={notifRef}>
          {showUpload && (
            <button
              onClick={() => navigate("/uploadvideos")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium shadow-md transition duration-200"
            >
              <FaUpload />
              <span className="hidden sm:inline">Upload</span>
            </button>
          )}

          {/* LIVE STREAM BUTTON */}
          <button
            onClick={() => navigate("/livestream")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium shadow-md transition duration-200"
          >
            <FaVideo />
            <span className="hidden sm:inline">Live Stream</span>
          </button>

          {showNotifications && (
            <div
              className="relative cursor-pointer"
              onClick={toggleNotif}
              aria-haspopup="true"
              aria-expanded={notifOpen}
              title="Notifications"
            >
              <FaBell className="text-xl text-gray-300 hover:text-white transition duration-200" />
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                3
              </span>

              {notifOpen && (
                <div className="absolute right-0 mt-3 w-[360px] max-h-[calc(100vh-80px)] overflow-y-auto z-50">
                  <Notification onClose={() => setNotifOpen(false)} />
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

const SidebarContent = ({ menuItems, bottomItems, profile, user, onItemClick }) => (
  <div className="flex flex-col h-full pt-6 lg:pt-16">
    {/* PROFILE SECTION */}
    <div className="flex flex-col items-center py-2 lg:py-6 border-b border-gray-700">
      <img
 src={
    user?.user_metadata?.avatar_url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email || 'User'}`
  }
        alt="Profile"
        className="w-20 h-20 rounded-full mb-2 border-4 border-red-500 shadow-md"
      />

      <h2 className="text-lg font-semibold">
        {profile?.first_name} {profile?.last_name}
      </h2>

      <p className="text-sm text-gray-400">
        {user?.email}
      </p>
    </div>

    {/* SCROLLABLE MENU */}
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
      <nav className="flex flex-col mt-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition select-none ${isActive
                ? "bg-red-600 text-white"
                : "text-white hover:bg-gray-800"
              }`
            }
            onClick={onItemClick}
          >
            <div className="mr-4 text-lg">{item.icon}</div>
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>

    {/* FIXED BOTTOM LINKS */}
    <div className="border-t border-gray-700 bg-black py-3">
      {bottomItems.map((item) =>
        item.label === "Log out" ? (
          <div
            key={item.label}
            className="flex items-center px-6 py-3 cursor-pointer text-red-500 hover:bg-gray-800 hover:text-red-600 transition"
            onClick={item.onClick}
          >
            <div className="mr-4 text-lg">{item.icon}</div>
            <span className="text-sm">{item.label}</span>
          </div>
        ) : (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition select-none ${isActive
                ? "bg-red-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
            onClick={onItemClick}
          >
            <div className="mr-4 text-lg">{item.icon}</div>
            <span className="text-sm">{item.label}</span>
          </NavLink>
        )
      )}
    </div>
  </div>
);

export default DashboardSidebar;
