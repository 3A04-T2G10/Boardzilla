import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const postEvent = (data) => {
  return request
    .post("/api/events")
    .send(data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getEvents = () =>
  request.get("/api/events").then(handleSuccess).catch(handleError);

export const putEvent = (data) =>
  request.put(`/api/events`).send(data).then(handleSuccess).catch(handleError);

export const putCalendarLayout = (data) =>
  request
    .put(`/api/user/calendar`)
    .send(data)
    .then(handleSuccess)
    .catch(handleError);

export const deleteEvent = (data) =>
  request
    .delete("/api/events")
    .send(data)
    .then(handleSuccess)
    .catch(handleError);
