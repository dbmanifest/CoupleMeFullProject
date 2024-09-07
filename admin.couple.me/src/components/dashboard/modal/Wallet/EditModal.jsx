"use client";

import { useEffect, useState } from "react";

export default function EditModal({ style, onSave }) {
  const [balance, setBalance] = useState(style?.balance || ""); // Renamed description to value

  useEffect(() => {
    if (style) {
      setBalance(style.balance || ""); // Set value from style
    }
  }, [style]);

  const handleSave = async () => {
    const updatedCompanion = {
      ...style,
      balance: parseInt(balance), // Updated key to description
    };
    const response = await fetch(`/api/wallet/${style.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCompanion),
    });

    if (response.ok) {
      const data = await response.json();
      onSave(data);
    } else {
      console.error("Failed to update wallet");
    }

    // Clear the form fields
    setBalance("");
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
            <h2 className="form-label font-bold text-lg h-9 flex items-center">Edit Wallet Balance</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Wallet Balance</label>
                <input
                  type="text"
                  className="form-control"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
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
