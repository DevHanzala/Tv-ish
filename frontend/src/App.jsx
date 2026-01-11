import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Import your Context Providers
// import { UserProvider } from "./context/UserContext";      // assuming these exist
// import { VideoProvider } from "./context/VideoContext";    // assuming these exist
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./guards/AuthGuard";

// Page Components
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./pages/footer";
import NavbarPage from "./pages/navbar_page";
import LoginPage from "./pages/login_page";
import SignupPage from "./pages/signup_page";
import SignupPage2 from "./pages/signup_page2";
import ForgotPasswordPage from "./pages/forgetpassword_page";
import ForgotPasswordPage2 from "./pages/forgetpassword_page2";
import ForgotPasswordPage3 from "./pages/forgetpassword_page3";
import HomePage from "./pages/home_page";
import MoviesPage from "./pages/movies";
import TVSHOWSPAGE from "./pages/tvshows";
import PodcastPage from "./pages/podcast";
import Snip from "./pages/snips";
import Music from "./pages/music";
import Education from "./pages/education";
import Sports from "./pages/sports";
import Support from "./pages/support";
import Notification from "./components/notification";

// Dashboard Pages
import Dashboard from "./pages/dashboard";
import MyVideos from "./components/my-videos";
import Liked from "./pages/liked";
import Playlist from "./pages/playlist";
import WatchLater from "./pages/watch-later";
import History from "./pages/history";
import Settings from "./pages/settings";

// Layout Components
import DashboardSidebar from "./components/dashboard_sidebar";
import DashboardSidebar2 from "./components/dashboard_sidebar2"; // New sidebar import

import ProfileInfo from "./components/ProfileInfo";
import EmailAddress from "./components/EmailAddress";
import NotificationPreferences from "./components/NotificationPreferences";
import ChangePassword from "./components/ChangePassword";
import TwoFactorAuthentication from "./components/TwoFactorAuth";
import LanguagePreferences from "./components/LanguagePreferences";
import NameEdit from "./components/nameedit";
import AccountOwnership from "./components/accountownership";
import EmailNotification from "./components/emailnotification";
import UploadVideos from "./components/uploadvideos";
import AI from "./pages/AI";
import SnipsOpen from "./pages/snips_open";
import VideoFeed from "./components/VideoFeed";


// Import the new ReelScroller component
import ReelScroller from "./components/ReelScroller";
import PlansPage from "./pages/plans";
import UploadVideos2 from "./components/uploadvideos2";
import UploadVideos3 from "./components/uploadvideos3";
import UploadVideos4 from "./components/uploadvideos4";
import UploadVideos5 from "./components/uploadvideos5";
import Monetization from "./components/Monetization";
import Livestream from "./components/livestream";


import { UploadProvider } from "./context/UploadContext";



import dashboard_sidebar from "./components/dashboard_sidebar";
import Analytics from "./pages/analytics";
import Community from "./pages/community";
import Subtitles from "./pages/subtitles";
import Copyright from "./pages/copyright";
import Copyrightform from "./components/copyrightform";
import Customization from "./pages/customization";
import SearchBar from "./components/SearchBar";
import News from "./pages/news";


import Content from "./components/Content";
import Trend from "./components/Trend";
import Audience from "./components/Audience";


import AboutUs from "./pages/aboutus";


