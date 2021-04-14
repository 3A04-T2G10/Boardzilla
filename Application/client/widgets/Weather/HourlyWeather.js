import React from "react";
import PropTypes from "prop-types";
import { icons } from "./icons";

export const HourlyWeather = ({ hourly }) => {
  return (
    <>
      {hourly && (
        <div className="table-container table">
          <table className="table is-scrollable" style={{ margin: "auto" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
                <th>Description</th>
                <th>Precipitation</th>
              </tr>
            </thead>
            <tbody
              className="is-size-4"
              style={{ maxHeight: "50px", overflowY: "scroll" }}>
              {hourly.map((hour, i) => {
                return (
                  <tr key={i}>
                    <td>{new Date(hour.dt * 1000).toLocaleTimeString()}</td>
                    <td>
                      <span>
                        <i
                          className={
                            icons[
                              `${
                                hour.icon.endsWith("d") ? "day " : "night "
                              }${hour.iconId.toString()}`
                            ] || ""
                          }
                        />
                      </span>
                      <span className="pl-3">{`${hour.temp.toFixed(
                        0
                      )}°C`}</span>
                    </td>
                    <td>{hour.description.toUpperCase()}</td>
                    <td>
                      <span>
                        <i className="wi wi-raindrop pr-3" />
                      </span>
                      <span>{`${(hour.pop * 100).toFixed(0)}%`}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

HourlyWeather.propTypes = {
  hourly: PropTypes.array,
};

HourlyWeather.defaultProps = {
  hourly: [],
};
