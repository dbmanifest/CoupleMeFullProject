"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function EditModal({ ethnicity, onSave }) {
  const [label, setLabel] = useState(ethnicity?.label || ""); // Renamed name to label
  const [value, setValue] = useState(ethnicity?.value || ""); // Renamed description to value
  const [src, setSrc] = useState(ethnicity?.src || ""); // Renamed description to value


  useEffect(() => {
    if (ethnicity) {
      setLabel(ethnicity.label || ""); 
      setValue(ethnicity.value || ""); 
      setSrc(ethnicity.src || ""); 
    }
  }, [ethnicity]);

  const handleSave = async () => {
    const updatedCompanion = {
      ...ethnicity,
      label: label, // Updated key to name
      value: value, // Updated key to description
      src: src, // Updated key to description
    };
    
    const response = await fetch(`/api/ethnicity/${ethnicity.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCompanion),
    });

    if (response.ok) {
      const data = await response.json();
      onSave(data);
    } else {
      console.error("Failed to update ethnicity");
    }

    // Clear the form fields
    setSrc("");
    setLabel("");
    setValue("");
  };

  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      setSrc(result.info.secure_url);
    }
  };

  return (
    <div
      className="modal fade"
      id="proposalModal"
      tabIndex={-1}
      aria-labelledby="proposalModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content position-relative">
          <button
            type="button"
            className="btn-close position-absolute"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ top: "10px", right: "10px", zIndex: "9" }}
          />
          <div className="modal-body p-4">
          <h2 className="form-label font-bold text-lg h-9 flex items-center">Edit Ethnicity</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Label</label>
                <input
                  type="text"
                  className="form-control"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Value</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
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
