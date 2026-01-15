import {useNavigate} from "react-router-dom";
import WatchedVideos from "../components/WatchedVideos";
import AnalyticsGraph from "../components/AnalyticsGraph";
import Sidebar from "../components/Sidebar";
import PlaylistSection from "../components/PlaylistSection";
import { useState, useEffect } from "react";
import { supabase } from "../config/supabase.js";

const Dashboard = () => {

 const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("🧾 CURRENT SESSION", data.session);

      if (!data.session) {
        console.log("❌ NO SESSION → REDIRECT TO LOGIN");
        navigate("/login", { replace: true });
      }

      setCheckingAuth(false);
    });
  }, [navigate]);

  if (checkingAuth) {
    return <div className="text-white p-6">Checking authentication…</div>;
  }
  // Video data with ads revenue & other revenue
  const videoData = [
    {
      thumbnail: "https://placehold.co/300x180?text=Video+1",
      title: "Some title about this video",
      duration: "4:34",
      nickname: "Nickname1",
      timeAgo: "15m ago",
      adsServed: 1200,
      clicks: 50,
      earningsFromAds: 3.0,
      otherEarnings: 0.5,
      totalEarnings: 3.5,
    },
    {
      thumbnail: "https://placehold.co/300x180?text=Video+2",
      title: "Some title about this video",
      duration: "5:20",
      nickname: "Nickname2",
      timeAgo: "30m ago",
      adsServed: 1500,
      clicks: 60,
      earningsFromAds: 4.0,
      otherEarnings: 0.7,
      totalEarnings: 4.7,
    },
    {
      thumbnail: "https://placehold.co/300x180?text=Video+3",
      title: "Some title about this video",
      duration: "6:00",
      nickname: "Nickname3",
      timeAgo: "1h ago",
      adsServed: 2000,
      clicks: 80,
      earningsFromAds: 5.5,
      otherEarnings: 1.0,
      totalEarnings: 6.5,
    },
  ];

  // Chart data with separate Ads Revenue & Other Revenue
  const chartData = {
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Ads Revenue",
          data: [3, 3.5, 4, 4.2, 4.5, 5, 5.5],
          borderColor: "#FACC15",
          backgroundColor: "rgba(250,204,21,0.2)",
        },
        {
          label: "Other Revenue",
          data: [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1],
          borderColor: "#22D3EE",
          backgroundColor: "rgba(34,211,238,0.2)",
        },
        {
          label: "Views",
          data: [100, 120, 130, 110, 160, 170, 180],
          borderColor: "#A78BFA",
          backgroundColor: "rgba(167,139,250,0.2)",
        },
        {
          label: "Subscribers",
          data: [5, 7, 6, 8, 9, 10, 11],
          borderColor: "#F87171",
          backgroundColor: "rgba(248,113,113,0.2)",
        },
      ],
    },
    monthly: {
      labels: [
        "JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"
      ],
      datasets: [
        {
          label: "Ads Revenue",
          data: [30,32,35,38,40,42,45,47,50,55,60,65],
          borderColor: "#FACC15",
          backgroundColor: "rgba(250,204,21,0.2)",
        },
        {
          label: "Other Revenue",
          data: [5,6,7,8,9,10,11,12,13,14,15,16],
          borderColor: "#22D3EE",
          backgroundColor: "rgba(34,211,238,0.2)",
        },
        {
          label: "Views",
          data: [150, 160, 170, 180, 200, 210, 230, 250,250,400,450,500],
          borderColor: "#A78BFA",
          backgroundColor: "rgba(167,139,250,0.2)",
        },
        {
          label: "Subscribers",
          data: [10, 12, 13, 14, 16, 18, 20, 22,24,26,28,30],
          borderColor: "#F87171",
          backgroundColor: "rgba(248,113,113,0.2)",
        },
      ],
    },
    yearly: {
      labels: ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],
      datasets: [
        {
          label: "Ads Revenue",
          data: [200,220,230,250,270,290,300,320,350,400,450],
          borderColor: "#FACC15",
          backgroundColor: "rgba(250,204,21,0.2)",
        },
        {
          label: "Other Revenue",
          data: [20,22,25,28,30,32,35,37,40,45,50],
          borderColor: "#22D3EE",
          backgroundColor: "rgba(34,211,238,0.2)",
        },
        {
          label: "Views",
          data: [1000,1200,1300,1100,1600,1700,1800,1900,2000,2200,2500],
          borderColor: "#A78BFA",
          backgroundColor: "rgba(167,139,250,0.2)",
        },
        {
          label: "Subscribers",
          data: [50, 70, 60, 80, 90, 100, 110, 115,120,130,140],
          borderColor: "#F87171",
          backgroundColor: "rgba(248,113,113,0.2)",
        },
      ],
    },
  };

  const subscribers = [
    { avatar: "https://placehold.co/40x40", name: "Alice", subCount: 123, time: "1h ago" },
    { avatar: "https://placehold.co/40x40", name: "Bob", subCount: 95, time: "2h ago" },
  ];

  const comments = [
    { avatar: "https://placehold.co/40x40", text: "Awesome video!", nickname: "John", time: "30m ago" },
    { avatar: "https://placehold.co/40x40", text: "Thanks for sharing!", nickname: "Jane", time: "1h ago" },
  ];

  const earnings = [
    { avatar: "https://placehold.co/40x40", amount: 89.0, change: -12.5, time: "2h ago", type: "Ads" },
    { avatar: "https://placehold.co/40x40", amount: 120.0, change: 25.6, time: "4h ago", type: "Other" },
  ];

  const playlists = [
    { thumbnail: "https://placehold.co/300x180?text=Playlist+1", title: "Frontend Projects", videoCount: 12 },
    { thumbnail: "https://placehold.co/300x180?text=Playlist+2", title: "React Tutorials", videoCount: 8 },
    { thumbnail: "https://placehold.co/300x180?text=Playlist+3", title: "UI/UX Design", videoCount: 5 },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
      {/* Main content */}
      <main className="flex-1 w-full px-4 md:px-6 pt-20 pb-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Watched Videos */}
          <WatchedVideos videos={videoData} />

          {/* Analytics Graph */}
          <AnalyticsGraph
            views={180}
            watchTime={120}
            subscribers={22}
            earnings={47}
            viewsChange={18}
            watchTimeChange={14}
            subscribersChange={11}
            earningsChange={7}
            allChartData={chartData}
          />

          {/* Playlist Section */}
          <PlaylistSection playlists={playlists} />

          {/* Mobile Sidebar */}
          <div className="block lg:hidden border-t border-gray-800 pt-6">
            <Sidebar
              subscribers={subscribers}
              comments={comments}
              earnings={earnings}
            />
          </div>
        </div>
      </main>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-full max-w-sm bg-black border-l border-gray-800 p-4 overflow-y-auto">
        <Sidebar
          subscribers={subscribers}
          comments={comments}
          earnings={earnings}
        />
      </aside>
    </div>
  );
};

export default Dashboard;
