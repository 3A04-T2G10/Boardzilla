import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const postNews = (data) =>
  request.post("/api/news").send(data).then(handleSuccess).catch(handleError);

export const getNews = () =>
  request.get("/api/news").then(handleSuccess).catch(handleError);

// export const putSticky = (data) =>
//   request
//     .put(`/api/stickies`)
//     .send(data)
//     .then(handleSuccess)
//     .catch(handleError);

// export const deleteSticky = (data) =>
//   request
//     .delete("/api/stickies")
//     .send(data)
//     .then(handleSuccess)
//     .catch(handleError);
