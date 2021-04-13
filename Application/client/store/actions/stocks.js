import { SET_STOCKS, ADD_STOCK, UPDATE_STOCK, REMOVE_STOCK } from "./types";

export const setStocks = (stocks) => ({
  type: SET_STOCKS,
  stocks,
});

export const addStock = ({ id, symbol, dailyData }) => ({
  type: ADD_STOCK,
  id: id,
  symbol: symbol,
  dailyData: dailyData,
});

export const updateStock = ({ id, symbol, dailyData }) => ({
  type: UPDATE_STOCK,
  id: id,
  symbol: symbol,
  dailyData: dailyData,
});

export const removeStock = (id) => ({
  type: REMOVE_STOCK,
  id,
});
