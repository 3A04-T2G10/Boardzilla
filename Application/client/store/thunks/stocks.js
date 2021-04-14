import { snakeToCamelCase } from "_utils/snakeToCC";
import R from "ramda";

import {
  getStocks,
  postStock,
  deleteStock,
  putStock,
  putStockLayout,
} from "_api/stocks";

import { setStocks, addStock, removeStock, updateStock } from "_actions/stocks";

import { dispatchError } from "_utils/api";

export const attemptGetStocks = () => (dispatch) =>
  getStocks()
    .then((data) => {
      const stocks = R.map(
        (stock) =>
          R.omit(["Id"], R.assoc("id", stock._id, snakeToCamelCase(stock))),
        data.stocks
      );
      dispatch(setStocks(stocks));
      return data.stocks;
    })
    .catch(dispatchError(dispatch));

export const attemptAddStock = (symbol, x, y) => (dispatch) =>
  postStock({ symbol })
    .then((data) => {
      const stock = R.omit(
        ["Id"],
        R.assoc("id", data.stock._id, snakeToCamelCase(data.stock))
      );
      dispatch(addStock(stock));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateStock = (id, symbol) => (dispatch) =>
  putStock({ id, symbol })
    .then((data) => {
      const stock = R.omit(
        ["Id"],
        R.assoc("id", data.widget._id, snakeToCamelCase(data.widget))
      );
      dispatch(updateStock(stock));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateStockLayout = (id, x, y, width, height) => (
  dispatch
) =>
  putStockLayout({ id, x, y, width, height })
    .then((data) => {
      const stock = R.omit(
        ["Id"],
        R.assoc("id", data.widget._id, snakeToCamelCase(data.widget))
      );
      dispatch(updateStock(stock));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptDeleteStock = (id) => (dispatch) =>
  deleteStock({ id })
    .then((data) => {
      dispatch(removeStock(id));
      return data;
    })
    .catch(dispatchError(dispatch));
