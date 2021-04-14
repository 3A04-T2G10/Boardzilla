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
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChartBar } from "@fortawesome/free-solid-svg-icons/faChartBar";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons/faDollarSign";
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
      <div className="has-text-centered">
        <p className="is-size-3 has-text-weight-bold p-1">{place || "place"}</p>
      </div>
      <p>
        {/* <i
          className={
            icons[
              `${
                current.icon.endsWith("d") ? "day " : "night "
              }${current.iconId.toString()}`
            ] || ""
          }></i> */}

        <i className="wi wi-day-fog" />
      </p>

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
