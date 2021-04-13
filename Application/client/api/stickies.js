import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const postSticky = (data) =>
  request
    .post("/api/stickies")
    .send(data)
    .then(handleSuccess)
    .catch(handleError);

export const getStickies = () =>
  request.get("/api/stickies").then(handleSuccess).catch(handleError);

export const putSticky = (data) =>
  request
    .put(`/api/stickies`)
    .send(data)
    .then(handleSuccess)
    .catch(handleError);

export const putStickyLayout = (data) =>
  request
    .put(`/api/stickies/layout`)
    .send(data)
    .then(handleSuccess)
    .catch(handleError);

export const deleteSticky = (data) =>
  request
    .delete("/api/stickies")
    .send(data)
    .then(handleSuccess)
    .catch(handleError);
