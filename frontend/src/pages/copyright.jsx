import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Copyright = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("claims");
    if (stored) {
      setClaims(JSON.parse(stored));
    }
  }, []);

  const handleClaimRedirect = () => {
    navigate("/copyrightform");
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="pt-14 pl-10 pr-10">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">Video copyright</h1>

        {/* What happened section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">What happened</h2>
          <p className="text-sm text-gray-300">
            No copyright issues were found in your video.
          </p>
        </div>

        {/* Channel + Visibility */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Channel</p>
              <p className="text-sm text-gray-300">
                Your channel isn't affected.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Visibility</p>
              <p className="text-sm text-gray-300">
                There are no visibility restrictions.
              </p>
            </div>
          </div>
        </div>

        {/* Table-like section */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex text-sm font-medium text-gray-400 mb-3">
            <span className="w-1/2">Content used</span>
            <span className="w-1/2">Content type</span>
          </div>
          <p className="text-sm text-gray-300">
            No copyrighted content was found in your video.
          </p>
        </div>

        {/* Copyright claim */}
        <div className="mt-12 bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-3xl">
          <h3 className="text-lg font-semibold mb-2">
            Want to report a copyright issue?
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            If this video uses your original content without permission, you can
            file a copyright claim.
          </p>

          <button
            onClick={handleClaimRedirect}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded shadow"
          >
            Submit a copyright claim
          </button>

          {/* Claim list below */}
          {claims.length > 0 && (
            <div className="mt-8">
              <h4 className="text-md font-semibold mb-2">
                Submitted Copyright Claims ({claims.length})
              </h4>
              <ul className="space-y-4">
                {claims.map((claim, index) => (
                  <li
                    key={index}
                    className="bg-gray-800 border border-gray-700 rounded p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold">
                        Copyright Claim #{index + 1}
                      </p>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          claim.status === "accepted"
                            ? "bg-green-700 text-green-100"
                            : claim.status === "rejected"
                            ? "bg-red-700 text-red-100"
                            : "bg-yellow-600 text-yellow-100"
                        }`}
                      >
                        {claim.status === "accepted"
                          ? "Accepted"
                          : claim.status === "rejected"
                          ? "Rejected"
                          : "Pending Review"}
                      </span>
                    </div>

                    <p className="text-sm">
                      <strong>Claimant:</strong> {claim.copyrightOwner}
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> {claim.primaryEmail}
                    </p>
                    <p className="text-sm">
                      <strong>Submitted on:</strong>{" "}
                      {new Date(claim.date).toLocaleString()}
                    </p>

                    <p className="text-sm mt-2 mb-1 font-semibold">Videos:</p>
                    <ul className="list-disc ml-6 text-sm text-red-400">
                      {claim.videos.map((url, i) => (
                        <li key={i}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {/* Status message */}
                    {claim.status === "pending" && (
                      <p className="text-xs text-yellow-300 mt-2">
                        We're currently reviewing your copyright claim. You'll be notified once a decision is made.
                      </p>
                    )}
                    {claim.status === "accepted" && (
                      <p className="text-xs text-green-300 mt-2">
                        Your claim was accepted. Appropriate actions have been taken.
                      </p>
                    )}
                    {claim.status === "rejected" && (
                      <>
                        <p className="text-xs text-red-400 mt-2">
                          Your claim was rejected. If you believe this is a mistake, please contact support or review our policies.
                        </p>
                        {claim.rejectionReason && (
                          <p className="text-sm text-red-300 mt-1">
                            <strong>Rejection Reason:</strong> {claim.rejectionReason}
                          </p>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Copyright;
