"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

const StepEight = ({ data, updateData }) => {
  const [clothingOptions, setClothingOptions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/clothings")
      .then((response) => {
        setClothingOptions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the style options!", error);
      });
  }, []);

  const handleClothingChange = (event) => {
    updateData({ ...data, clothing: event.target.value });
  };

  return (
    <div>
      <div className="h-auto flex-col justify-start w-full bg-popup rounded-xl z-10 border border-[#282828] mb-5">
        <fieldset className="flex flex-col mx-auto font-semibold mb-9">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10 pb-4 lg:pb-8">
            Choose Clothing*
          </legend>
          <div className="flex flex-wrap justify-start items-start mx-5 lg:mx-10 gap-[8px] font-medium">
            {clothingOptions.map(({ value, label }) => (
              <div
                key={value}
                className={classNames(
                  "text-[14px] rounded-xl text-white h-[30px] px-3 py-2 leading-[14px] select-none cursor-pointer",
                  {
                    "pill-option-active": data.clothing === value,
                    "pill-option-inactive": data.clothing !== value,
                  }
                )}
                data-value={value}
              >
                <input
                  className="hidden"
                  type="radio"
                  value={value}
                  id={`profile_clothing_${value
                    .toLowerCase()
                    .replace(/\s+/g, "_")}`}
                  onChange={handleClothingChange}
                  checked={data.clothing === value}
                />
                <label
                  htmlFor={`profile_clothing_${value
                    .toLowerCase()
                    .replace(/\s+/g, "_")}`}
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default StepEight;
