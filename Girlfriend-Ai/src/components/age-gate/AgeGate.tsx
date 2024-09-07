"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const AgeGate: React.FC = () => {
  const { isSignedIn } = useAuth();
  const [isVerified, setIsVerified] = useState<boolean>(isSignedIn || localStorage.getItem("ageVerified")=="true");

  useEffect(() => {
    // Ensure the code runs only on the client side
    if (typeof window !== 'undefined') {
      const ageVerified = window.localStorage.getItem("ageVerified");
      if (ageVerified === "true" || isSignedIn) {
        setIsVerified(true);
      }
    }
  }, [isSignedIn]);

  const handleVerifyAge = (isOldEnough: boolean) => {
    if (isOldEnough) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem("ageVerified", "true");
      }
      setIsVerified(true);
    } else {
      alert("You must be 18 or older to enter this site.");
      if (typeof window !== 'undefined') {
        window.location.href = "https://www.google.com";
      }
    }
  };

  if (isVerified) {
    return null; // Return null if the user is verified
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-black p-8 rounded shadow-lg text-center w-[450px] border border-[#E11D48]">
        <h2 className="text-2xl mb-4">Age Verification</h2>
        <p className="mb-8">
          By entering this website you confirm that you are 18 years old or more. By using the site, you agree to our Terms of services. Our privacy policy details how we collect and use our data. We use cookies for analytics and spam detection. All content on this website is AI-generated! Any generation that resembles real people is purely coincidental.
        </p>
        <button
          onClick={() => handleVerifyAge(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          I am 18 or older
        </button>
        <button
          onClick={() => handleVerifyAge(false)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          I am under 18
        </button>
      </div>
    </div>
  );
};

export default AgeGate;