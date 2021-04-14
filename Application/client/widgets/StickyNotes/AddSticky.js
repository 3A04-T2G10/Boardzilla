import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { attemptAddSticky } from "_thunks/stickies";
import useKeyPress from "_hooks/useKeyPress";

export default function AddSticky({ closeModal, widgetCount, x, y, updateList}) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  const handleAddSticky = () => {
    if (text) {
      widgetCount();
      dispatch(attemptAddSticky(text, color, textColor, x, y)).then(updateList);
      setText("");
      setColor("#ffffff");
      setTextColor("#000000");
      closeModal();
    }
  };

  useKeyPress("Enter", handleAddSticky);

  const updateText = (e) => setText(e.target.value);
  const updateColor = (e) => setColor(e.target.value);
  const updateTextColor = (e) => setTextColor(e.target.value);

  return (
    <div className="card p-2 has-text-centered has-text-weight-semibold">
      <h1 className="title">New Sticky Note</h1>
      <div className="has-text-centered mx-5">
        <div className="field">
          <label className="label">Text</label>
          <div className="control">
            <textarea
              className="textarea"
              value={text}
              onChange={updateText}
            ></textarea>
          </div>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <label className="label">Text Color</label>
          <div className="control pl-2">
            <input type="color" value={textColor} onChange={updateTextColor} />
          </div>
          <label className="label">Background Color </label>
          <div className="control pl-2">
            <input type="color" value={color} onChange={updateColor} />
          </div>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button className="button is-link" onClick={handleAddSticky}>
              Create
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AddSticky.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
