const placeholderImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC"

import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

// Component to load an image dynamically based on a UUID
const ImageLoader = ({ d, maxRetries = 10 }: any) => {
  // Function to parse a JSON string or object
  const parseJSON = (input: string | object) => {
    if (typeof input === 'string') {
      try {
        const parsed = JSON.parse(input); // Try to parse the string
        if (typeof parsed === 'object' && parsed !== null) {
          return parsed; // Return parsed object if it's valid
        }
      } catch (e) {
        return false; // Return false if parsing fails
      }
    } else if (typeof input === 'object' && input !== null) {
      return input; // Return the object if it's already an object
    }
    return false; // Return false if input is not a valid object or string
  };

  // Function to check if a string is a base64 encoded image
  const isBase64Image = (str: string) => {
    const base64Pattern = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
    return base64Pattern.test(str); // Test if the string matches the base64 pattern
  };

  // Parse the input data
  const parsed = parseJSON(d);

  // State to store the image source
  const [imageSrc, setImageSrc] = useState("");
  const { theme } = useTheme(); // Hook to get the current theme (light/dark)
  const [retryCount, setRetryCount] = useState(0); // State to track retry count

  // Function to fetch the image from the server
  const fetchImage = async () => {
    try {
      const response = await axios.get(`/api/imgsrc/${parsed.image_uuid}`); // Make an API call to fetch image using the UUID
      if (isBase64Image(response.data)) {
        setImageSrc(response.data); // Set the image source if the response is a base64 image
      } else {
        handleRetry(); // Handle retry logic
      }
    } catch (error) {
      console.error("Error fetching image:", error); // Log any errors
      handleRetry(); // Handle retry logic
    }
  };

  // Function to handle retry logic with a 1-second interval
  const handleRetry = () => {
    // console.log("retryCountretryCountretryCountretryCount",retryCount)
    if (retryCount < maxRetries) {
      setRetryCount(retryCount + 1); // Increment retry count
      setTimeout(fetchImage, 1000); // Retry fetching the image after 1 second
    } else {
      setImageSrc(placeholderImage); // Set image source to blank after max retries
    }
  };

  // UseEffect to call the fetchImage function once when the component mounts
  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      {imageSrc ? (
        // If imageSrc is set, render the image
        <Image src={imageSrc} alt="Dynamic Image" width={100} height={100} />
      ) : (
        // If imageSrc is not set, show a loading spinner
        <BeatLoader color={theme === "light" ? "black" : "white"} size={5} />
      )}
    </div>
  );
};

export default ImageLoader;