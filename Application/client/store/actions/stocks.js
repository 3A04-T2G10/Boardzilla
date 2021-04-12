import { SET_STOCKS, ADD_STOCK, UPDATE_STOCK, REMOVE_STOCK } from "./types";

export const setStocks = (stocks) => ({
  type: SET_STOCKS,
  stocks,
});

export const addStock = ({ id, symbol, intraDay }) => ({
  type: ADD_STOCK,
  id: id,
  symbol: symbol,
  intraDay: intraDay,
});

export const updateStock = ({ id, symbol, intraDay }) => ({
  type: UPDATE_STOCK,
  id: id,
  symbol: symbol,
  intraDay: intraDay,
});

export const removeStock = (id) => ({
  type: REMOVE_STOCK,
  id,
});
