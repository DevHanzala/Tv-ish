import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaPlayCircle,
  FaChartBar,
  FaUsers,
  FaClosedCaptioning,
  FaCopyright,
  FaCog,
  FaBars,
  FaTimes,
  FaSearch,
  FaUpload,
  FaBell,
  FaArrowLeft,
  FaPencilAlt,
  FaSignOutAlt,
  FaClock,
  FaVideo,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";


const DashboardSidebar2 = ({
  showSearch = true,
  showUpload = true,
  showNotifications = true,
}) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {profile, logout } = useContext(AuthContext);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const menuItems = [
    { label: "Dashboard", icon: <FaThLarge />, path: "/dashboard" },
    { label: "Content", icon: <FaPlayCircle />, path: "/my-videos" },
    { label: "Analytics", icon: <FaChartBar />, path: "/analytics" },
    { label: "Community", icon: <FaUsers />, path: "/community" },
    { label: "Subtitles", icon: <FaClosedCaptioning />, path: "/subtitles" },
    { label: "Copyright", icon: <FaCopyright />, path: "/copyright" },
    { label: "Customization", icon: <FaPencilAlt />, path: "/customization" },
  ];

  const bottomItems = [
    { label: "Settings", icon: <FaCog />, path: "/settings" },
    { label: "News", icon: <FaClock />, path: "/news" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-black text-white flex-col z-40 shadow-lg border-r border-gray-800">
        <SidebarContent
          menuItems={menuItems}
          bottomItems={bottomItems}
          onItemClick={() => setSidebarOpen(false)}
          onLogout={handleLogout}
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
          onItemClick={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />

      </aside>

      {/* TOPBAR */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black text-white flex items-center justify-between px-4 lg:pl-64 z-30 border-b border-gray-800 shadow">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 w-full">
          {/* MOBILE MENU ICON */}
          <div className="flex items-center lg:hidden">
            <FaBars
              className="text-xl cursor-pointer hover:text-red-500 transition"
              onClick={toggleSidebar}
            />
          </div>

          {/* SEARCH BAR */}
          {showSearch && (
            <div className="flex items-center bg-gray-800 px-3 py-2 rounded-full border border-gray-700 shadow-inner w-full max-w-[230px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl transition-all">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-sm"
              />
            </div>
          )}
        </div>

        {/* RIGHT SECTION: Upload + Live Stream + Notifications */}
        <div className="flex items-center gap-2 ml-auto flex-nowrap">
          {/* INLINE BUTTONS */}
          {showUpload && (
            <>
              <button
                onClick={() => navigate("/uploadvideos")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium shadow-md transition duration-200 whitespace-nowrap"
              >
                <FaUpload />
                <span className="hidden sm:inline">Upload</span>
              </button>

              <button
                onClick={() => navigate("/livestream")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium shadow-md transition duration-200 whitespace-nowrap"
              >
                <FaVideo />
                <span className="hidden sm:inline">Live Stream</span>
              </button>
            </>
          )}

          {showNotifications && (
            <div
              className="relative cursor-pointer"
              onClick={() => { }}
              aria-haspopup="true"
              title="Notifications"
            >
              <FaBell className="text-xl text-gray-300 hover:text-white transition duration-200" />
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                3
              </span>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

const SidebarContent = ({ menuItems, bottomItems, profile, onItemClick, onLogout }) => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full pt-16">
      {/* BACK BUTTON */}
      <button
        onClick={() => {
          onItemClick?.();
          navigate("/history");
        }}
        className="absolute top-4 left-4 text-white text-xl hover:text-red-500 transition"
        aria-label="Go back"
      >
        <FaArrowLeft />
      </button>

      {/* PROFILE SECTION */}
      <div className="flex flex-col items-center py-6 border-b border-gray-700">
        <img
          src={profile?.avatar_url || "https://i.pravatar.cc/100?img=3"}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-red-600 shadow"
        />

        <h2 className="text-lg font-semibold mt-2">
          {profile?.first_name} {profile?.last_name}
        </h2>

        <p className="text-sm text-gray-400">
          {profile?.email}
        </p>

      </div>

      {/* SCROLLABLE MENU SECTION */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
        <nav className="flex flex-col mt-2">
          {menuItems.map(({ label, icon, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 transition select-none ${isActive
                  ? "bg-red-600 text-white"
                  : "text-white hover:bg-gray-800"
                }`
              }
              onClick={onItemClick}
            >
              <div className="mr-4 text-lg">{icon}</div>
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* BOTTOM LINKS + LOGOUT */}
      <div className="border-t border-gray-700 bg-black py-3">
        {bottomItems.map(({ label, icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition select-none ${isActive
                ? "bg-red-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
            onClick={onItemClick}
          >
            <div className="mr-4 text-lg">{icon}</div>
            <span className="text-sm">{label}</span>
          </NavLink>
        ))}

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => {
            onLogout();
            onItemClick();
          }}
          className="flex items-center px-6 py-3 space-x-4 text-sm font-medium text-red-500 hover:bg-gray-800 hover:text-red-600 w-full"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar2;
