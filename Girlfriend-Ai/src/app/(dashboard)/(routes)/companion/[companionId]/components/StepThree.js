"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

const StepThree = ({ data, updateData }) => {
  
  const [hairStyles, setHairStyles] = useState([]);
  const [hairColors, setHairColors] = useState([]);

  const fetchData = async () => {
    try {
      const [hairStylesRes, hairColorsRes] = await Promise.all([
        axios.get("/api/hairstyle"),
        axios.get("/api/haircolor"),
      ]);
      setHairStyles(hairStylesRes.data);
      setHairColors(hairColorsRes.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectionChange = (category, value) => {
    updateData({ [category]: value });
  };

  return (
    <section>
      <div className="h-auto flex-col justify-start w-full bg-popup rounded-xl z-10 border border-[#282828] mb-5">
        <fieldset className="flex flex-col mx-auto font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10 pb-4 lg:pb-8">
            Choose Hair Style*
          </legend>
          <div className="flex flex-wrap justify-center items-start mx-2 lg:mx-5 lg:gap-5 gap-[15px] font-medium">
            {hairStyles.map((style) => (
              <div
                key={style.value}
                className={classNames(
                  "text-[13px] relative rounded-xl border",
                  {
                    "border-white": data.hairStyle === style.value,
                    "border-transparent": data.hairStyle !== style.value,
                  }
                )}
              >
                <input
                  className="hidden"
                  type="radio"
                  value={style.value}
                  id={`hair_style_${style.value}`}
                  checked={data.hairStyle === style.value}
                  onChange={() =>
                    handleSelectionChange("hairStyle", style.value)
                  }
                />
                <label htmlFor={`hair_style_${style.value}`}>
                  <img
                    alt={style.label}
                    className="cursor-pointer rounded-xl object-cover w-[88px] h-[88px] lg:w-[120px] lg:h-[120px]"
                    src={style.src}
                  />
                  <div
                    className={classNames(
                      "text-white flex items-center justify-center whitespace-nowrap h-[25px] leading-[25px] absolute bottom-[6px] lg:bottom-[10px] left-1/2 transform -translate-x-1/2 py-[8px] px-[10px] rounded-full pill",
                      {
                        "pill-active": data.hairStyle === style.value,
                        "pill-inactive": data.hairStyle !== style.value,
                      }
                    )}
                  >
                    {style.label}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
        <fieldset className="flex flex-col mx-auto font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-10 lg:pt-[60px] pb-4 lg:pb-8">
            Choose Hair Color*
          </legend>
          <div className="flex flex-wrap justify-start md:justify-center items-start mx-4 lg:mx-5 lg:gap-5 gap-[15px] font-medium mb-9">
            {hairColors.map((color) => (
              <div
                key={color.value}
                className={classNames(
                  "flex w-[88px] lg:h-10 lg:w-[120px] font-semibold justify-center items-center rounded-lg border border-gray-800 text-sm leading-[25px] cursor-pointer",
                  {
                    "border-white": data.hairColor === color.value,
                  }
                )}
                style={{
                  background: color.src,
                  color: color.label === "White" ? "black" : "white",
                }}
              >
                <input
                  className="hidden"
                  type="radio"
                  value={color.value}
                  id={`hair_color_${color.value}`}
                  checked={data.hairColor === color.value}
                  onChange={() =>
                    handleSelectionChange("hairColor", color.value)
                  }
                />
                <label
                  htmlFor={`hair_color_${color.value}`}
                  className="flex justify-center cursor-pointer items-center h-10 rounded-lg w-full"
                >
                  {color.label}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default StepThree;
