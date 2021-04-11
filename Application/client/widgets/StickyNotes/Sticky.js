import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";

import { attemptUpdateSticky, attemptDeleteSticky } from "_thunks/stickies"; //

import ConfirmModal from "_components/ConfirmModal";

export default function Sticky({ id, text, color, textColor }) {
  const dispatch = useDispatch();

  const [currentText, setCurrentText] = useState(text);
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);
  const updateText = (e) => setCurrentText(e.target.value);
  const editSticky = () => setEdit(true);

  const cancelEdit = () => {
    setEdit(false);
    setCurrentText(text);
  };

  const handleUpdateSticky = () => {
    if (currentText) {
      dispatch(attemptUpdateSticky(id, currentText)).then(() => setEdit(false));
    }
  };

  const deleteSticky = () => dispatch(attemptDeleteSticky(id));
  return (
    <div className={`card mb-3`}>
      <div
        className="card-content"
        style={{ backgroundColor: color, color: textColor }}
      >
        <div className="content">
          {edit ? (
            <textarea
              className="textarea"
              value={currentText}
              onChange={updateText}
            />
          ) : (
            <p>{text}</p>
          )}
        </div>
      </div>
      <div className="has-text-centered mt-1">
        {edit ? (
          <>
            <button
              className="button is-success"
              onClick={handleUpdateSticky}
              onKeyPress={handleUpdateSticky}
            >
              <span className="icon is-small">
                <FontAwesomeIcon icon={faSave} />
              </span>
              <span>Save</span>
            </button>
            <button
              className="button is-warning has-text-centered"
              onClick={cancelEdit}
              onKeyPress={cancelEdit}
            >
              <span className="icon is-small">
                <FontAwesomeIcon icon={faBan} />
              </span>
              <span>Cancel</span>
            </button>
          </>
        ) : (
          <button
            className="button is-light has-text-centered"
            onClick={editSticky}
            onKeyPress={editSticky}
          >
            <span className="icon is-small">
              <FontAwesomeIcon icon={faPencilAlt} />
            </span>
            <span>Edit</span>
          </button>
        )}

        <button
          className="button is-danger is-outlined has-text-centered"
          onClick={openModal}
          onKeyPress={openModal}
        >
          <span>Delete</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </button>
      </div>
      <ConfirmModal
        confirm={confirm}
        closeModal={closeModal}
        deleteWidget={deleteSticky}
      />
    </div>
  );
}
Sticky.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
  canDelete: PropTypes.bool,
};

Sticky.defaultProps = {
  text: "add text here...",
  color: "white",
  canDelete: false,
};
