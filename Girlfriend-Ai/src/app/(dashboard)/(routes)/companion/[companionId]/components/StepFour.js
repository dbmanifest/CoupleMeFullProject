"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

const StepFour = ({ data, updateData }) => {
  const [bodyTypes, setBodytypes] = useState([]);
  const [breastSizes, setBreastsizes] = useState([]);
  const [buttSizes, setButtsizes] = useState([]);

  const fetchData = async () => {
    try {
      const [bodyTypesRes, breastSizesRes, buttSizesRes] = await Promise.all([
        axios.get("/api/bodytype"),
        axios.get("/api/breastsize"),
        axios.get("/api/buttsize"),
      ]);
      setBodytypes(bodyTypesRes.data);
      setBreastsizes(breastSizesRes.data);
      setButtsizes(buttSizesRes.data);
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
            Choose Body Type*
          </legend>
          <div className="flex flex-wrap justify-start md:justify-center items-start mx-4 lg:mx-5 lg:gap-5 gap-[15px] font-medium">
            {bodyTypes.map(({ label, imageSrc }) => (
              <div
                key={label}
                className={classNames(
                  "text-[13px] relative rounded-xl border",
                  {
                    "border-white": data.bodyType === label,
                    "border-transparent": data.bodyType !== label,
                  }
                )}
              >
                <input
                  className="hidden"
                  type="radio"
                  id={`body_${label.toLowerCase()}`}
                  name="bodyType"
                  value={label}
                  checked={data.bodyType === label}
                  onChange={() => handleSelectionChange("bodyType", label)}
                />
                <label htmlFor={`body_${label.toLowerCase()}`}>
                  <img
                    alt={label}
                    className="cursor-pointer rounded-xl object-cover w-[88px] h-[88px] lg:w-[120px] lg:h-[120px]"
                    src={imageSrc}
                  />
                  <div
                    className={classNames(
                      "text-white flex items-center justify-center whitespace-nowrap h-[25px] leading-[25px] absolute bottom-[6px] lg:bottom-[10px] left-1/2 transform -translate-x-1/2 py-[8px] px-[10px] rounded-full pill",
                      {
                        "pill-active": data.bodyType === label,
                        "pill-inactive": data.bodyType !== label,
                      }
                    )}
                  >
                    {label}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col mx-auto font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10 pb-4 lg:pb-8">
            Choose Breast Size*
          </legend>
          <div className="flex flex-wrap justify-start md:justify-center items-start mx-4 lg:mx-5 lg:gap-5 gap-[15px] font-medium">
            {breastSizes.map(({ label, imageSrc }) => (
              <div
                key={label}
                className={classNames(
                  "text-[13px] relative rounded-xl border",
                  {
                    "border-white": data.breastSize === label,
                    "border-transparent": data.breastSize !== label,
                  }
                )}
              >
                <input
                  className="hidden"
                  type="radio"
                  id={`breast_${label.toLowerCase()}`}
                  name="breastSize"
                  value={label}
                  checked={data.breastSize === label}
                  onChange={() => handleSelectionChange("breastSize", label)}
                />
                <label htmlFor={`breast_${label.toLowerCase()}`}>
                  <img
                    alt={label}
                    className="cursor-pointer rounded-xl object-cover w-[88px] h-[88px] lg:w-[120px] lg:h-[120px]"
                    src={imageSrc}
                  />
                  <div
                    className={classNames(
                      "text-white flex items-center justify-center whitespace-nowrap h-[25px] leading-[25px] absolute bottom-[6px] lg:bottom-[10px] left-1/2 transform -translate-x-1/2 py-[8px] px-[10px] rounded-full pill",
                      {
                        "pill-active": data.breastSize === label,
                        "pill-inactive": data.breastSize !== label,
                      }
                    )}
                  >
                    {label}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col mx-auto font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10 pb-4 lg:pb-8">
            Choose Butt Size*
          </legend>
          <div className="flex flex-wrap justify-start md:justify-center items-start mx-4 lg:mx-5 lg:gap-5 gap-[15px] font-medium mb-9">
            {buttSizes.map(({ label, imageSrc }) => (
              <div
                key={label}
                className={classNames(
                  "text-[13px] relative rounded-xl border",
                  {
                    "border-white": data.buttSize === label,
                    "border-transparent": data.buttSize !== label,
                  }
                )}
              >
                <input
                  className="hidden"
                  type="radio"
                  id={`butt_${label.toLowerCase()}`}
                  name="buttSize"
                  value={label}
                  checked={data.buttSize === label}
                  onChange={() => handleSelectionChange("buttSize", label)}
                />
                <label htmlFor={`butt_${label.toLowerCase()}`}>
                  <img
                    alt={label}
                    className="cursor-pointer rounded-xl object-cover w-[88px] h-[88px] lg:w-[120px] lg:h-[120px]"
                    src={imageSrc}
                  />
                  <div
                    className={classNames(
                      "text-white flex items-center justify-center whitespace-nowrap h-[25px] leading-[25px] absolute bottom-[6px] lg:bottom-[10px] left-1/2 transform -translate-x-1/2 py-[8px] px-[10px] rounded-full pill",
                      {
                        "pill-active": data.buttSize === label,
                        "pill-inactive": data.buttSize !== label,
                      }
                    )}
                  >
                    {label}
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

export default StepFour;
