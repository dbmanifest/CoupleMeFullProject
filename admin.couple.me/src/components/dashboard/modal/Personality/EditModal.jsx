"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function EditModal({ style, onSave }) {
  const [label, setLabel] = useState(style?.label || "");
  const [value, setValue] = useState(style?.value || "");
  const [imageSrc, setImageSrc] = useState(style?.imageSrc || "");
  const [description, setDesc] = useState(style?.description || "");

  useEffect(() => {
    if (style) {
      setLabel(style.label || "");
      setValue(style.value || "");
      setImageSrc(style.imageSrc || "");
      setDesc(style.description || "");
    }
  }, [style]);

  const handleSave = async () => {
    const updatedStyle = {
      ...style,
      label,
      value,
      imageSrc,
      description,
    };

    const response = await fetch(`/api/personality/${style.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStyle),
    });

    if (response.ok) {
      const data = await response.json();
      onSave(data);
    } else {
      console.error("Failed to update personality");
    }

    // Clear the form fields
    setImageSrc("");
    setLabel("");
    setValue("");
    setDesc("");
  };

  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      setImageSrc(result.info.secure_url);
    }
  };

  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex={-1}
      aria-labelledby="editModalLabel"
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
          <h2 className="form-label font-bold text-lg h-9 flex items-center">Edit Personality</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Personality</label>
                <input
                  type="text"
                  className="form-control"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Prompt</label>
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
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Uploaded Image"
                    style={{ marginTop: "10px", width: "100%" }}
                  />
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                />
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
