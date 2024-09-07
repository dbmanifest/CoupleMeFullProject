"use client";

import { useEffect, useState } from "react";

export default function EditModal({ style, onSave }) {
  const [label, setLabel] = useState(style?.label || ""); // Renamed name to label
  const [value, setValue] = useState(style?.value || ""); // Renamed description to value // Renamed description to value

  useEffect(() => {
    if (style) {
      setLabel(style.label || ""); // Set label from style
      setValue(style.value || ""); // Set value from style
    }
  }, [style]);

  const handleSave = () => {
    const updatedCompanion = {
      ...style,
      label: label, // Updated key to name
      value: value, // Updated key to description
    };
    onSave(updatedCompanion);
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
          <h2 className="form-label font-bold text-lg h-9 flex items-center">Edit Occupation</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Occupation</label>
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
                Update
                
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
