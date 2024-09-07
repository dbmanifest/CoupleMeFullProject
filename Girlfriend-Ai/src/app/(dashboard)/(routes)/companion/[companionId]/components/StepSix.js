"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

const StepSix = ({ data, updateData }) => {
  const [occupations, setOccupations] = useState([]);
  const [hobbies, setHobbies] = useState([]);

  const fetchData = async () => {
    try {
      const [occupationsResponse, hobbiesResponse] = await Promise.all([
        axios.get("/api/occupations"),
        axios.get("/api/hobbies"),
      ]);
      setOccupations(occupationsResponse.data);
      setHobbies(hobbiesResponse.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOccupationChange = (event) => {
    updateData({ ...data, occupation: event.target.value });
  };

  const handleHobbyChange = (event) => {
    const selectedHobbies = data.hobbies || [];
    if (event.target.checked) {
      updateData({
        ...data,
        hobbies: [...selectedHobbies, event.target.value],
      });
    } else {
      updateData({
        ...data,
        hobbies: selectedHobbies.filter(
          (hobby) => hobby !== event.target.value
        ),
      });
    }
  };

  return (
    <div>
      <div className="h-auto flex-col justify-start w-full bg-popup rounded-xl z-10 border border-[#282828] mb-5">
        <fieldset className="flex flex-col mx-auto font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10 pb-4 lg:pb-8">
            Choose Occupation*
          </legend>
          <div className="flex flex-wrap justify-start items-start mx-5 lg:mx-10 gap-[8px] font-medium">
            {occupations.map(({ value, label }) => (
              <div
                key={value}
                className={classNames(
                  "text-[14px] rounded-xl text-white h-[30px] px-3 py-2 leading-[14px] select-none cursor-pointer",
                  {
                    "pill-option-active": data.occupation === value,
                    "pill-option-inactive": data.occupation !== value,
                  }
                )}
              >
                <input
                  className="hidden"
                  type="radio"
                  value={value}
                  id={`profile_occupation_${value
                    .replace(/\s+/g, "_")
                    .toLowerCase()}`}
                  onChange={handleOccupationChange}
                  checked={data.occupation === value}
                />
                <label
                  htmlFor={`profile_occupation_${value
                    .replace(/\s+/g, "_")
                    .toLowerCase()}`}
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset
          className="flex flex-col mx-auto font-semibold mb-9"
          id="hobbies"
        >
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10">
            Choose Hobbies*
          </legend>
          <p className="text-[#A4A4A4] font-normal text-center text-[14px] lg:text-[14px] lg:leading-[20px] pt-1 lg:pt-2 pb-4 lg:pb-8">
            You can choose up to 3 variants
          </p>
          <div className="flex flex-wrap justify-start items-start mx-5 lg:mx-10 gap-[8px] font-medium">
            {hobbies.map(({ value, label }) => (
              <p
                key={value}
                className={classNames(
                  "text-[14px] rounded-xl text-white h-[30px] px-3 py-2 leading-[14px] select-none cursor-pointer",
                  {
                    "pill-option-active":
                      data.hobbies && data.hobbies.includes(value),
                    "pill-option-inactive": !(
                      data.hobbies && data.hobbies.includes(value)
                    ),
                  }
                )}
                data-value={value}
              >
                <input
                  type="checkbox"
                  name="profile[hobby_types][]"
                  id={`profile_hobby_types_${value
                    .replace(/\s+/g, "_")
                    .toLowerCase()}`}
                  value={value}
                  onChange={handleHobbyChange}
                  checked={data.hobbies && data.hobbies.includes(value)}
                  className="hidden"
                />
                <label
                  htmlFor={`profile_hobby_types_${value
                    .replace(/\s+/g, "_")
                    .toLowerCase()}`}
                >
                  {label}
                </label>
              </p>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default StepSix;
