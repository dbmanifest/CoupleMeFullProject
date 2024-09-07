"use client";

import { useEffect, useState } from "react";

export default function EditModal({ style, onSave }) {
  const [label, setLabel] = useState(style?.label || ""); // Renamed name to label
  const [value, setValue] = useState(style?.value || "");
  const [src, setSrc] = useState(style?.src || "");
  useEffect(() => {
    if (style) {
      setLabel(style.label || ""); // Set label from style
      setValue(style.value || ""); // Set value from style
      setSrc(style.src || "");
    }
  }, [style]);

  const handleSave = async() => {
    const updatedCompanion = {
      ...style,
      label: label,
      value: value, 
      src: src
    };
    const response = await fetch(`/api/haircolors/${style.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCompanion),
    });

    if (response.ok) {
      const data = await response.json();
      onSave(data);
    } else {
      console.error("Failed to update haircolor");
    }

    // Clear the form fields
    setSrc("");
    setLabel("");
    setValue("");
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
          <h2 className="form-label font-bold text-lg h-9 flex items-center">Edit Haircolor</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Hair Color</label>
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
              <label className="form-label">Color</label>
              <input
                type="text"
                className="form-control"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
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
