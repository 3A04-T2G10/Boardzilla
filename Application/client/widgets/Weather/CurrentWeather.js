import React from "react";
import PropTypes from "prop-types";
import { icons } from "./icons";
export const CurrentWeather = ({ current }) => {
  return (
    <>
      {current && (
        <>
          <div className="has-text-centered is-flex is-justify-content-center is-align-items-center is-flex-grow-1">
            <span className="is-size-2 pr-3">{`${current.temp.toFixed(
              0
            )}°C`}</span>
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
          <p className="is-size-4 has-text-weight-semibold has-text-centered py-2">
            {current.description.toUpperCase()}
          </p>

          <div className="columns has-text-centered is-mobile pt-2">
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
                <p className="title">{`${(current.windSpd * 3.6).toFixed(
                  1
                )} km/h`}</p>
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
                <p className="title">{`${(current.pressure / 100).toFixed(
                  0
                )} Bar`}</p>
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
        </>
      )}
    </>
  );
};

CurrentWeather.propTypes = {
  current: PropTypes.object,
};

CurrentWeather.defaultProps = {
  current: {},
};
