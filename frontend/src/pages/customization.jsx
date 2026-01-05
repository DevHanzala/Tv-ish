import React, { useState, useContext } from "react";
import { ChannelContext } from "../context/ChannelContext";

// Helper to convert image file to Base64 string
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function ChannelCustomization() {
  const { channel, updateChannel } = useContext(ChannelContext);
  const [activeTab, setActiveTab] = useState("branding");

  const [name, setName] = useState(channel.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [description, setDescription] = useState(channel.description);
  const [email, setEmail] = useState(channel.email);
  const [phone, setPhone] = useState(channel.phone || "");
  const [links, setLinks] = useState(channel.links || []);
  const [socialLinks, setSocialLinks] = useState(channel.socialLinks || []);

  const [banner, setBanner] = useState(channel.banner);
  const [profile, setProfile] = useState(channel.dp);
  const [watermark, setWatermark] = useState(channel.watermark);

  const handleAddLink = () => {
    setLinks([...links, { title: "e.g..facebook,insta ", url: "https://" }]);
  };

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "Platform Name", url: "https://" }]);
  };

  // Updated handler: convert image to Base64 before saving
  const handleChangeImage = async (type) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const base64 = await toBase64(file);
          if (type === "banner") setBanner(base64);
          if (type === "profile") setProfile(base64);
          if (type === "watermark") setWatermark(base64);
        } catch (err) {
          console.error("Failed to convert image to Base64", err);
        }
      }
    };
    fileInput.click();
  };

  const handleDeleteImage = (type) => {
    if (type === "banner") setBanner(null);
    if (type === "profile") setProfile(null);
    if (type === "watermark") setWatermark(null);
  };

  const handlePublish = () => {
    updateChannel({
      name,
      handle: channel.handle,
      description,
      email,
      phone,
      links,
      socialLinks,
      banner,
      dp: profile,
      watermark,
    });
    setIsEditingName(false);
    alert("Changes Published!");
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 pt-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Channel customization</h1>
        <div className="space-x-3">
          <button className="px-5 py-2 rounded-full bg-gray-700 hover:bg-gray-600">
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-500"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 space-x-10 mb-6">
        {[
          { key: "branding", label: "Branding" },
          { key: "basic", label: "Basic info" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`pb-3 text-lg font-medium transition ${
              activeTab === tab.key
                ? "border-b-2 border-red-600 text-red-500"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "branding" && (
          <div className="space-y-10">
            {/* Banner */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Banner image</h2>
              <div className="relative w-full h-56 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                {banner ? (
                  <img
                    src={banner}
                    alt="Banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-gray-500">
                    Upload Banner
                  </span>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex items-center justify-center space-x-4 transition">
                  <button
                    onClick={() => handleChangeImage("banner")}
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
                  >
                    Change
                  </button>
                  <button
                    onClick={() => handleDeleteImage("banner")}
                    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Profile picture</h2>
              <div className="flex items-center space-x-6">
                <div className="relative w-28 h-28 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
                  {profile ? (
                    <img
                      src={profile}
                      alt="Profile"
                      className="w-28 h-28 object-cover rounded-full"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-gray-500 text-xs">
                      Upload Profile
                    </span>
                  )}
                  <div className="absolute inset-0 z-10 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex flex-col items-center justify-center gap-3 transition rounded-full">
                    <button
                      onClick={() => handleChangeImage("profile")}
                      className="px-4 py-2 bg-red-600 text-sm rounded hover:bg-red-500 w-20 text-center"
                    >
                      Change
                    </button>
                    <button
                      onClick={() => handleDeleteImage("profile")}
                      className="px-4 py-2 bg-gray-700 text-sm rounded hover:bg-gray-600 w-20 text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Channel name & handle */}
                <div>
                  <div className="flex items-center gap-2">
                    {isEditingName ? (
                      <>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm"
                        />
                        <button
                          onClick={() => setIsEditingName(false)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="font-bold text-lg">{name}</p>
                        <button
                          onClick={() => setIsEditingName(true)}
                          className="text-gray-400 hover:text-white"
                          title="Edit name"
                        >
                          ✏️
                        </button>
                      </>
                    )}
                  </div>
                  <p className="text-gray-400">{channel.handle}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    www.TV-ISH.com/c/123XH
                  </p>
                </div>
              </div>
            </div>

            {/* Watermark */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Video watermark</h2>
              <div className="relative w-36 h-20 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                {watermark ? (
                  <img
                    src={watermark}
                    alt="Watermark"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-gray-500 text-xs">
                    Upload Watermark
                  </span>
                )}
                <div className="absolute inset-0 z-10 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex flex-col items-center justify-center gap-3 transition">
                  <button
                    onClick={() => handleChangeImage("watermark")}
                    className="px-4 py-2 bg-red-600 text-sm rounded hover:bg-red-500 w-20 text-center"
                  >
                    Change
                  </button>
                  <button
                    onClick={() => handleDeleteImage("watermark")}
                    className="px-4 py-2 bg-gray-700 text-sm rounded hover:bg-gray-600 w-20 text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "basic" && (
          <div className="space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <textarea
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Links (Commented Out) */}
            {/*
            <div>
              <h2 className="text-xl font-semibold mb-3">Links</h2>
              {links.map((link, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:space-x-3 mb-2">
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => {
                      const newLinks = [...links];
                      newLinks[idx].title = e.target.value;
                      setLinks(newLinks);
                    }}
                    className="w-full sm:w-1/3 bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm focus:border-red-600 mb-2 sm:mb-0"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...links];
                      newLinks[idx].url = e.target.value;
                      setLinks(newLinks);
                    }}
                    className="w-full sm:w-2/3 bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm focus:border-red-600"
                  />
                </div>
              ))}
              <button
                className="mt-3 px-4 py-2 bg-gray-800 rounded-full hover:bg-red-600 transition"
                onClick={handleAddLink}
              >
                + Add Link
              </button>
            </div>
            */}

            {/* Social Media Links */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Social Media Links</h2>
              {socialLinks.map((link, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:space-x-3 mb-2">
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) => {
                      const newLinks = [...socialLinks];
                      newLinks[idx].platform = e.target.value;
                      setSocialLinks(newLinks);
                    }}
                    className="w-full sm:w-1/3 bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm focus:border-red-600 mb-2 sm:mb-0"
                    placeholder="Platform"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...socialLinks];
                      newLinks[idx].url = e.target.value;
                      setSocialLinks(newLinks);
                    }}
                    className="w-full sm:w-2/3 bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm focus:border-red-600"
                    placeholder="URL"
                  />
                </div>
              ))}
              <button
                className="mt-3 px-4 py-2 bg-gray-800 rounded-full hover:bg-red-600 transition"
                onClick={handleAddSocialLink}
              >
                + Add Social Link
              </button>
            </div>

            {/* Contact info */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Contact Info</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm focus:border-red-600 mb-3"
                placeholder="Email Address"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm focus:border-red-600"
                placeholder="Contact Number"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
