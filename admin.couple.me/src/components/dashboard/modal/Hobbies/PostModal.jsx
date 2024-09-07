"use client";

import { useState } from "react";

export default function PostModal({ onSave }) {
  const [label, setLabel] = useState(""); // Use 'label' for the name
  const [value, setValue] = useState(""); // Use 'value' for the description

  const handleSave = async () => {
    const newStyle = {
      label,
      value,
    };

    onSave(newStyle); // Pass the collected data to the parent component
    // Clear the form fields
    setLabel("");
    setValue("");
  };

  return (
    <div
      className="modal fade"
      id="hobbiesPostModal"
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
          <h2 className="form-label font-bold text-lg h-9 flex items-center">Add Hobby</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Hobby</label>
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
