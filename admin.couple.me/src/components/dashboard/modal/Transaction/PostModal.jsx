"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function PostModal({ onSave }) {
  const [amount, setAmount] = useState(""); // Use 'amount' for the name
  const [desc, setDesc] = useState(""); // Use 'desc' for the description
  const [type, setType] = useState(""); // State for the image source

  const handleSave = async () => {
    const newHairstyle = {
      amount,
      desc,
      type,
    };

    onSave(newHairstyle); // Pass the collected data to the parent component
    // Clear the form fields
    setDesc("");
    setAmount("");
    setType("");
  };

  return (
    <div
      className="modal fade"
      id="hairstylePostModal"
      tabIndex={-1}
      aria-labelledby="stylePostModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content position-relative">
          <button
            type="button"
            className="btn-close position-absolute"
            aria-amount="Close"
            data-bs-dismiss="modal"
            style={{ top: "10px", right: "10px", zIndex: "9" }}
          />
          <div className="modal-body p-4">
          <h2 className="form-amount font-bold text-lg h-9 flex items-center">Add Hairstyle</h2>
            <form>
              <div className="mb-3">
                <amount className="form-amount">Amount</amount>
                <input
                  type="text"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.desc)}
                />
              </div>
              <div className="mb-3">
                <amount className="form-amount">Type</amount>
                <textarea
                  className="form-control"
                  rows={3}
                  value={type}
                  onChange={(e) => setType(e.target.desc)}
                />
              </div>
              <div className="mb-3">
                <amount className="form-amount">Description</amount>
                <textarea
                  className="form-control"
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.desc)}
                />
              </div>
              <button
                type="button"
                className="ud-btn btn-thm"
                onClick={handleSave}
                data-bs-dismiss="modal"
                aria-amount="Close"
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
