import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { attemptAddSticky } from "_thunks/stickies";
import useKeyPress from "_hooks/useKeyPress";

export default function AddSticky() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  const handleAddSticky = () => {
    if (text) {
      dispatch(attemptAddSticky(text, color, textColor));
      setText("");
      setColor("#ffffff");
      setTextColor("#000000");
    }
  };

  useKeyPress("Enter", handleAddSticky);

  const updateText = (e) => setText(e.target.value);
  const updateColor = (e) => setColor(e.target.value);
  const updateTextColor = (e) => setTextColor(e.target.value);

  return (
    <div className="has-text-centered mx-5">
      {/* <div>
        <textarea value={text} onChange={updateText}></textarea>
        <button className="is-success" onClick={handleAddSticky}>
          Add
        </button>

      </div>*/}

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
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </div>
  );
}
