import { snakeToCamelCase } from "_utils/snakeToCC";
import R from "ramda";

import {
  getWeather,
  postWeather,
  deleteWeather,
  putWeather,
  putWeatherLayout,
} from "_api/weather";

import {
  setWeather,
  addWeather,
  removeWeather,
  updateWeather,
} from "_actions/weather";

import { dispatchError } from "_utils/api";

export const attemptGetWeather = () => (dispatch) =>
  getWeather()
    .then((data) => {
      const weather = R.map(
        (widget) =>
          R.omit(["Id"], R.assoc("id", widget._id, snakeToCamelCase(widget))),
        data.widgets
      );
      dispatch(setWeather(weather));
      return data.widgets;
    })
    .catch(dispatchError(dispatch));

export const attemptAddWeather = (city, state, country,x ,y ) => (dispatch) =>
  postWeather({ city, state, country })
    .then((data) => {
      const item = R.omit(
        ["Id"],
        R.assoc("id", data.weather._id, snakeToCamelCase(data.weather))
      );
      dispatch(addWeather(item));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateWeather = (id, city, state, country) => (dispatch) =>
  putWeather({ id, city, state, country })
    .then((data) => {
      const item = R.omit(
        ["Id"],
        R.assoc("id", data.widget._id, snakeToCamelCase(data.widget))
      );
      dispatch(updateWeather(item));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateWeatherLayout = (id, x, y, width, height) => (
  dispatch
) =>
  putWeatherLayout({ id, x, y, width, height })
    .then((data) => {
      const item = R.omit(
        ["Id"],
        R.assoc("id", data.widget._id, snakeToCamelCase(data.widget))
      );
      dispatch(updateWeather(item));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptDeleteWeather = (id) => (dispatch) =>
  deleteWeather({ id })
    .then((data) => {
      dispatch(removeWeather(id));
      return data;
    })
    .catch(dispatchError(dispatch));
