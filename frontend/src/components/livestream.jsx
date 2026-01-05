import React, { useState, useEffect, useRef } from "react";
import {
  FaCommentDots,
  FaVideo,
  FaMicrophone,
  FaMicrophoneSlash,
  FaSync,
  FaPowerOff,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Livestream() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { id: 1, user: "Ali", text: "Salaam everyone 👋" },
    { id: 2, user: "Sara", text: "Great stream! 🔥" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isLive, setIsLive] = useState(true);
  const [viewers, setViewers] = useState(1240);

  const chatEndRef = useRef(null);

  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

  const [streamTitle, setStreamTitle] = useState("");
  const [finalStreamTitle, setFinalStreamTitle] = useState("");
  const [useFrontCamera, setUseFrontCamera] = useState(true);

  const videoRef = useRef(null);
  const mediaStream = useRef(null);

  const [showEndConfirm, setShowEndConfirm] = useState(false);

  // Scroll chat
  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Viewer count simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((v) => v + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), user: "You", text: newMessage }]);
    setNewMessage("");
  };

  // Start Stream
  const handleContinue = async () => {
    setShowPermissionModal(false);
    setFinalStreamTitle(streamTitle);
    await startCamera(useFrontCamera);
  };

  const startCamera = async (front = true) => {
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((t) => t.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: front ? "user" : "environment" },
        audio: true,
      });

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) videoTrack.enabled = cameraEnabled;

      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = micEnabled;

      mediaStream.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Camera Error:", error);
    }
  };

  const switchCamera = async () => {
    setUseFrontCamera((prev) => !prev);
    await startCamera(!useFrontCamera);
  };

  const toggleCamera = () => {
    if (!mediaStream.current) return;
    const videoTrack = mediaStream.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setCameraEnabled(videoTrack.enabled);
    }
  };

  const toggleMic = () => {
    if (!mediaStream.current) return;
    const audioTrack = mediaStream.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicEnabled(audioTrack.enabled);
    }
  };

  const confirmEndStream = () => {
    setIsLive(false);
    setFinalStreamTitle("Stream Ended");

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((t) => t.stop());
    }

    navigate("/my-videos");
  };

  return (
    <div className="relative min-h-screen bg-[#0F0F0F] text-white flex flex-col lg:flex-row pt-16 lg:pt-20">

      {/* PERMISSION MODAL */}
      {showPermissionModal && (
        <div className="absolute inset-0 backdrop-blur-xl bg-black/60 z-20 flex items-center justify-center p-6">
          <div className="bg-[#1A1A1A] p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-700 text-center">
            <h2 className="text-xl font-semibold mb-4">Setup Your Stream</h2>

            <div className="bg-[#2A2A2A] p-3 rounded-lg text-left mb-4">
              <label className="block mb-1 text-sm">Stream Title</label>
              <input
                type="text"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                placeholder="Enter stream name..."
                className="w-full bg-[#1F1F1F] px-3 py-2 rounded-lg outline-none text-sm"
              />
            </div>

            <div className="bg-[#2A2A2A] p-3 rounded-lg text-left mb-4">
              <p className="text-sm mb-2 font-medium">Permissions:</p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setCameraEnabled((prev) => !prev)}
                  className={`px-4 py-2 rounded-lg text-sm flex justify-between ${
                    cameraEnabled ? "bg-green-700" : "bg-gray-700"
                  }`}
                >
                  <span>Camera</span>
                  <FaVideo />
                </button>

                <button
                  onClick={() => setMicEnabled((prev) => !prev)}
                  className={`px-4 py-2 rounded-lg text-sm flex justify-between ${
                    micEnabled ? "bg-green-700" : "bg-gray-700"
                  }`}
                >
                  <span>Microphone</span>
                  {micEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>

                <button
                  onClick={() => setUseFrontCamera((prev) => !prev)}
                  className="px-4 py-2 bg-blue-700 rounded-lg text-sm flex justify-between"
                >
                  <span>Camera Mode</span>
                  {useFrontCamera ? "Front" : "Back"}
                </button>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full text-sm font-medium w-full"
              disabled={streamTitle.trim().length === 0}
            >
              Start Stream
            </button>
          </div>
        </div>
      )}

      {/* END STREAM CONFIRM POPUP */}
      {showEndConfirm && (
        <div className="absolute inset-0 bg-black/70 z-30 flex items-center justify-center">
          <div className="bg-[#1F1F1F] p-6 rounded-2xl w-full max-w-sm text-center shadow-xl border border-gray-700">
            <h2 className="text-xl font-bold mb-4">End Stream?</h2>
            <p className="text-gray-300 text-sm mb-6">
              Are you sure you want to end the livestream?
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="px-5 py-2 rounded-full bg-gray-600 hover:bg-gray-700 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={confirmEndStream}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-sm"
              >
                Yes, End Stream
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEFT VIDEO AREA */}
      <div className={`flex-1 p-4 lg:p-6 ${showPermissionModal ? "blur-sm pointer-events-none" : ""}`}>
        <div className="bg-black rounded-xl overflow-hidden relative shadow-xl h-[60vh] md:h-[70vh] lg:h-[80vh]">

          <video
            ref={videoRef}
            className="w-full h-full object-cover bg-black"
            autoPlay
            muted={!micEnabled}
          />

          {isLive && (
            <span className="absolute top-3 left-3 bg-red-600 px-3 py-1 text-xs rounded-full flex gap-2 items-center">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </span>
          )}

          <span className="absolute top-3 right-3 bg-black/60 px-3 py-1 text-xs rounded-full">
            {viewers.toLocaleString()} watching
          </span>
        </div>

        {/* CONTROLS */}
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl font-semibold">{finalStreamTitle || "Live Stream"}</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleCamera}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                cameraEnabled ? "bg-green-600" : "bg-gray-700"
              }`}
            >
              <FaVideo /> {cameraEnabled ? "Camera On" : "Camera Off"}
            </button>

            <button
              onClick={toggleMic}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                micEnabled ? "bg-green-600" : "bg-gray-700"
              }`}
            >
              {micEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
              {micEnabled ? "Mic On" : "Mic Off"}
            </button>

            <button
              onClick={switchCamera}
              className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full text-sm"
            >
              <FaSync /> Switch
            </button>

            <button
              onClick={() => setShowEndConfirm(true)}
              className="flex items-center gap-2 bg-red-700 px-4 py-2 rounded-full text-sm"
            >
              <FaPowerOff /> End
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT CHAT */}
      <div className={`w-full lg:w-[380px] bg-[#1A1A1A] border-l border-gray-800 h-screen flex flex-col ${showPermissionModal ? "blur-sm pointer-events-none" : ""}`}>
        <div className="p-4 border-b border-gray-700 flex items-center gap-2">
          <FaCommentDots /> <h2 className="text-lg font-semibold">Live Chat</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={msg.user === "You" ? "text-right" : "text-left"}>
              <div className="inline-block bg-gray-800 px-3 py-2 rounded-xl max-w-[80%]">
                <p className="text-xs text-gray-400">{msg.user}</p>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-gray-800 px-3 py-2 rounded-lg text-sm outline-none"
            />
            <button className="bg-red-600 px-4 py-2 rounded-lg text-sm">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
