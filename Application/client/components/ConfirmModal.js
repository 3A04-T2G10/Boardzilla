import React from "react";
import PropTypes from "prop-types";

export default function ConfirmModal({ confirm, closeModal, deleteWidget }) {
  return (
    <div className={`modal confirm-modal ${confirm ? "is-active" : ""}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="card">
          <div className="card-content has-text-centered">
            Are you sure you wanted to delete this widget?
          </div>
          <footer className="card-footer">
            <a
              className="card-footer-item"
              onClick={closeModal}
              onKeyPress={closeModal}
            >
              Cancel
            </a>
            <a
              className="card-footer-item"
              onClick={deleteWidget}
              onKeyPress={deleteWidget}
            >
              Delete
            </a>
          </footer>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      />
    </div>
  );
}
ConfirmModal.propTypes = {
  confirm: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  deleteWidget: PropTypes.func.isRequired,
};
