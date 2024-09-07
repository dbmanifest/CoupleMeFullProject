"use client";

import React, { useEffect, useState } from "react";
import classNames from 'classnames';
import axios from "axios";

// Define the StepOne component
const StepOne = ({ data, updateData }) => {
  // State to hold style options fetched from the API
  const [styleOptions, setStyleOptions] = useState([]);
  const [name, setName] = useState("");

  // Fetch style options from the API on component mount
  useEffect(() => {
    axios.get('/api/styles')
      .then(response => {
        setStyleOptions(response.data); // Set the style options in state
      })
      .catch(error => {
        console.error("There was an error fetching the style options!", error);
      });
  }, []);

  // Handle change events for style selection
  const handleChange = (type , e) => {
    if (type === "name") {
      setName(e.target.value);
      updateData({ name: e.target.value });
    }
    

    else {
      const selectedValue = e.target.value;
      updateData({ style: selectedValue }); // Update the parent component with the selected style
    }
  };


  return (
    <section>
      <div
        className="h-auto flex-col justify-start w-full bg-popup rounded-xl z-10 border border-[#282828] mb-5 p-6"
        id="edit_profile_45075381"
      >
              {/* Name input */}
      <div className="h-auto flex-col justify-start w-full bg-popup rounded-xl z-10 border border-[#282828] mb-5">
        <input
        style={{backgroundColor:"#1A1A1A"}}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => handleChange("name", e)}
          defaultValue={"Test."}
        />
      </div>
        <fieldset className="flex justify-center lg:mx-10 mx-5 gap-4 lg:gap-10 font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10 pb-4 lg:pb-8">
            Choose Style*
          </legend>
          {/* Render each style option */}
          {styleOptions.map((option) => (
            <div
              key={option.value}
              className={classNames("inline-block relative rounded-xl", {
                "border-2 border-pink-500": data.style === option.value, // Highlight the selected option
              })}
              data-create-flow-target="option"
              data-action="click->create-flow#select"
            >
              <input
                className="hidden" // Hide the actual radio input
                type="radio"
                value={option.value}
                name="profile[style]"
                id={`profile_style_${option.value}`}
                onChange={(e) => handleChange("style", e)} // Handle selection change
                checked={data.style === option.value} // Check the selected style
              />
              <label htmlFor={`profile_style_${option.value}`}>
                <img
                  alt={option.label}
                  className="object-cover w-[140px] h-[206px] lg:w-[320px] lg:h-[443px] cursor-pointer rounded-xl"
                  src={option.imgSrc} // Image source for the style option
                />
                <div
                  className="text-white text-[13px] lg:text-[16px] flex items-center justify-center whitespace-nowrap h-[25px] leading-[25px] absolute bottom-[6px] lg:bottom-[10px] left-1/2 transform -translate-x-1/2 py-[8px] px-[10px] rounded-full pill"
                  data-create-flow-target="pill"
                >
                  {option.label} {/* Display the label for the style option */}
                </div>
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </section>
  );
}

export default StepOne;
