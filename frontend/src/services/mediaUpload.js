import * as tus from "tus-js-client";
import { supabase } from "../config/supabase.js";

export const uploadMediaFile = async ({
  user,
  videoId,
  file,
  bucket,
  objectPath,
  type,      // "trailer" | "artwork"
  size,      // only for artwork
  onProgress,
}) => {
  if (!user) throw new Error("Not authenticated");

  // ✅ parse size ONLY for artwork
  let width = null;
  let height = null;

  if (type === "artwork") {
    if (!size) {
      throw new Error("Artwork upload requires size");
    }
    [width, height] = size.split("x").map(Number);
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 1️⃣ Upload to storage (TUS)
  await new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/upload/resumable`,
      headers: {
        authorization: `Bearer ${session.access_token}`,
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        "x-upsert": "true",
      },
      metadata: {
        bucketName: bucket,
        objectName: objectPath,
        contentType: file.type,
        metadata: JSON.stringify({
          owner_id: user.id,
          video_id: videoId,
          type,
        }),
      },
      chunkSize: 6 * 1024 * 1024,

      onProgress(bytesUploaded, bytesTotal) {
        onProgress?.(Math.round((bytesUploaded / bytesTotal) * 100));
      },

      onError: reject,
      onSuccess: resolve,
    });

    upload.start();
  });

  // 2️⃣ Save path in DB
  if (type === "trailer") {
    const { error } = await supabase
      .from("videos")
      .update({ trailer_path: objectPath })
      .eq("id", videoId);

    if (error) {
      console.error("[UPLOAD] trailer DB error:", error);
      throw error;
    }
  }

  if (type === "artwork") {
    const { error } = await supabase
      .from("video_artworks")
      .upsert(
        {
          video_id: videoId,
          width,
          height,
          file_path: objectPath,
          public_url: supabase.storage
            .from("artworks")
            .getPublicUrl(objectPath).data.publicUrl,
        },
        {
          onConflict: "video_id,width,height",
        }
      );

    if (error) {
      console.error("[UPLOAD] artwork DB error:", error);
      throw error;
    }
  }
};

export const deleteMediaFile = async ({
  bucket,
  objectPath,
  type,      // "trailer" | "artwork"
  videoId,
  size,      // required for artwork
}) => {
  if (!objectPath) return;

  // 1️⃣ delete from storage
  const { error: storageError } = await supabase.storage
    .from(bucket)
    .remove([objectPath]);

  if (storageError) {
    console.error("[DELETE] storage error:", storageError);
    throw storageError;
  }

  // 2️⃣ delete/update DB
  if (type === "trailer") {
    const { error } = await supabase
      .from("videos")
      .update({ trailer_path: null })
      .eq("id", videoId);

    if (error) throw error;
  }

  if (type === "artwork") {
    const [width, height] = size.split("x").map(Number);

    const { error } = await supabase
      .from("video_artworks")
      .delete()
      .eq("video_id", videoId)
      .eq("width", width)
      .eq("height", height);

    if (error) throw error;
  }
};

