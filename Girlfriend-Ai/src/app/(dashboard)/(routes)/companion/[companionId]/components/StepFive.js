import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

const StepFive = ({ data, updateData }) => {
  const [personalities, setPersonalities] = useState([]);

  useEffect(() => {
    axios
      .get("/api/personalities")
      .then((response) => {
        setPersonalities(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the style options!", error);
      });
  }, []);

  const handlePersonalityChange = (event) => {
    updateData({ ...data, personality: event.target.value });
  };

  return (
    <div>
      <div className="h-auto flex-col justify-start w-full bg-popup rounded-xl z-10 border border-[#282828] mb-5">
        <fieldset className="flex flex-col mx-auto font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10 pb-4 lg:pb-8">
            Choose Personality*
          </legend>
          <div className="flex flex-wrap gap-4 mb-10 lg:gap-6 justify-center">
            {personalities.map((personality) => (
              <div
                key={personality.value}
                className={classNames(
                  "cursor-pointer flex justify-start items-start p-[10px] lg:w-[230px] lg:h-[125px] w-[140px] h-[160px] rounded-[10px] text-white border bg-[#1F1F1F]",
                  {
                    "border-white": data.personality === personality.value,
                    "border-[#282828]": data.personality !== personality.value,
                  }
                )}
              >
                <input
                  className="hidden"
                  type="radio"
                  value={personality.value}
                  id={personality.id}
                  name="profile[personality]"
                  onChange={handlePersonalityChange}
                  checked={data.personality === personality.value}
                />
                <label htmlFor={personality.id} className="cursor-pointer">
                  <img
                    alt={personality.label}
                    className="w-6 h-6"
                    src={personality.imageSrc}
                  />
                  <div className="text-start text-[14px] leading-[14px] text-white font-semibold mt-3">
                    {personality.label}
                  </div>
                  <div className="text-[12px] leading-[16px] text-[#E1E1E1] font-medium mt-2">
                    {personality.description}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default StepFive;
