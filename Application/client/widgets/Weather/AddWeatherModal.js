import React from "react";
import PropTypes from "prop-types";
import AddWeather from "./AddWeather";

export default function AddWeatherModal({ open, closeModal }) {
  return (
    <div className={`modal confirm-modal ${open ? "is-active" : ""}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <AddWeather closeModal={closeModal} />
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      />
    </div>
  );
}
AddWeatherModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
