import React from "react";
import PropTypes from "prop-types";
import AddNews from "./AddNews";
export default function AddNewsModal({ open, closeModal, widgetCount, x, y, updateList }) {
  return (
    <div className={`modal confirm-modal ${open ? "is-active" : ""}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <AddNews closeModal={closeModal} widgetCount={widgetCount} x={x} y={y} updateList={updateList}/>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      />
    </div>
  );
}
AddNewsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
