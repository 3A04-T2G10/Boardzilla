import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { attemptAddWeather } from "_thunks/weather";
import useKeyPress from "_hooks/useKeyPress";

export default function AddWeather({ closeModal, widgetCount, x, y, updateList }) {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");

  const handleAddWeather = () => {
    if (city && city.length > 1) {
      widgetCount()
      dispatch(attemptAddWeather(city, stateName, country, x, y)).then(updateList);
      setCity("");
      setStateName("");
      setCountry("");
      closeModal();
    }
  };

  useKeyPress("Enter", handleAddWeather);

  const updateSymbol = (e) => setSymbol(e.target.value);

  return (
    <div className="card p-2 has-text-centered has-text-weight-semibold">
      <h1 className="title">New Weather Widget</h1>
      <div className="has-text-centered mx-5">
        <div className="field">
          <label className="label">City</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={city}
              onChange={(e) => setCity(e.target.value)}></input>
          </div>
        </div>

        <div className="field">
          <label className="label">State / Province</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}></input>
          </div>
        </div>

        <div className="field">
          <label className="label">Country</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={country}
              onChange={(e) => setCountry(e.target.value)}></input>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button className="button is-link" onClick={handleAddWeather}>
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

AddWeather.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
