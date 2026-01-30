// context/UploadContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../config/supabase.js";
import { useParams } from "react-router-dom";
import { fetchTrackAndAlbumByVideoId } from "../services/track.js";
import { fetchEpisodeAndSeasonByVideoId } from "../services/episode.js";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const { videoId } = useParams(); // get videoId from URL
  const [uploadData, setUploadData] = useState({
    videoId: "",
    title: "",
    description: "",
    category: "",
    synopsis: "",
    monetization_id: null,
    genres: [],
    cast: [],
    crew: [],
  });

  const [loading, setLoading] = useState(true);

  // Fetch minimal video details (title, description, category) and user captions
  useEffect(() => {
    if (!videoId) return;

    const fetchVideoDetails = async () => {
      setLoading(true);

      // Fetch video details
      const { data: videoData, error: videoError } = await supabase
        .from("videos")
        .select("title, description, category, id, visibility, is_18_plus, synopsis, monetization_id")
        .eq("id", videoId)
        .single();

      const { data: genreLinks } = await supabase
        .from("video_genres")
        .select("genres(name)")
        .eq("video_id", videoId);

      const genres = genreLinks?.map((g) => g.genres.name) || [];

      // Fetch cast
      const { data: castData } = await supabase
        .from("cast_members")
        .select("name")
        .eq("video_id", videoId);

      // Fetch crew
      const { data: crewData } = await supabase
        .from("crew_members")
        .select("name, crew_roles(name)")
        .eq("video_id", videoId);

      const crew = crewData?.map((c) => ({
        name: c.name,
        role: c.crew_roles?.name,
      })) || [];



      if (videoError) {
        console.error("Failed to fetch video details:", videoError);
        setLoading(false);
        return;
      }

      // Fetch captions for this video
      const { data: captionsData, error: captionsError } = await supabase
        .from("captions")
        .select("id, filename")
        .eq("video_id", videoId);

      if (captionsError) {
        console.error("Failed to fetch captions:", captionsError);
      }


      // Set uploadData state including captions
      setUploadData({
        videoId: videoData.id,
        title: videoData.title || "",
        description: videoData.description || "",
        category: videoData.category || "",
        monetization_id: videoData.monetization_id || null,
        captions: captionsData || [], // store captions array
        visibility: videoData.visibility || "private",
        is_18_plus: videoData.is_18_plus || false,
        synopsis: videoData.synopsis || "",
        genres,
        cast: castData?.map((c) => c.name) || [],
        crew,
      });

      setLoading(false);
    };
    fetchVideoDetails();
  }, [videoId]);

  // Log uploadData changes for debugging
  useEffect(() => {
    console.log("Updated uploadData:", uploadData);
  }, [uploadData]);


  // Update a single field in context
  const updateField = (field, value) => {
    setUploadData((prev) => ({
      ...prev,        // copy previous fields
      [field]: value, // update this one
    }));
  };

  /* to fetch season and episode if category is shows
   OR 
   to fetch album and track if category is music */

  useEffect(() => {
    if (!videoId || !uploadData.category) return;

    const categoryHandler = async () => {
      // SHOWS
      if (uploadData.category === "shows") {
        const episodeAndSeason = await fetchEpisodeAndSeasonByVideoId(videoId);
        if (!episodeAndSeason) return;

        updateField("episode_id", episodeAndSeason.id);
        updateField("episode", episodeAndSeason.episode_number);

        updateField("season_id", episodeAndSeason.season_id);
        updateField("season", episodeAndSeason.seasons.season_number);

        updateField("show_id", episodeAndSeason.seasons.show_id);
      }

      // MUSIC
      else if (uploadData.category === "music") {
        const trackAndAlbum = await fetchTrackAndAlbumByVideoId(videoId);
        if (!trackAndAlbum) return;

        updateField("track_id", trackAndAlbum.id);
        updateField("trackNumber", trackAndAlbum.track_number);

        updateField("album_id", trackAndAlbum.album_id);
        updateField("album_title", trackAndAlbum.albums.title);
        updateField("album_artist", trackAndAlbum.albums.artist);
      }
    };

    categoryHandler();
  }, [videoId, uploadData.category]);


  return (
    <UploadContext.Provider
      value={{
        uploadData,
        updateField,
        loading,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

// Hook to access UploadContext
export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) throw new Error("useUpload must be used within an UploadProvider");
  return context;
};
