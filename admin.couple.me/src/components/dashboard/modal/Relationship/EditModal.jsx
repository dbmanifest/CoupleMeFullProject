"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function EditModal({ style, onSave }) {
  const [label, setLabel] = useState(style?.label || ""); // Renamed name to label
  const [value, setValue] = useState(style?.value || ""); // Renamed description to value // Renamed description to value
  const [imageSrc, setImageSrc] = useState(style?.imageSrc || "");

  useEffect(() => {
    if (style) {
      setLabel(style.label || ""); // Set label from style
      setValue(style.value || ""); // Set value from style
      setImageSrc(style.imageSrc || "");
    }
  }, [style]);

  const handleSave = () => {
    const updatedCompanion = {
      ...style,
      label,
      value,
      imageSrc,
    };
    onSave(updatedCompanion);
    setImageSrc("");
    setLabel("");
    setValue("");
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
          <h2 className="form-label font-bold text-lg h-9 flex items-center">Edit Relationship</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Relationship</label>
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
