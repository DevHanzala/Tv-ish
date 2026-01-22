import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";

const EmailAddress = () => {
  const { profile, requestEmailChange, updatePhone } = useProfile();

  /* ================= EMAIL ================= */
  const email = profile?.profile?.email || "";
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);
  const [emailError, setEmailError] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    setTempEmail(email);
  }, [email]);

  const submitEmailChange = async () => {
    if (!tempEmail || tempEmail === email) {
      setEmailError("Please enter a different email address.");
      return;
    }
    console.log("Submitting email change to:", tempEmail);
    try {
      setEmailLoading(true);
      setEmailError("");
      await requestEmailChange(tempEmail);
      setIsEditingEmail(false);
    } catch (err) {
      setEmailError(
        err.response?.data?.message || "Failed to request email change."
      );
    } finally {
      setEmailLoading(false);
    }
  };

  /* ================= PHONE ================= */
  const phone = profile?.profile?.phone || "";
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState(phone);
  const [phoneError, setPhoneError] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);

  useEffect(() => {
    setTempPhone(phone);
  }, [phone]);

  const submitPhoneChange = async () => {
    if (!tempPhone || tempPhone === phone) {
      setPhoneError("Please enter a new phone number.");
      return;
    }
    console.log("Submitting phone change to:", tempPhone);
    try {
      setPhoneLoading(true);
      setPhoneError("");
      await updatePhone(tempPhone);
      setIsEditingPhone(false);
    } catch (err) {
      setPhoneError(
        err.response?.data?.message || "Failed to update phone number."
      );
    } finally {
      setPhoneLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 pt-24 space-y-12">

      {/* ================= EMAIL ================= */}
      <section className="bg-[#1c1f24] p-6 rounded-xl max-w-xl">
        <h2 className="text-xl font-semibold"> Email Address</h2>
        <p className="text-sm text-gray-400 mt-1">
          Email updates require confirmation via email.
        </p>

        {!isEditingEmail ? (
          <div className="mt-4 flex justify-between">
            <span>{profile?.profile?.email || "Not set"}</span>
            <button
              onClick={() => setIsEditingEmail(true)}
              className="text-blue-500 text-sm"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <input
              type="email"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
            />
            {emailError && (
              <p className="text-sm text-red-400">{emailError}</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditingEmail(false)}
                className="px-4 py-2 bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitEmailChange}
                disabled={emailLoading}
                className="px-4 py-2 bg-blue-600 rounded disabled:opacity-60"
              >
                {emailLoading ? "Sending..." : "Send confirmation"}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ================= PHONE ================= */}
      <section className="bg-[#1c1f24] p-6 rounded-xl max-w-xl">
        <h2 className="text-xl font-semibold">Phone Number</h2>

        {!isEditingPhone ? (
          <div className="mt-4 flex justify-between">
            <span>{profile?.profile?.phone || "Not set"}</span>
            <button
              onClick={() => setIsEditingPhone(true)}
              className="text-blue-500 text-sm"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              value={tempPhone}
              onChange={(e) => setTempPhone(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
            />
            {phoneError && (
              <p className="text-sm text-red-400">{phoneError}</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditingPhone(false)}
                className="px-4 py-2 bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitPhoneChange}
                disabled={phoneLoading}
                className="px-4 py-2 bg-blue-600 rounded disabled:opacity-60"
              >
                {phoneLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default EmailAddress;
