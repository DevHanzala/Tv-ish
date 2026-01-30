// Monitization.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, DollarSign } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useUpload } from "../context/UploadContext";
import { upsertMonetization, monetizationData } from "../services/monetization";
import { updateMonetizationId, updateVideoStatus } from "../services/video";

export default function Monitization() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { videoId } = useParams();

  const { uploadData, updateField } = useUpload();

  const [localMonetizationType, setLocalMonetizationType] = useState("avod");

  const [localAdsConfig, setLocalAdsConfig] = useState({
    duration: "",
    adType: "commercial",
    subscriptionType: "",
  });
  const [publishConfirm, setPublishConfirm] = useState(false);

  useEffect(() => {
    if (!uploadData?.monetization_id) return;

    const fetchMonetization = async () => {
      const monetizationDataRes = await monetizationData(uploadData.monetization_id);

      if (!monetizationDataRes.success) {
        alert(`Error occurred: ${monetizationDataRes.error}`);
        return;
      }

      console.log(monetizationDataRes);
      

      // row found → update local state
      setLocalMonetizationType(monetizationDataRes.data.type || "avod");
      setLocalAdsConfig({
        duration: monetizationDataRes.data.ad_duration ? Number(monetizationDataRes.data.ad_duration) : "",
        adType: monetizationDataRes.data.ad_type || "commercial",
        subscriptionType: monetizationDataRes.data.subscription_type || "",
      });
    };

    fetchMonetization();
  }, [uploadData?.monetization_id]);


  useEffect(() => setOpen(true), []);
  useEffect(() => updateField("monetizationType", localMonetizationType), [localMonetizationType]);
  useEffect(() => updateField("adsConfig", localAdsConfig), [localAdsConfig]);

  // updating/creating monetization fields
  const persistMonetization = async () => {
    const monetizationRes = await upsertMonetization(
      uploadData.monetization_id,
      localMonetizationType,
      localAdsConfig
    );
    if (!monetizationRes.success) {
      console.error(monetizationRes.error);
      return false;
    }
    // if monetization was newly created
    if (!uploadData.monetization_id) {
      const updateRes = await updateMonetizationId(
        monetizationRes.monetizationId, // ⚠️ important
        videoId
      );
      if (!updateRes.success) {
        console.error(updateRes.error);
        return false;
      }
      // sync context
      updateField("monetization_id", monetizationRes.monetizationId);
    }
    return true;
  };


  const handleClose = async () => {
    const res = await persistMonetization();
    console.log(true);
    
    if (!res) {
      return;
    }
    setOpen(false);
    navigate("/dashboard")
  };

  const getCurrentStep = () => {
    if (location.pathname.includes("Monetization")) return 5;
    if (location.pathname.includes("uploadvideos5")) return 4;
    if (location.pathname.includes("uploadvideos4")) return 3;
    if (location.pathname.includes("uploadvideos3")) return 2;
    return 1;
  };
  const currentStep = getCurrentStep();

  const handleStepClick = (step) => {
    if (step === 1) navigate(`/uploadvideos2${videoId}`);
    else if (step === 2) navigate(`/uploadvideos3${videoId}`);
    else if (step === 3) navigate(`/uploadvideos4${videoId}`);
    else if (step === 4) navigate(`/uploadvideos5${videoId}`);
    else if (step === 5) navigate(`/Monetization${videoId}`);
  };

  const steps = [
    { id: 1, label: "Details" },
    { id: 2, label: "Video elements" },
    { id: 3, label: "Checks" },
    { id: 4, label: "Visibility" },
    { id: 5, label: "Monetization" },
  ];

  const handlePublish = async () => {
    setPublishConfirm(true);
    // A-VOD validation
    if (localMonetizationType === "avod" &&
      (!localAdsConfig?.adType || !localAdsConfig?.duration)) {
      alert("Please select ad type and ad duration.");
      setPublishConfirm(false);
      return;
    }

    // S-VOD validation
    if (localMonetizationType === "svod" &&
      !localAdsConfig?.subscriptionType) {
      alert("Please select a subscription model.");
      setPublishConfirm(false);
      return;
    }

    //update content to supabase
    const success = await persistMonetization();
    if (!success) {
      alert("Failed to save monetization settings. Please try again.");
      setPublishConfirm(false);
      return;
    }
    //publish the video
    const updateStatus = await updateVideoStatus(videoId);
    if (!updateStatus.success) {
      alert("Failed to publish: ", updateStatus.error);
      setPublishConfirm(false);
      return;
    }
    setPublishConfirm(false);
    setOpen(false);
    navigate("/dashboard");
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-6xl bg-[#181818] text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ duration: 0.25 }}
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={handleClose}
                  className="p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Left Section */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[85vh]">
                <div>
                  <h1 className="text-xl font-semibold text-gray-100">Final Listing · Publish Your Video</h1>
                  <p className="text-sm text-gray-200 mt-1">Review details before publishing</p>
                </div>

                {/* Step Bar */}
                <div className="relative flex items-center justify-between w-full mt-6 mb-10 px-8">
                  <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-gray-400 -translate-y-1/2 z-0" />
                  {steps.map((step) => {
                    const isCompleted = step.id < currentStep;
                    const isActive = step.id === currentStep;
                    return (
                      <div
                        key={step.id}
                        onClick={() => handleStepClick(step.id)}
                        className={`relative z-10 flex flex-col items-center cursor-pointer transition hover:scale-105 ${step.id > currentStep ? "opacity-60" : ""
                          }`}
                      >
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${isCompleted
                            ? "bg-white border-white text-black"
                            : isActive
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "bg-black border-gray-400"
                            }`}
                        >
                          {isCompleted ? (
                            <CheckCircle size={18} className="text-black" />
                          ) : (
                            <div className={`w-3 h-3 rounded-full ${isActive ? "bg-white" : "bg-gray-400"}`} />
                          )}
                        </div>
                        <span className="text-xs text-gray-200 mt-2">{step.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Monetization Options */}
                <div className="space-y-8 pt-2">
                  <div className="bg-gradient-to-b from-[#0f0f0f] to-[#161616] border border-gray-600 rounded-lg p-5 shadow-inner">
                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-gray-100">
                      <DollarSign size={18} className="text-yellow-400" /> Monetization Options
                    </h3>

                    {/* Monetization Select */}
                    <div className="flex items-center gap-6 mb-4">
                      {[
                        { id: "avod", label: "A-VOD" },
                        { id: "svod", label: "S-VOD" },
                        { id: "ppv", label: "PPV" },
                      ].map((type) => (
                        <label
                          key={type.id}
                          className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg cursor-pointer border transition-all duration-200 ${localMonetizationType === type.id
                            ? "bg-blue-600/20 border-blue-500 text-blue-400"
                            : "bg-[#202020] border-gray-600 text-gray-200 hover:border-gray-400"
                            }`}
                        >
                          <input
                            type="radio"
                            name="monetization"
                            checked={localMonetizationType === type.id}
                            onChange={() => setLocalMonetizationType(type.id)}
                            className="accent-blue-600"
                          />
                          <span>{type.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* A-VOD */}
                    {localMonetizationType === "avod" && (
                      <motion.div className="mt-5 space-y-4 border-t border-gray-600 pt-4">
                        <div>
                          <label className="text-sm text-gray-200 mb-2 block">Time Duration</label>
                          <select
                            value={localAdsConfig?.duration}
                            onChange={(e) => setLocalAdsConfig({ ...localAdsConfig, duration: e.target.value })}
                            className="bg-[#2a2a2a] border border-gray-500 rounded-lg px-3 py-2 text-sm w-full text-gray-100"
                          >
                            <option value="">Select Duration</option>
                            {[5, 10, 15, 20, 30].map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-gray-200 mb-2 block">Ad Type</label>
                          <select
                            value={localAdsConfig?.adType}
                            onChange={(e) => setLocalAdsConfig({ ...localAdsConfig, adType: e.target.value })}
                            className="bg-[#2a2a2a] border border-gray-500 rounded-lg px-3 py-2 text-sm w-full text-gray-100"
                          >
                            <option value="commercial">Commercial</option>
                            <option value="non_commercial">Non-commercial</option>
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {/* S-VOD */}
                    {localMonetizationType === "svod" && (
                      <motion.div className="mt-5 border-t border-gray-600 pt-4">
                        <label className="text-sm text-gray-200 mb-2 block">Subscription Type</label>
                        <select
                          value={localAdsConfig?.subscriptionType}
                          onChange={(e) => setLocalAdsConfig({ ...localAdsConfig, subscriptionType: e.target.value })}
                          className="bg-[#2a2a2a] border border-gray-500 rounded-lg px-3 py-2 text-sm w-full text-gray-100"
                        >
                          <option value="">Select Subscription</option>
                          <option value="individual">Individual content</option>
                          <option value="creator">Content creator subscription</option>
                        </select>
                      </motion.div>
                    )}

                    {/* PPV */}
                    {localMonetizationType === "ppv" && (
                      <motion.div className="mt-5 border-t border-gray-600 pt-4 text-gray-200">
                        <p>PPV selected (no additional settings)</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-80 bg-[#1f1f1f] border-l border-gray-700 p-4 flex flex-col items-center justify-start">
                <div className="w-56 h-32 bg-[#0f0f0f] rounded-md overflow-hidden">
                  <img
                    src="https://i.ytimg.com/vi_webp/5qap5aO4i9A/mqdefault.webp"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-gray-200 mt-2">0:00 / 0:25</p>
                <div className="text-sm mt-3 w-full">
                  <p className="text-gray-200 truncate">Video link</p>
                  <a href="#" className="text-blue-500 text-xs break-all">https://youtu.be/C6yMDE6gxzU</a>
                  <p className="text-gray-200 text-xs mt-2">Filename</p>
                  <p className="text-xs text-gray-200 truncate">My Store · Themes · Shopify - Google Chrome.mp4</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
              className="fixed bottom-0 left-0 w-full bg-[#181818] border-t border-gray-700 flex items-center justify-between px-6 py-3"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <CheckCircle size={16} className="text-green-500" /> All checks passed. Ready to publish.
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleStepClick(currentStep - 1)}
                  className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded text-sm font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handlePublish}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-sm font-medium"
                >
                  {publishConfirm ? "Publishing..." : "Publish Now"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
