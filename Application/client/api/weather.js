import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const postWeather = (data) =>
  request
    .post("/api/weather")
    .send(data)
    .then(handleSuccess)
    .catch(handleError);

export const getWeather = () =>
  request.get("/api/weather").then(handleSuccess).catch(handleError);

export const putWeather = (data) =>
  request.put(`/api/weather`).send(data).then(handleSuccess).catch(handleError);

export const putWeatherLayout = (data) =>
  request
    .put(`/api/weather/layout`)
    .send(data)
    .then(handleSuccess)
    .catch(handleError);

export const deleteWeather = (data) =>
  request
    .delete("/api/weather")
    .send(data)
    .then(handleSuccess)
    .catch(handleError);
