export default function DeleteModal({ onClose, onConfirm }) {
  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex={-1}
      aria-labelledby="deleteModalLabel"
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
            onClick={onClose}
          />
          <div className="modal-body p-4">
            <h5 className="modal-title" id="deleteModalLabel">
              Are you sure you want to delete this companion?
            </h5>
            <div className="mt-4 text-right">
              <button
                type="button"
                className="btn btn-danger me-2"
                data-bs-dismiss="modal"
                onClick={onConfirm}
              >
                Yes, delete
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
