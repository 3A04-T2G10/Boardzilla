import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Plot from "react-plotly.js";
// import "weather-icons/css/weather-icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons/faTemperatureHigh";
import { faTemperatureLow } from "@fortawesome/free-solid-svg-icons/faTemperatureLow";
import { attemptDeleteStock } from "_thunks/stocks";
import { attemptUpdateStock } from "_thunks/stocks";
import ConfirmModal from "_components/ConfirmModal";
import { icons } from "./icons";

export const Weather = ({
  id,
  place,
  timeOffset,
  current,
  hourly,
  daily,
  alert,
}) => {
  // id: { $set: action.data.id },
  //     widgetType: { $set: action.data.type },
  //     x: { $set: action.data.x },
  //     y: { $set: action.data.y },
  //     width: { $set: action.data.width },
  //     height: { $set: action.data.height },
  //     place: { $set: action.data.place },
  //     timeOffset: { $set: action.data.timeOffset },
  //     current: { $set: action.data.current },
  //     hourly: { $set: action.data.hourly },
  //     daily: { $set: action.data.daily },
  //     alert: { $set: action.data.alert },
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  //widget.place
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);

  const editWeather = () => setEdit(true);
  const cancelEdit = () => {
    setEdit(false);
    setCurrentSymbol(symbol);
  };
  const deleteWeather = () => dispatch(attemptDeleteWeather(id));

  const handleUpdateWeather = () => {
    if (city && city.length > 1) {
      dispatch(attemptUpdateWeather(id, city, stateName, country)).then(() =>
        setEdit(false)
      );
    }
  };
  return place ? (
    <div className={`card mb-3 px-2`}>
      <p className="is-size-3 has-text-weight-bold has-text-centered">
        {place || "place"}
      </p>
      <div className="has-text-centered is-flex is-justify-content-center is-align-items-center is-flex-grow-1">
        <span className="is-size-2 pr-3">{`${current.temp.toFixed(0)}°C`}</span>
        <span style={{ fontSize: "5em" }}>
          <i
            className={
              icons[
                `${
                  current.icon.endsWith("d") ? "day " : "night "
                }${current.iconId.toString()}`
              ] || ""
            }
          />
        </span>
      </div>
      <p className="is-size-5 has-text-weight-norma' has-text-centered">{`Feels like ${current.feelsLike.toFixed(
        0
      )}°C`}</p>
      <p className="is-size-4 has-text-weight-semibold has-text-centered">
        {current.description.toUpperCase()}
      </p>

      {/* <div className="level-item has-text-centered">
          <p className="heading">
            <span className="icon is-small">
              <FontAwesomeIcon icon={faTemperatureHigh} />
            </span>
            high
          </p>
          <p className="title">{current.high}</p>

          <p className="heading">
            <span className="icon is-small">
              <FontAwesomeIcon icon={faTemperatureLow} />
            </span>
            low
          </p>
          <p className="title">{current.low}</p>
        </div>*/}

      <div className="columns has-text-centered is-mobile">
        <div className="column">
          <div>
            <p className="heading">
              <span>
                <i className="wi wi-humidity" />
              </span>
              humidity
            </p>
            <p className="title">{current.humidity}</p>
          </div>
        </div>

        <div className="column">
          <div>
            <p className="heading">
              <span>
                <i className="wi wi-strong-wind" />
              </span>
              Wind Speed
            </p>
            <p className="title">{(current.windSpd * 3.6).toFixed(1)}</p>
          </div>
        </div>
        <div className="column">
          <div>
            <p className="heading">
              <span>
                <i className="wi wi-sunrise" />
              </span>
              sunrise
            </p>
            <p className="title">
              {new Date(current.sunrise * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      <div className="columns has-text-centered is-mobile">
        <div className="column">
          <div>
            <p className="heading">
              <span>
                <i className="wi wi-barometer" />
              </span>
              pressure
            </p>
            <p className="title">{current.pressure}</p>
          </div>
        </div>

        <div className="column">
          <div>
            <p className="heading">
              <span>
                <i className="wi wi-hot" />
              </span>
              UV index
            </p>
            <p className="title">{current.uvi}</p>
          </div>
        </div>

        <div className="column">
          <div>
            <p className="heading">
              <span>
                <i className="wi wi-sunset" />
              </span>
              sunset
            </p>
            <p className="title">
              {new Date(current.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
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
