import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useProfile } from "../hooks/useProfile";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const { changePassword } = useProfile();


  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [logoutOtherDevices, setLogoutOtherDevices] = useState(true);

  const handleChangePassword = async () => {
    setError("");
    if (!newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      await changePassword({
        newPassword,
        logoutOthers: logoutOtherDevices,
      });
      supabase.auth.signOut()
      localStorage.clear()
      sessionStorage.clear()
      navigate("/login", { replace: true });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err?.response?.status >= 500) {
        setError("Unexpected server error. Please try again.");
      }
    }
    finally {
      setLoading(false);
    }
  };



  const renderEyeIcon = (visible, toggle) => (
    <button
      type="button"
      onClick={toggle}
      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
    >
      {visible ? (
        <EyeSlashIcon className="h-5 w-5" />
      ) : (
        <EyeIcon className="h-5 w-5" />
      )}
    </button>
  );

  return (
    <div className="w-full min-h-screen py-12 px-6 text-white">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-red-600">Change password</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Your password must be at least 6 characters and should include a
            combination of numbers, letters and special characters
            <span className="text-gray-300"> (!$@%).</span>
          </p>
        </div>

        {/* Inputs with eye toggle */}
        <div className="space-y-4">


          <div className="relative w-1/2">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New password"
              className="w-full bg-[#1f1f1f] border border-gray-700 text-xs text-white placeholder-gray-500 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 pr-10"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {renderEyeIcon(showNew, () => setShowNew(!showNew))}
          </div>

          <div className="relative w-1/2">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-type new password"
              className="w-full bg-[#1f1f1f] border border-gray-700 text-xs text-white placeholder-gray-500 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {renderEyeIcon(showConfirm, () => setShowConfirm(!showConfirm))}
          </div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}



        {/* Checkbox */}
        <label className="flex items-start mt-4 space-x-2 text-xs text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={logoutOtherDevices}
            onChange={() => setLogoutOtherDevices(!logoutOtherDevices)}
            className="accent-blue-600 mt-0.5 w-3.5 h-3.5"
          />
          <span>
            Log out of other devices. Choose this if someone else used your
            account.
          </span>
        </label>

        {/* Updated Submit Button */}
        <button
          disabled={loading}
          onClick={handleChangePassword}
          className="mt-10 w-full bg-red-600 py-3 rounded-full disabled:opacity-60"
        >
          {loading ? "Updating..." : "Change password"}
        </button>


      </div>
    </div>
  );
};

export default ChangePassword;
