import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const postStock = (data) =>
  request.post("/api/stocks").send(data).then(handleSuccess).catch(handleError);

export const getStocks = () =>
  request.get("/api/stocks").then(handleSuccess).catch(handleError);

export const putStock = (data) =>
  request.put(`/api/stocks`).send(data).then(handleSuccess).catch(handleError);

export const putStockLayout = (data) =>
  request
    .put(`/api/stocks/layout`)
    .send(data)
    .then(handleSuccess)
    .catch(handleError);

export const deleteStock = (data) =>
  request
    .delete("/api/stocks")
    .send(data)
    .then(handleSuccess)
    .catch(handleError);
