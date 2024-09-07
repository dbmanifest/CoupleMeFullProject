"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Category, Companion } from "@prisma/client/edge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";
import StepEight from "./StepEight";
import { Toaster } from "@/components/ui/toaster";

interface CompanionFormProps {
  categories: Category[];
  initialData: Companion | null;
}

export const CompanionForm = ({
  categories,
  initialData,
}: CompanionFormProps) => {
  const { toast } = useToast(); // Toast notification handler
  const router = useRouter(); // Next.js router instance
  const [isGenerating, setIsGenerating] = useState(false);
  const [baseUuid, setBaseUuid] = useState("");
  const [srcUuid, setSrcUuid] = useState("");

  // Initial form data state
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
    name: "",
    gender: "",
    charachteristics: {},
    cfg: 3,
    width: 300,
    height: 300,
    seed: 1,
    face_positive_prompt: "",
    src_positive_prompt: "",
    negative_prompt: "",
    prompt: "",
  });

  const [currentStep, setCurrentStep] = useState(1); // Current step in the form wizard

  // Load saved form data and step from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
    if (savedData) {
      setFormData(savedData);
    }

    const savedStep = localStorage.getItem("currentStep");
    if (savedStep) {
      setCurrentStep(Number(savedStep));
    }
  }, []);

  // Update form data and save to localStorage
  const updateData = (newData: any) => {
    const updatedData = {
      ...formData,
      ...newData,
    };
    setFormData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    checkValidation(updatedData); // Validate and potentially update the step
  };

  // Validate form data to determine the current step
  const checkValidation = (updatedData: any) => {
    if (updatedData.hasOwnProperty("relationship") && updatedData.relationship !== "") {
      setCurrentStep(8);
    } else if (updatedData.hasOwnProperty("occupation") && updatedData.occupation !== "" && Array.isArray(updatedData.hobbies) && updatedData.hobbies.length === 3) {
      setCurrentStep(7);
    } else if (updatedData.hasOwnProperty("personality") && updatedData.personality !== "") {
      setCurrentStep(6);
    } else if (updatedData.hasOwnProperty("bodyType") && updatedData.bodyType !== "" && updatedData.hasOwnProperty("breastSize") && updatedData.breastSize !== "" && updatedData.hasOwnProperty("buttSize") && updatedData.buttSize !== "") {
      setCurrentStep(5);
    } else if (updatedData.hasOwnProperty("hairStyle") && updatedData.hairStyle !== "" && updatedData.hasOwnProperty("hairColor") && updatedData.hairColor !== "") {
      setCurrentStep(4);
    } else if (updatedData.hasOwnProperty("ethnicity") && updatedData.ethnicity !== "" && updatedData.hasOwnProperty("age") && updatedData.age !== "" && updatedData.hasOwnProperty("eyeColor") && updatedData.eyeColor !== "") {
      setCurrentStep(3);
    } else if (updatedData.hasOwnProperty("style") && updatedData.style !== "") {
      setCurrentStep(2);
    }

    localStorage.setItem("currentStep", currentStep.toString());
  };

  // Proceed to the next step
  const nextStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    localStorage.setItem("currentStep", nextStep.toString());
  };

  // Go back to the previous step
  const prevStep = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    localStorage.setItem("currentStep", prevStep.toString());
  };

  // Render the current step component
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
      default:
        return null;
    }
  };

  // Generate a descriptive prompt from the form data
  const generatePrompt = (formData: any) => {
    const {
      style,
      ethnicity,
      age,
      eyeColor,
      hairStyle,
      hairColor,
      bodyType,
      breastSize,
      buttSize,
      personality,
      occupation,
      hobbies,
      relationship,
      clothing,
      name
    } = formData;

    return `Imagine a ${style} character, an ${ethnicity} in their ${age} with ${eyeColor} eyes and ${hairStyle} ${hairColor} hair. They have an ${bodyType} build, with ${breastSize} breasts and a ${buttSize} butt. This character has a ${personality}-like personality and works as a ${occupation}. They enjoy ${hobbies.join(
      ", "
    )}. You know them as a ${relationship}, and they often wear ${clothing} clothing.`;
  };
  const pollForImages = async (baseUuid: string, srcUuid: string, characteristics: any) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await axios.get(`/api/poll-image-base?baseUuid=${baseUuid}&srcUuid=${srcUuid}&charachteristics=${JSON.stringify(characteristics)}`);
        if (response.status === 200) {
          clearInterval(pollInterval);
          setIsGenerating(false);
          toast({
            description: "Character created successfully!",
            duration: 3000,
          });
          router.refresh();
          router.push("/");
        } else if (response.status === 202) {
          // Images are still being generated, continue polling
        } else {
          clearInterval(pollInterval);
          setIsGenerating(false);
          toast({
            variant: "destructive",
            description: "Error creating character. Please try again.",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error polling for images:", error);
        clearInterval(pollInterval);
        setIsGenerating(false);
        toast({
          variant: "destructive",
          description: "Error creating character. Please try again.",
          duration: 3000,
        });
      }
    }, 2000); // Poll every 2 seconds
  };

  // Handle form submission
  const onSubmit = async () => {
    const requiredFields = [
      "style",
      "ethnicity",
      "age",
      "eyeColor",
      "hairStyle",
      "hairColor",
      "bodyType",
      "breastSize",
      "buttSize",
      "personality",
      "occupation",
      "hobbies",
      "relationship",
      "clothing",
      "name",
    ];

    // Check for missing required fields
    const missingFields = requiredFields.filter((key) => {
      const value = formData[key as keyof typeof formData];
      return Array.isArray(value) ? value.length === 0 : !value;
    });

    if (missingFields.length > 0) {
      toast({
        variant: "destructive",
        description: "Please fill in all the required fields before submitting.",
        duration: 3000,
      });
      return;
    }


    toast({
      description: "Please Wait As Your Charachter Is Created, This May To A Minute Or Two.",
      duration: 3000,
    });


    const prompt = generatePrompt(formData);

    try {
      if (initialData) {
        const traits = `${formData.personality}, ${formData.occupation}, ${formData.hobbies.join(", ")}`;
        const backStory = `${formData.name} has the following relationship with the user: ${formData.relationship}. She works as a ${formData.occupation} and enjoys ${formData.hobbies.join(", ")}.`;
        // Update existing character
        const characteristics = {
          name: formData.name,
          age: formData.age,
          bodyType: formData.bodyType,
          breastSize: formData.breastSize,
          buttSize: formData.buttSize,
          eyeColor: formData.eyeColor,
          hairColor: formData.hairColor,
          hairStyle: formData.hairStyle,
          backStory: backStory,
          ethnicity: formData.ethnicity,
          gender: formData.gender,
          personality: formData.personality,
          occupation: formData.occupation,
          hobbies: formData.hobbies,
          relationship: formData.relationship,
          prompt: prompt,
          traits: traits,
  

        };
        // add characteristics to formData
        formData.charachteristics = characteristics;
        let response = await axios.patch(`/api/generate_consistent_character_base/${initialData.id}`, formData);
        if (response.data.baseUuid && response.data.srcUuid) {
          setBaseUuid(response.data.baseUuid);
          setSrcUuid(response.data.srcUuid);
          await pollForImages(response.data.baseUuid, response.data.srcUuid, characteristics);
        } 
      } else {
        // Create a new character
        const traits = `${formData.personality}, ${formData.occupation}, ${formData.hobbies.join(", ")}`;
        const backStory = `${formData.name} has the following relationship with the user: ${formData.relationship}. She works as a ${formData.occupation} and enjoys ${formData.hobbies.join(", ")}.`;

        const charachteristics = {
          name: formData.name,
          age: formData.age,
          bodyType: formData.bodyType,
          breastSize: formData.breastSize,
          buttSize: formData.buttSize,
          eyeColor: formData.eyeColor,
          hairColor: formData.hairColor,
          hairStyle: formData.hairStyle,          
          ethnicity: formData.ethnicity,
          gender: formData.gender,
          personality: formData.personality,
          occupation: formData.occupation,
          hobbies: formData.hobbies,
          relationship: formData.relationship,
          prompt: prompt,
          traits: traits,
          backStory: backStory,
        };
        // add characteristics to formData
        formData.charachteristics = charachteristics;
        let response = await axios.post("/api/generate_consistent_character_base", formData);
        if (response.data.baseUuid && response.data.srcUuid) {
          setBaseUuid(response.data.baseUuid);
          setSrcUuid(response.data.srcUuid);
          await pollForImages(response.data.baseUuid, response.data.srcUuid, charachteristics);
        } 
      }



      // Clear localStorage and redirect
      localStorage.removeItem("formData");
      localStorage.removeItem("currentStep");

    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h4 className="text-3xl font-bold">
          <span className="text-primary">Create</span> AI Character
        </h4>
      </div>
      <div className="multi-step-form mt-4">
        {renderStep()} {/* Render the current step component */}
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
              onClick={onSubmit}
              className="relative min-w-[140px] px-4 py-3 text-white rounded-[10px] bg-[#E75275] ml-auto w-[140px] lg:w-auto cursor-pointer justify-center items-center gap-3 flex"
            >
              Create Your AI
            </button>
          )}
        </div>
      </div>
      <Toaster /> {/* Display toast notifications */}
    </>
  );
};
