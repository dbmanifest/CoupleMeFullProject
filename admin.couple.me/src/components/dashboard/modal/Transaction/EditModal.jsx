"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function EditModal({ style, onSave }) {
  const [amount, setAmount] = useState(style?.amount || ""); // Renamed name to label

  useEffect(() => {
    if (style) {
      setAmount(style.amount || ""); // Set label from style
    }
  }, [style]);

  const handleSave = async() => {
    const updatedCompanion = {
      ...style,
      amount: amount, // Updated key to name
    };
    const response = await fetch(`/api/hairstyles/${style.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCompanion),
    });

    if (response.ok) {
      const data = await response.json();
      onSave(data);
    } else {
      console.error("Failed to update hairstyle");
    }

    // Clear the form fields
    setAmount("");
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
          <h2 className="form-label font-bold text-lg h-9 flex items-center">Edit Transaction</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Amount</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={amount}
                  onChange={(e) => setType(e.target.value)}
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
