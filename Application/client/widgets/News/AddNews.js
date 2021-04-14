import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { attemptAddNews } from "_thunks/news";
import useKeyPress from "_hooks/useKeyPress";

export default function AddNews({ closeModal, widgetCount, x, y, updateList}) {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("");
  const handleAddNews = () => {
    if (topic) {
      widgetCount();
      dispatch(attemptAddNews(topic, x, y)).then(updateList);
      setTopic("");
      closeModal();
    }
  };

  useKeyPress("Enter", handleAddNews);

  const updateTopic = (e) => setTopic(e.target.value);

  return (
    <div className="card p-2 has-text-centered has-text-weight-semibold">
      <h1 className="title">New News Widget</h1>
      <div className="has-text-centered mx-5">
        <div className="field">
          <label className="label">Topic</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={topic}
              onChange={updateTopic}
            ></input>
          </div>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button className="button is-link" onClick={handleAddNews}>
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

AddNews.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
