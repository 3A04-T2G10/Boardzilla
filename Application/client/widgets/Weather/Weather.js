import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { attemptDeleteWeather } from "_thunks/weather";
import { attemptUpdateWeather } from "_thunks/weather";
import ConfirmModal from "_components/ConfirmModal";
import { CurrentWeather } from "./CurrentWeather";
import { HourlyWeather } from "./HourlyWeather";
import { DailyWeather } from "./DailyWeather";
export const Weather = ({
  id,
  place,
  current,
  hourly,
  daily,
  alert,
  remove,
}) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [weatherScreen, setWeatherScreen] = useState("current");
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);

  const cancelEdit = () => {
    setEdit(false);
    setCity("");
    setCountry("");
    setStateName("");
  };

  const deleteWeather = () => {
    remove(id);
    dispatch(attemptDeleteWeather(id));
  };

  const handleUpdateWeather = () => {
    if (city && city.length > 1) {
      dispatch(attemptUpdateWeather(id, city, stateName, country)).then(() =>
        setEdit(false)
      );
    }
  };

  return place ? (
    <div className={`card mb-3 px-2 height-100`}>
      <div className={`height-calc4`}>
        <p className="is-size-3 has-text-weight-bold has-text-centered">
          {place || "place"}
        </p>

        {weatherScreen === "current" && <CurrentWeather current={current} />}
        {weatherScreen === "hourly" && <HourlyWeather hourly={hourly} />}
        {weatherScreen === "daily" && <DailyWeather daily={daily} />}
        <div
          className="tabs is-centered is-toggle"
          style={{ overflowY: "hidden", overflowX: "hidden" }}>
          <ul>
            <li
              className={weatherScreen === "current" ? "is-active" : ""}
              onClick={() => setWeatherScreen("current")}>
              <a>Current</a>
            </li>
            <li
              className={weatherScreen === "hourly" ? "is-active" : ""}
              onClick={() => setWeatherScreen("hourly")}>
              <a>Hourly</a>
            </li>
            <li
              className={weatherScreen === "daily" ? "is-active" : ""}
              onClick={() => setWeatherScreen("daily")}>
              <a>Daily</a>
            </li>
          </ul>
        </div>
        {alert && alert.eventName && (
          <div className="has-text-centered has-text-weight-bold">
            <p className="title">{alert.eventName}</p>
            <p className="subtitle">
              {`Starting: ${new Date(alert.start * 1000).toLocaleTimeString()}`}
            </p>
            <p className="subtitle">
              {`Ending: ${new Date(alert.end * 1000).toLocaleTimeString()}`}
            </p>
          </div>
        )}
      </div>
      <div className="card-footer level py-2">
        <div className="level-left">
          {edit && (
            <>
              <div className="level-item">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </p>
                </div>
              </div>

              <div className="level-item">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="State/Province"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                    />
                  </p>
                </div>
              </div>

              <div className="level-item">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="level-right">
          {edit ? (
            <>
              <p className="level-item">
                <button
                  className="button is-success"
                  onClick={handleUpdateWeather}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faSave} />
                  </span>
                </button>
              </p>
              <p className="level-item">
                <button
                  className="button is-warning has-text-centered"
                  onClick={cancelEdit}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faBan} />
                  </span>
                </button>
              </p>
            </>
          ) : (
            <p className="level-item">
              <button
                className="button is-dark has-text-centered"
                onClick={() => setEdit(true)}>
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </button>
            </p>
          )}
          <p className="level-item">
            <button
              className="button is-danger is-outlined has-text-centered"
              onClick={openModal}>
              <span className="icon is-small">
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </button>
          </p>
        </div>
      </div>

      <ConfirmModal
        confirm={confirm}
        closeModal={closeModal}
        deleteWidget={deleteWeather}
      />
    </div>
  ) : (
    <>No Data Found</>
  );
};
export default Weather;

Weather.propTypes = {
  id: PropTypes.string.isRequired,
  place: PropTypes.string,
  timeOffset: PropTypes.number,
  current: PropTypes.object,
  hourly: PropTypes.array,
  daily: PropTypes.array,
  alert: PropTypes.object,
};

Weather.defaultProps = {
  place: "",
  timeOffset: 0,
  current: {},
  hourly: [],
  daily: [],
  alert: {},
};
