"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";

export default function CompanionPostModal({ onSave, categories }) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [src, setSrc] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [seed, setSeed] = useState("");
  const [backstory, setBackstory] = useState("");
  const [traits, setTraits] = useState("");
  const [age, setAge] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  const handleSave = async () => {
    const newCompanion = {
      userId: user?.id || "",
      userName: user?.fullName || "",
      name,
      src,
      description,
      instructions,
      seed,
      backstory,
      traits,
      age: parseInt(age),
      categoryId,
    };

    onSave(newCompanion);
    // Reset form fields after save
    setName("");
    setSrc("");
    setDescription("");
    setInstructions("");
    setSeed("");
    setBackstory("");
    setTraits("");
    setAge(0);
    setCategoryId("");
  };

  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      setSrc(result.info.secure_url);
    }
  };


  return (
    <div
      className="modal fade"
      id="companionPostModal"
      tabIndex={-1}
      aria-labelledby="companionPostModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" style={{maxWidth: "1000px"}}>
        <div className="modal-content position-relative">
          <button
            type="button"
            className="btn-close position-absolute"
            aria-label="Close"
            data-bs-dismiss="modal"
            style={{ top: "10px", right: "10px", zIndex: "9" }}
          />
          <div className="modal-body p-4">
            <h2 className="form-label font-bold text-lg h-9 flex items-center" >Add Companion</h2>
            <form>
              <div className="mb-3 ">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <CldUploadWidget
                  uploadPreset="dw57cnfe"
                  onSuccess={handleUploadSuccess}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      className="btn btn-secondary ml-6"
                      style={{color: "white"}}
                      onClick={open}
                    >
                      Upload Image
                    </button>
                  )}
                </CldUploadWidget>
                {src && (
                  <img
                    src={src}
                    alt="Uploaded Image"
                    style={{ marginTop: "10px", width: "100%" }}
                  />
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Instructions</label>
                <textarea
                  className="form-control"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Seed</label>
                <input
                  type="text"
                  className="form-control"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Backstory</label>
                <textarea
                  className="form-control"
                  value={backstory}
                  onChange={(e) => setBackstory(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Traits</label>
                <input
                  type="text"
                  className="form-control"
                  value={traits}
                  onChange={(e) => setTraits(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-control"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="ud-btn btn-thm"
                onClick={handleSave}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Save

              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
