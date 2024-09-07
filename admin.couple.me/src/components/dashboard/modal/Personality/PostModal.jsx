"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function PostModal({ onSave }) {
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [imageSrc, setImageSrc] = useState(""); // State for the image source
  const [description, setDesc] = useState("");

  const handleSave = () => {
    const newStyle = {
      label,
      value,
      imageSrc,
      description,
    };
    onSave(newStyle); // Pass the collected data to the parent component
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
      id="personalityPostModal"
      tabIndex={-1}
      aria-labelledby="stylePostModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content position-relative">
          <button
            type="button"
            className="btn-close position-absolute"
            aria-label="Close"
            data-bs-dismiss="modal"
            style={{ top: "10px", right: "10px", zIndex: "9" }}
          />
          <div className="modal-body p-4">
          <h2 className="form-label font-bold text-lg h-9 flex items-center">Add Personality</h2>
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
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
