import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const postNews = (data) =>
  request.post("/api/news").send(data).then(handleSuccess).catch(handleError);

export const getNews = () =>
  request.get("/api/news").then(handleSuccess).catch(handleError);

export const putNews = (data) =>
  request.put(`/api/news`).send(data).then(handleSuccess).catch(handleError);

export const putNewsLayout = (data) =>
  request
    .put(`/api/news/layout`)
    .send(data)
    .then(handleSuccess)
    .catch(handleError);

export const deleteNews = (data) =>
  request.delete("/api/news").send(data).then(handleSuccess).catch(handleError);
