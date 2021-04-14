import React from "react";
import PropTypes from "prop-types";
import { icons } from "./icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons/faTemperatureHigh";
import { faTemperatureLow } from "@fortawesome/free-solid-svg-icons/faTemperatureLow";
export const DailyWeather = ({ daily }) => {
  return (
    <>
      {daily && (
        <div className="table-container table is-size-4">
          <table
            className="table is-scrollable has-text-centered"
            style={{ margin: "auto", whiteSpace: "nowrap" }}>
            <thead>
              <tr>
                {daily.map((day, i) => {
                  return (
                    <th key={i}>
                      {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                        day: "numeric",
                        weekday: "short",
                      })}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {daily.map((day, i) => {
                  return <td key={i}>{day.description.toUpperCase()}</td>;
                })}
              </tr>
              <tr>
                {daily.map((day, i) => {
                  return (
                    <td key={i}>
                      <i
                        className={
                          icons[
                            `${
                              day.icon.endsWith("d") ? "day " : "night "
                            }${day.iconId.toString()}`
                          ] || ""
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr>
                {daily.map((day, i) => {
                  return <td key={i}>{`${day.temp.toFixed(0)}°C`}</td>;
                })}
              </tr>
              <tr>
                {daily.map((day, i) => {
                  return (
                    <td key={i}>
                      <p className="heading">
                        <span className="icon is-small">
                          <FontAwesomeIcon icon={faTemperatureHigh} />
                        </span>
                        high
                      </p>
                      <p className="title">{`${day.high.toFixed(0)}`}</p>

                      <p className="heading">
                        <span className="icon is-small">
                          <FontAwesomeIcon icon={faTemperatureLow} />
                        </span>
                        low
                      </p>
                      <p className="title">{`${day.low.toFixed(0)}`}</p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                {daily.map((day, i) => {
                  return (
                    <td key={i}>
                      <p className="heading">
                        <i className="wi wi-raindrop pr-1" />
                        precipitation
                      </p>
                      <p className="title">{`${(day.pop * 100).toFixed(
                        0
                      )}%`}</p>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

DailyWeather.propTypes = {
  daily: PropTypes.array,
};

DailyWeather.defaultProps = {
  daily: [],
};
