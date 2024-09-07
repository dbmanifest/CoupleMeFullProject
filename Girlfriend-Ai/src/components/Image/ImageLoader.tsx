import { convertBase64ToImage, convertImageToBase64 } from "@/lib/base64";
import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { set } from "zod";

// Component to load an image dynamically based on a UUID
const ImageLoader = ({ d,height=100,width=100, prompt="" }: any) => {

// Function to check if a string is a base64 encoded image
    const isBase64Image = (str: string) => {
      const base64Pattern = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
      return base64Pattern.test(str); // Test if the string matches the base64 pattern
  };

  // State to store the image source
  const [imageSrc, setImageSrc] = useState("");
  const { theme } = useTheme(); // Hook to get the current theme (light/dark)
  const retryLimit = 10; // Retry limit for fetching image (currently unused)
  const [retryCount, setRetryCount] = useState(0); // State to track retry count (currently unused)

  // Function to fetch the image from the server
  const fetchImage = async () => {
    try {
      // console.log(d, "base64")
      const imageUrl = `data:image/png;base64,${d}`;

    
      setImageSrc(imageUrl);
    }
  catch (error) {
    console.error("Error fetching image:", error);
  }
};
useEffect(() => {
  if (d) {
    // console.log(d, "base64")
    const imageUrl = `data:image/png;base64,${d}`;
    setImageSrc(imageUrl);
  }
}, [d]);

  return (
    <div>
      {imageSrc ? (
        // If imageSrc is set, render the image
        <Image src={imageSrc} alt="Dynamic Image" width={0} height={0} style={{ width: '100%', height: 'auto' }} // optional
        />
      ) : (
        // If imageSrc is not set, show a loading spinner
        <BeatLoader color={theme === "light" ? "black" : "white"} size={5} />
      )}
    </div>
  );
};

export default ImageLoader;