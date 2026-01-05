import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaBars, FaTimes, FaSearch, FaUpload, FaBell, FaArrowLeft,
  FaThLarge, FaPlayCircle, FaChartBar, FaUsers,
  FaClosedCaptioning, FaCopyright, FaCog, FaCommentDots
} from 'react-icons/fa';
import Notification from './notification';

const DashboardSidebar2 = ({
  showSearch = true,
  showUpload = true,
  showNotifications = true,
}) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const toggleNotif = () => {
    setNotifOpen(prev => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notifOpen]);

  const menuItems = [
    { label: 'Dashboard', icon: <FaThLarge />, path: '/dashboard' },
    { label: 'Content', icon: <FaPlayCircle />, path: '/my-videos' },
    { label: 'Analytics', icon: <FaChartBar />, path: '/analytics' },
    { label: 'Community', icon: <FaUsers />, path: '/community' },
    { label: 'Subtitles', icon: <FaClosedCaptioning />, path: '/subtitles' },
    { label: 'Copyright', icon: <FaCopyright />, path: '/copyright' },
  ];

  const bottomItems = [
    { label: 'Settings', icon: <FaCog />, path: '/settings' },
    { label: 'Send feedback', icon: <FaCommentDots />, path: '/feedback' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-black text-white flex-col z-40 border-r border-gray-800">
        <SidebarContent
          menuItems={menuItems}
          bottomItems={bottomItems}
          onItemClick={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white transform z-50 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
        aria-label="Mobile sidebar"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>
        <SidebarContent
          menuItems={menuItems}
          bottomItems={bottomItems}
          onItemClick={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black text-white flex items-center z-30 border-b border-gray-800 shadow-md px-4 lg:pl-64">
        {/* Toggle Sidebar Button */}
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl lg:hidden"
            aria-label="Open sidebar"
          >
            <FaBars />
          </button>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="flex-1 mx-4 hidden sm:flex min-w-0">
            <div className="flex items-center bg-gray-800 px-4 py-2 rounded-full border border-gray-700 w-full">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-sm"
              />
            </div>
          </div>
        )}

        {/* Upload & Notifications */}
        <div className="flex items-center gap-3 flex-shrink-0" ref={notifRef}>
          {showUpload && (
            <button
              onClick={() => navigate('/uploadvideos')}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm transition duration-200"
            >
              <FaUpload />
              <span className="hidden sm:inline">Upload</span>
            </button>
          )}

          {showNotifications && (
            <div
              className="relative cursor-pointer"
              onClick={toggleNotif}
              aria-haspopup="true"
              aria-expanded={notifOpen}
              title="Notifications"
            >
              <FaBell className="text-xl text-gray-300 hover:text-white transition duration-200" />
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>

              {notifOpen && (
                <div className="absolute right-0 mt-3 w-64 max-h-[calc(100vh-80px)] overflow-y-auto z-50 bg-white text-black rounded shadow-lg">
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

const SidebarContent = ({ menuItems, bottomItems, onItemClick }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-black text-white relative">
      <button
        onClick={() => {
          onItemClick?.();
          navigate('/dashboardsidebar');
        }}
        className="absolute top-4 left-4 text-white text-xl hover:text-red-500"
        aria-label="Go back"
      >
        <FaArrowLeft />
      </button>

      <div className="flex flex-col items-center py-6 border-b border-gray-700 pt-12">
        <img
          src="https://i.pravatar.cc/100?img=3"
          alt="Profile"
          className="w-20 h-20 rounded-full mb-2 border-4 border-red-600"
        />
        <h2 className="text-lg font-semibold">Brooke Cooper</h2>
        <p className="text-sm text-gray-400">Web Developer</p>
      </div>

      <nav className="flex flex-col flex-grow mt-4 overflow-y-auto">
        {menuItems.map(({ label, icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 space-x-4 text-sm transition-colors ${
                isActive ? 'bg-red-600 text-white' : 'text-white hover:bg-gray-800'
              }`
            }
            onClick={onItemClick}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mb-6">
        {bottomItems.map(({ label, icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 space-x-4 text-sm transition-colors ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
            onClick={onItemClick}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar2;
