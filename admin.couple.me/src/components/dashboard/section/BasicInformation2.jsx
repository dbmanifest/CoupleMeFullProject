"use client";
import { useState } from "react";
import SelectInput from "../option/SelectInput";
import Link from "next/link";
import axios from "axios";

export default function BasicInformation2() {
  // Initialize state with companion data
  const [formData, setFormData] = useState({});

  // Handlers for form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/companion", formData);
      console.log("Data submitted successfully:", response.data);
      // Handle successful submission
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error
    }
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Basic Information</h5>
        </div>
        <form className="form-style1" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12">
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">
                  Description
                </label>
                <textarea
                  cols={30}
                  rows={6}
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">
                  Instructions
                </label>
                <textarea
                  cols={30}
                  rows={6}
                  className="form-control"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">
                  Traits
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="traits"
                  value={formData.traits}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">
                  Category ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="text-start">
                <button type="submit" className="ud-btn btn-thm">
                  Save
                  
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
