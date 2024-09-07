"use client";

import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";
import StepEight from "./StepEight";
import StepNine from "./StepNine";

const Wizard = () => {
  const [formData, setFormData] = useState({
    style: "",
    ethnicity: "",
    age: "",
    eyeColor: "",
    hairStyle: "",
    hairColor: "",
    bodyType: "",
    breastSize: "",
    buttSize: "",
    personality: "",
    occupation: "",
    hobbies: [],
    relationship: "",
    clothing: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updateData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };


  const handleSubmit = async () => {
    // console.log("Form Data Submitted:", formData);
    // Optionally, you can also add form submission logic here, e.g., sending data to an API
    // send formData to /api/generate_consistent_character_base
    // we need to first add all the traits to a characteristics object, so that itll work when we pull it with   const { seed, cfg, width, height, charachteristics } = await req.json();
    const characteristics = {
      name: formData.name,
      age: formData.age,
      ethnicity: formData.ethnicity,
      gender: formData.gender,
      personality: formData.personality,
      occupation: formData.occupation,
      hobbies: formData.hobbies,
      relationship: formData.relationship,
    };
    // add characteristics to formData
    formData.characteristics = characteristics;
    // add cfg, width, height, seed to formData
    formData.cfg = 3
    formData.width = 300
    formData.height = 300
    formData.seed = 1
    formData.face_positive_prompt = formData.face_positive_prompt
    formData.src_positive_prompt = formData.src_positive_prompt
    formData.negative_prompt = formData.negative_prompt

    const response = await axios.post('/api/generate_consistent_character_base', formData);
    console.log(response);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne data={formData} updateData={updateData} />;
      case 2:
        return <StepTwo data={formData} updateData={updateData} />;
      case 3:
        return <StepThree data={formData} updateData={updateData} />;
      case 4:
        return <StepFour data={formData} updateData={updateData} />;
      case 5:
        return <StepFive data={formData} updateData={updateData} />;
      case 6:
        return <StepSix data={formData} updateData={updateData} />;
      case 7:
        return <StepSeven data={formData} updateData={updateData} />;
      case 8:
        return <StepEight data={formData} updateData={updateData} />;
      case 9:
        return <StepNine data={formData} updateData={updateData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h4 className="text-3xl font-bold">
          <span className="text-primary">Create</span> AI Character
        </h4>
      </div>
      <div className="multi-step-form  mt-4">
        {renderStep()}
        <div className="flex justify-between mt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="md:w-[140px] w-full px-4 py-3 rounded-[10px] border-2 border-[#A4A4A4] cursor-pointer justify-center items-center gap-3 flex"
            >
              Previous
            </button>
          )}
          {currentStep < 8 && (
            <button
              type="button"
              onClick={nextStep}
              className="relative min-w-[140px] px-4 py-3 text-white rounded-[10px] bg-[#E75275] ml-auto w-[140px] lg:w-auto cursor-pointer justify-center items-center gap-3 flex"
            >
              Next
            </button>
          )}
          {currentStep === 8 && (
            <button
              type="button"
              onClick={handleSubmit}
              className="relative min-w-[140px] px-4 py-3 text-white rounded-[10px] bg-[#E75275] ml-auto w-[140px] lg:w-auto cursor-pointer justify-center items-center gap-3 flex"
            >
              Create Your AI
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Wizard;
