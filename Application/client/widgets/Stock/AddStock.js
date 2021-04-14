import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { attemptAddStock } from "_thunks/stocks";
import useKeyPress from "_hooks/useKeyPress";

export default function AddStock({ closeModal, widgetCount, x, y, updateList }) {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");

  const handleAddStock = () => {
    if (symbol) {
      widgetCount();
      dispatch(attemptAddStock(symbol, x, y)).then(updateList);
      setSymbol("");
      closeModal();
    }
  };

  useKeyPress("Enter", handleAddStock);

  const updateSymbol = (e) => setSymbol(e.target.value);

  return (
    <div className="card p-2 has-text-centered has-text-weight-semibold">
      <h1 className="title">New Stock Widget</h1>
      <div className="has-text-centered mx-5">
        <div className="field">
          <label className="label">Ticker Symbol</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={symbol}
              onChange={updateSymbol}></input>
          </div>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button className="button is-link" onClick={handleAddStock}>
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

AddStock.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
