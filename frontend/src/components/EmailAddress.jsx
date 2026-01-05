import React, { useState } from 'react';

const EmailAddress = () => {
  const [email, setEmail] = useState('Brooke@gmail.com');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [phone, setPhone] = useState('+1-555-123-4567');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState(phone);
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Email Handlers
  const handleSendEmailVerification = () => {
    if (tempEmail === email) {
      setEmailError('This is your current email. Please enter a different one.');
      return;
    }
    setEmailError('');
    setEmailVerificationSent(true);
    alert(`Verification code sent to ${tempEmail}`);
  };

  const handleVerifyEmailCode = () => {
    if (emailVerificationCode === '123456') {
      setIsEmailVerified(true);
      alert('Email verified!');
    } else {
      alert('Invalid verification code');
    }
  };

  const handleSaveEmail = () => {
    if (!isEmailVerified) {
      alert('Please verify your new email before saving.');
      return;
    }
    setEmail(tempEmail);
    resetEmailEdit();
    alert('Email updated successfully!');
  };

  const resetEmailEdit = () => {
    setIsEditingEmail(false);
    setIsEmailVerified(false);
    setEmailVerificationSent(false);
    setEmailVerificationCode('');
    setEmailError('');
    setTempEmail(email);
  };

  // Phone Handlers
  const handleSendPhoneVerification = () => {
    if (tempPhone === phone) {
      setPhoneError('This is your current phone number. Please enter a different one.');
      return;
    }
    setPhoneError('');
    setPhoneVerificationSent(true);
    alert(`Verification code sent to ${tempPhone}`);
  };

  const handleVerifyPhoneCode = () => {
    if (phoneVerificationCode === '123456') {
      setIsPhoneVerified(true);
      alert('Phone number verified!');
    } else {
      alert('Invalid verification code');
    }
  };

  const handleSavePhone = () => {
    if (!isPhoneVerified) {
      alert('Please verify your new phone number before saving.');
      return;
    }
    setPhone(tempPhone);
    resetPhoneEdit();
    alert('Phone number updated successfully!');
  };

  const resetPhoneEdit = () => {
    setIsEditingPhone(false);
    setIsPhoneVerified(false);
    setPhoneVerificationSent(false);
    setPhoneVerificationCode('');
    setPhoneError('');
    setTempPhone(phone);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 md:px-8 pt-24 pb-12 space-y-10">
      {/* Email Section */}
      <div className="bg-[#1c1f24] p-6 rounded-xl shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Email Address</h1>
          <p className="text-gray-400 mt-2 text-sm">
            This is the email connected to your account. You can update it anytime.
          </p>
        </div>
        <div className="border border-gray-700 rounded-xl p-5 bg-[#101418] max-w-xl space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">Email</p>
            {!isEditingEmail && (
              <button onClick={() => setIsEditingEmail(true)} className="text-sm text-blue-500 hover:underline">
                Edit
              </button>
            )}
          </div>
          {!isEditingEmail ? (
            <p className="text-base font-medium text-white">{email}</p>
          ) : (
            <div className="space-y-4">
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md"
              />
              {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
              {!emailVerificationSent ? (
                <button onClick={handleSendEmailVerification} className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                  Send Verification Code
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Enter code sent to {tempEmail}</p>
                  <input
                    type="text"
                    value={emailVerificationCode}
                    onChange={(e) => setEmailVerificationCode(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md"
                  />
                  {!isEmailVerified ? (
                    <button onClick={handleVerifyEmailCode} className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">
                      Verify Code
                    </button>
                  ) : (
                    <p className="text-green-400 text-sm">Email verified ✅</p>
                  )}
                </div>
              )}
              <div className="flex gap-3 justify-end pt-2">
                <button onClick={resetEmailEdit} className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
                  Cancel
                </button>
                <button
                  onClick={handleSaveEmail}
                  disabled={!isEmailVerified}
                  className={`px-4 py-2 rounded-md ${
                    isEmailVerified ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phone Section */}
      <div className="bg-[#1c1f24] p-6 rounded-xl shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Phone Number</h1>
          <p className="text-gray-400 mt-2 text-sm">
            This is the phone number connected to your account. You can update it anytime.
          </p>
        </div>
        <div className="border border-gray-700 rounded-xl p-5 bg-[#101418] max-w-xl space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">Phone Number</p>
            {!isEditingPhone && (
              <button onClick={() => setIsEditingPhone(true)} className="text-sm text-blue-500 hover:underline">
                Edit
              </button>
            )}
          </div>
          {!isEditingPhone ? (
            <p className="text-base font-medium text-white">{phone}</p>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md"
              />
              {phoneError && <p className="text-red-400 text-sm">{phoneError}</p>}
              {!phoneVerificationSent ? (
                <button onClick={handleSendPhoneVerification} className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                  Send Verification Code
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Enter code sent to {tempPhone}</p>
                  <input
                    type="text"
                    value={phoneVerificationCode}
                    onChange={(e) => setPhoneVerificationCode(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md"
                  />
                  {!isPhoneVerified ? (
                    <button onClick={handleVerifyPhoneCode} className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">
                      Verify Code
                    </button>
                  ) : (
                    <p className="text-green-400 text-sm">Phone number verified ✅</p>
                  )}
                </div>
              )}
              <div className="flex gap-3 justify-end pt-2">
                <button onClick={resetPhoneEdit} className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
                  Cancel
                </button>
                <button
                  onClick={handleSavePhone}
                  disabled={!isPhoneVerified}
                  className={`px-4 py-2 rounded-md ${
                    isPhoneVerified ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailAddress;
  