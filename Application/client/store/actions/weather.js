import {
  SET_WEATHER,
  ADD_WEATHER,
  UPDATE_WEATHER,
  REMOVE_WEATHER,
} from "./types";

export const setWeather = (widgets) => ({
  type: SET_WEATHER,
  widgets,
});

export const addWeather = (data) => ({
  type: ADD_WEATHER,
  data: data,
});

export const updateWeather = (data) => ({
  type: UPDATE_WEATHER,
  data: data,
});

export const removeWeather = (id) => ({
  type: REMOVE_WEATHER,
  id,
});
