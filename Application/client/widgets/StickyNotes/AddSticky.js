import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { attemptAddSticky } from "_thunks/stickies";
import useKeyPress from "_hooks/useKeyPress";

export default function AddSticky() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleAddSticky = () => {
    if (text) {
      dispatch(attemptAddSticky(text));
      setText("");
    }
  };

  useKeyPress("Enter", handleAddSticky);

  const updateText = (e) => setText(e.target.value);

  return (
    <div>
      <textarea value={text} onChange={updateText}></textarea>
      <button className="is-success" onClick={handleAddSticky}>
        Add
      </button>
    </div>
  );
}
