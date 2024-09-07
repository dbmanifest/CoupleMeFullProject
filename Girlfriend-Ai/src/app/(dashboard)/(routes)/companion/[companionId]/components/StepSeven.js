import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

const StepSeven = ({ data, updateData }) => {
  const [relationshipOptions, setRelationshipOptions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/relationships")
      .then((response) => {
        setRelationshipOptions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the style options!", error);
      });
  }, []);

  const handleRelationshipChange = (event) => {
    updateData({ ...data, relationship: event.target.value });
  };

  return (
    <div>
      <div className="h-auto flex-col justify-start w-full bg-popup rounded-xl z-10 border border-[#282828] mb-5">
        <fieldset className="flex flex-col mx-auto font-semibold">
          <legend className="text-[#E1E1E1] w-full font-semibold text-center text-[14px] lg:text-[20px] lg:leading-8 pt-5 lg:pt-10 pb-4 lg:pb-8">
            Choose Relationship*
          </legend>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-5 mb-9 mx-auto">
            {relationshipOptions.map((option) => (
              <div
                key={option.value}
                className={classNames(
                  "text-[13px] relative cursor-pointer rounded-xl",
                  {
                    "relationship-option-active":
                      data.relationship === option.value,
                    "relationship-option-inactive":
                      data.relationship !== option.value,
                  }
                )}
              >
                <input
                  className="hidden"
                  type="radio"
                  value={option.value}
                  id={`profile_relationship_${option.value
                    .replace(/\s+/g, "_")
                    .toLowerCase()}`}
                  onChange={handleRelationshipChange}
                  checked={data.relationship === option.value}
                />
                <label
                  htmlFor={`profile_relationship_${option.value
                    .replace(/\s+/g, "_")
                    .toLowerCase()}`}
                  className="cursor-pointer pl-[9.50px] pr-[8.50px] pt-5 pb-2.5 flex flex-col items-center gap-4 justify-center bg-stone-900 rounded-[10px] border border-zinc-800"
                >
                  <img
                    alt={option.label}
                    className="rounded-xl lg:w-12 lg:h-12 w-8 h-8"
                    src={option.imageSrc}
                  />
                  <div
                    className={classNames(
                      "text-white flex items-center justify-center whitespace-nowrap h-[25px] leading-[25px] py-[8px] px-[10px] rounded-full pill",
                      {
                        "pill-active": data.relationship === option.value,
                        "pill-inactive": data.relationship !== option.value,
                      }
                    )}
                  >
                    {option.label}
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

export default StepSeven;
