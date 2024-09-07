"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

const StepTwo = ({ data, updateData }) => {
  // Initialize state for ethnicities and eye colors
  const [ethnicities, setEthnicities] = useState([]);
  const [eyeColors, setEyecolors] = useState([]);
  // List of age options
  const ages = ["Teen(18+)", "20s", "30s"];

  // Fetch data for ethnicities and eye colors
  const fetchData = async () => {
    try {
      // Fetch both ethnicities and eye colors data concurrently
      const [ethnicitiesResponse, eyeColorsResponse] = await Promise.all([
        axios.get("/api/ethnicity"),
        axios.get("/api/eyecolor"),
      ]);
      // Update state with fetched data
      setEthnicities(ethnicitiesResponse.data);
      setEyecolors(eyeColorsResponse.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle selection changes and update parent component
  const handleSelectionChange = (category, value) => {
    updateData({ [category]: value });
  };

  return (
    <section>
      <div className="h-auto flex-col justify-start w-full bg-popup rounded-xl z-10 border border-[#282828] mb-5">
        {/* Ethnicity selection */}
        <fieldset className="flex flex-col mx-auto font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10 pb-4 lg:pb-8">
            Choose Ethnicity*
          </legend>
          <div className="flex flex-wrap justify-start sm:justify-between lg:justify-center items-start mx-4 lg:mx-5 gap-[15px] lg:gap-5 font-medium">
            {ethnicities.map((ethnicity) => (
              <div
                key={ethnicity.value}
                className="text-[13px] relative rounded-xl"
              >
                <input
                  className="hidden" // Hide the actual radio input
                  type="radio"
                  value={ethnicity.value}
                  id={`ethnicity_${ethnicity.value}`}
                  checked={data.ethnicity === ethnicity.value} // Check if this option is selected
                  onChange={() =>
                    handleSelectionChange("ethnicity", ethnicity.value) // Update parent component on change
                  }
                />
                <label htmlFor={`ethnicity_${ethnicity.value}`}>
                  <img
                    alt={ethnicity.label}
                    className={classNames(
                      "cursor-pointer rounded-xl object-cover w-[140px] h-[140px] lg:w-[120px] lg:h-[160px]",
                      {
                        "border-2 border-blue-500":
                          data.ethnicity === ethnicity.value, // Highlight selected option
                      }
                    )}
                    src={ethnicity.src} // Image source for the ethnicity option
                  />
                  <div
                    className={`text-white flex items-center justify-center whitespace-nowrap h-[25px] leading-[24px] absolute bottom-[6px] lg:bottom-[10px] left-1/2 transform -translate-x-1/2 py-[8px] px-[10px] rounded-full pill ${
                      data.ethnicity === ethnicity.value
                        ? "pill-active" // Active style if selected
                        : "pill-inactive" // Inactive style if not selected
                    }`}
                  >
                    {ethnicity.label} {/* Display the label for the ethnicity option */}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Age selection */}
        <fieldset className="flex flex-col mx-3.5 lg:mx-10 font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-sm lg:text-[20px] lg:leading-8 pt-10 lg:pt-[60px] pb-4 lg:pb-8">
            Choose Age
          </legend>
          <ul className="flex flex-wrap flex-row justify-center gap-2">
            {ages.map((age) => (
              <li
                key={age}
                className={`flex flex-1 items-center text-center h-min min-w-min lg:min-w-[70px] text-xxs lg:text-sm font-semibold text-grey-light px-3 py-2 rounded-[10px] cursor-pointer border border-[#4A4A4A] md:flex-initial justify-center ${
                  data.age === age ? "border-pink-default bg-pink-medium" : "" // Highlight selected age
                }`}
                onClick={() => handleSelectionChange("age", age)} // Update parent component on click
              >
                {age} {/* Display the age option */}
              </li>
            ))}
          </ul>
        </fieldset>

        {/* Eye color selection */}
        <fieldset className="flex flex-col mx-auto font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10 pb-4 lg:pb-8">
            Choose Eye Color*
          </legend>
          <div className="flex flex-wrap justify-start md:justify-center items-start mx-4 lg:mx-5 lg:gap-5 gap-[15px] font-medium pb-12">
            {eyeColors.map((color) => (
              <div
                key={color.value}
                className="text-[13px] relative rounded-xl"
              >
                <input
                  className="hidden" // Hide the actual radio input
                  type="radio"
                  value={color.value}
                  id={`eye_color_${color.value}`}
                  checked={data.eyeColor === color.value} // Check if this option is selected
                  onChange={() =>
                    handleSelectionChange("eyeColor", color.value) // Update parent component on change
                  }
                />
                <label htmlFor={`eye_color_${color.value}`}>
                  <img
                    alt={color.label}
                    className={classNames(
                      "cursor-pointer rounded-xl lg:w-[120px] h-[56px] w-[88px]",
                      {
                        "border-2 border-blue-500":
                          data.eyeColor === color.value, // Highlight selected option
                      }
                    )}
                    src={color.src} // Image source for the eye color option
                  />
                  <div
                    className={`text-white flex items-center justify-center whitespace-nowrap h-[25px] leading-[25px] absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 translate-y-1/2 py-[8px] px-[10px] rounded-full pill ${
                      data.eyeColor === color.value
                        ? "pill-active" // Active style if selected
                        : "pill-inactive" // Inactive style if not selected
                    }`}
                  >
                    {color.label} {/* Display the label for the eye color option */}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default StepTwo;