// ✅ Layout Wrapper Component
const MainLayout = ({ children }) => {
  const location = useLocation();

  // Routes where Navbar and Footer should be hidden
  const hideLayoutPaths = [
    "/login",
    "/signup_page",
    "/signup_page2",
    "/forgetpassword_page",
    "/forgetpassword_page2",
    "/resetpassword_page",
    "/my-videos",
    "/my-vedio",          // added for Sidebar2
    "/liked",
    "/playlist",
    "/watch-later",
    "/history",
    "/settings",
    "/dashboard",
    "/ProfileInfo",
    "/EmailAddress",
    "/NotificationPreferences",
    "/PrivacyControls",
    "/ChangePassword",
    "/TwoFactorAuth",
    "/LanguagePreferences",
    "/ThemePreferences",
    "/BlockedUsers",
    "/nameedit",
    "/accountownership",
    "/emailnotification",
    "/uploadvideos",
    // "/notification",
    "/snips_open",
    // "/VideoFeed",
    //"/plans",
    "/analytics",
    "/community",
    "/subtitles",
    "/copyright",
    "/copyrightform",
    "/customization",
    "/news",
    "/uploadvideos2",
    "/uploadvideos3",
    "/uploadvideos4",
    "/uploadvideos5",
    "/Monetization",
    "/livestream",
  ];

  // Hide Navbar/Footer if current path matches hide list or dashboard subroutes
  const shouldHideLayout =
    hideLayoutPaths.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard");

  // Show Sidebar on dashboard and dashboard-related pages (old sidebar)
  const shouldShowSidebar =
    location.pathname.startsWith("/liked") ||
    location.pathname.startsWith("/playlist") ||
    location.pathname.startsWith("/watch-later") ||
    location.pathname.startsWith("/history") ||
    location.pathname.startsWith("/settings") ||
    location.pathname.startsWith("/ProfileInfo") ||
    location.pathname.startsWith("/EmailAddress") ||
    location.pathname.startsWith("/NotificationPreferences") ||
    location.pathname.startsWith("/ChangePassword") ||
    location.pathname.startsWith("/TwoFactorAuth") ||
    location.pathname.startsWith("/LanguagePreferences") ||
    location.pathname.startsWith("/nameedit") ||
    location.pathname.startsWith("/accountownership") ||
    location.pathname.startsWith("/emailnotification") ||
    location.pathname.startsWith("/uploadvideos") ||
    location.pathname.startsWith("/uploadvideos2") ||
    location.pathname.startsWith("/uploadvideos3") ||
    location.pathname.startsWith("/uploadvideos4") ||
    location.pathname.startsWith("/uploadvideos5") ||
    location.pathname.startsWith("/Monetization") ||
    location.pathname.startsWith("/livestream");


  // Show Sidebar2 on specific pages (new sidebar)
  const shouldShowSidebar2 =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/my-videos") || // add more paths here if needed
    location.pathname.startsWith("/analytics") ||
    location.pathname.startsWith("/community") ||
    location.pathname.startsWith("/subtitles") ||
    location.pathname.startsWith("/copyright") ||
    location.pathname.startsWith("/copyrightform") ||
    location.pathname.startsWith("/customization") ||
    location.pathname.startsWith("/news");  // new route with Sidebar2

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Conditional Navbar */}
      {!shouldHideLayout && <NavbarPage />}

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Sidebar - old sidebar */}
        {shouldShowSidebar && (
          <div className="w-full lg:w-64 flex-shrink-0 bg-gray-900 border-r border-gray-700 overflow-y-auto">
            <DashboardSidebar />
          </div>
        )}

        {/* Sidebar2 - new sidebar */}
        {shouldShowSidebar2 && (
          <div className="w-full lg:w-64 flex-shrink-0 bg-gray-800 border-r border-gray-600 overflow-y-auto">
            <DashboardSidebar2 />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow w-full p-0">{children}</main>
      </div>

      {/* Conditional Footer */}
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

// ✅ App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <UploadProvider>     {/* <-- UPLOAD CONTEXT WRAPPED HERE */}
          <ScrollToTop />
          <MainLayout>
            <Routes>

              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/tvshows" element={<TVSHOWSPAGE />} />
              <Route path="/podcast" element={<PodcastPage />} />
              <Route path="/snips" element={<Snip />} />
              <Route path="/music" element={<Music />} />
              <Route path="/education" element={<Education />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/support" element={<Support />} />
              <Route path="/snips_open" element={<SnipsOpen />} />

              <Route path="/searchBar" element={<SearchBar />} />

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup_page" element={<SignupPage />} />
              <Route path="/signup_page2" element={<SignupPage2 />} />
              <Route path="/forgetpassword_page" element={<ForgotPasswordPage />} />
              <Route path="/forgetpassword_page2" element={<ForgotPasswordPage2 />} />
              <Route path="/resetpassword_page" element={<ForgotPasswordPage3 />} />

              {/* Navbar test route */}
              <Route path="/navbar" element={<NavbarPage />} />

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
              <Route path="/my-videos" element={<AuthGuard><MyVideos /></AuthGuard>} />
              <Route path="/my-vedio" element={<AuthGuard><MyVideos /></AuthGuard>} />
              <Route path="/liked" element={<AuthGuard><Liked /></AuthGuard>} />
              <Route path="/playlist" element={<AuthGuard><Playlist /></AuthGuard>} />
              <Route path="/watch-later" element={<AuthGuard><WatchLater /></AuthGuard>} />
              <Route path="/history" element={<AuthGuard><History /></AuthGuard>} />
              <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
              <Route path="/ProfileInfo" element={<AuthGuard><ProfileInfo /></AuthGuard>} />
              <Route path="/EmailAddress" element={<AuthGuard><EmailAddress /></AuthGuard>} />
              <Route path="/NotificationPreferences" element={<AuthGuard><NotificationPreferences /></AuthGuard>} />
              <Route path="/ChangePassword" element={<AuthGuard><ChangePassword /></AuthGuard>} />
              <Route path="/TwoFactorAuth" element={<AuthGuard><TwoFactorAuthentication /></AuthGuard>} />
              <Route path="/LanguagePreferences" element={<AuthGuard><LanguagePreferences /></AuthGuard>} />
              <Route path="/nameedit" element={<AuthGuard><NameEdit /></AuthGuard>} />
              <Route path="/AccountOwnership" element={<AuthGuard><AccountOwnership /></AuthGuard>} />
              <Route path="/emailnotification" element={<AuthGuard><EmailNotification /></AuthGuard>} />

              {/* Upload */}
              <Route path="/uploadvideos" element={<AuthGuard><UploadVideos /></AuthGuard>} />
              <Route path="/uploadvideos2" element={<AuthGuard><UploadVideos2 /></AuthGuard>} />
              <Route path="/uploadvideos3" element={<AuthGuard><UploadVideos3 /></AuthGuard>} />
              <Route path="/uploadvideos4" element={<AuthGuard><UploadVideos4 /></AuthGuard>} />
              <Route path="/uploadvideos5" element={<AuthGuard><UploadVideos5 /></AuthGuard>} />
              <Route path="/Monetization" element={<AuthGuard><Monetization /></AuthGuard>} />
              <Route path="/notification" element={<AuthGuard><Notification /></AuthGuard>} />
              <Route path="/AI" element={<AuthGuard><AI /></AuthGuard>} />
              <Route path="/VideoFeed" element={<AuthGuard><VideoFeed /></AuthGuard>} />
              <Route path="/plans" element={<AuthGuard><PlansPage /></AuthGuard>} />

              <Route path="/dashboard_sidebar" element={<AuthGuard><DashboardSidebar /></AuthGuard>} />
              <Route path="/analytics" element={<AuthGuard><Analytics /></AuthGuard>} />
              <Route path="/Content" element={<AuthGuard><Content /></AuthGuard>} />
              <Route path="/community" element={<AuthGuard><Community /></AuthGuard>} />
              <Route path="/subtitles" element={<AuthGuard><Subtitles /></AuthGuard>} />
              <Route path="/copyright" element={<AuthGuard><Copyright /></AuthGuard>} />
              <Route path="/copyrightform" element={<AuthGuard><Copyrightform /></AuthGuard>} />
              <Route path="/customization" element={<AuthGuard><Customization /></AuthGuard>} />
              <Route path="/news" element={<AuthGuard><News /></AuthGuard>} />
              <Route path="/content" element={<AuthGuard><Content /></AuthGuard>} />
              <Route path="/Trend" element={<AuthGuard><Trend /></AuthGuard>} />
              <Route path="/Audience" element={<AuthGuard><Audience /></AuthGuard>} />
              <Route path="/aboutus" element={<AuthGuard><AboutUs /></AuthGuard>} />
              <Route path="/livestream" element={<AuthGuard><Livestream /></AuthGuard>} />

            </Routes>
          </MainLayout>
        </UploadProvider>
      </AuthProvider >   {/* <-- CONTEXT END */}
    </Router>
  );
}

export default App;