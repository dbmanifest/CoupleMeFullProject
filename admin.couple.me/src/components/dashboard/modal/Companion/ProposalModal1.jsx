"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function EditCompanionModal({ companion, onSave,categories }) {
  const [name, setName] = useState(companion?.name || "");
  const [description, setDescription] = useState(companion?.description || "");
  const [src, setSrc] = useState(companion?.src || "");
  const [instructions, setInstructions] = useState(
    companion?.instructions || ""
  );
  const [seed, setSeed] = useState(companion?.seed || "");
  const [backstory, setBackstory] = useState(companion?.backstory || "");
  const [traits, setTraits] = useState(companion?.traits || "");
  const [age, setAge] = useState(companion?.age || "");
  const [categoryId, setCategoryId] = useState(companion?.categoryId || "");

  useEffect(() => {
    if (companion) {
      setName(companion.name || "");
      setDescription(companion.description || "");
      setSrc(companion.src || "");
      setInstructions(companion.instructions || "");
      setSeed(companion.seed || "");
      setBackstory(companion.backstory || "");
      setTraits(companion.traits || "");
      setAge(companion.age || "");
      setCategoryId(companion.categoryId || "");
    }
  }, [companion]);

  const handleSave = async() => {
    const updatedCompanion = {
      ...companion,
      name,
      description,
      src,
      instructions,
      seed,
      backstory,
      traits,
      age: Number(age), // Convert age string to number
      categoryId,
    };

    const response = await fetch(`/api/companions/${companion.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCompanion),
    });

    if (response.ok) {
      const data = await response.json();
      onSave(data);
    } else {
      console.error("Failed to update companion");
    }

    onSave(updatedCompanion); // Pass the collected data to the parent component
    // Clear the form fields
    setName("");
    setDescription("");
    setSrc("");
    setInstructions("");
    setSeed("");
    setBackstory("");
    setTraits("");
    setAge("");
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
      id="editCompanionModal"
      tabIndex={-1}
      aria-labelledby="editCompanionModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" style={{maxWidth: "1000px"}}>
        <div className="modal-content position-relative">
          <button
            type="button"
            className="btn-close position-absolute"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ top: "10px", right: "10px", zIndex: "9" }}
          />
          <div className="modal-body p-4">
          <h2 className="form-label font-bold text-lg h-9 flex items-center">Edit Companion</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                      className="btn btn-secondary ml-6" style={{color: "white"}}
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
                <label className="form-label">Instructions</label>
                <textarea
                  className="form-control"
                  rows={3}
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
                  rows={3}
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
                  type="text"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
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
                Update
                
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
