import { SET_STOCKS, ADD_STOCK, UPDATE_STOCK, REMOVE_STOCK } from "./types";

export const setStocks = (stocks) => ({
  type: SET_STOCKS,
  stocks,
});

export const addStock = ({
  id,
  symbol,
  dailyData,
  type,
  x,
  y,
  width,
  height,
}) => ({
  type: ADD_STOCK,
  id,
  symbol,
  dailyData,
  widgetType: type,
  x,
  y,
  width,
  height,
});

export const updateStock = ({
  id,
  symbol,
  dailyData,
  type,
  x,
  y,
  width,
  height,
}) => ({
  type: UPDATE_STOCK,
  id,
  symbol,
  dailyData,
  widgetType: type,
  x,
  y,
  width,
  height,
});

export const removeStock = (id) => ({
  type: REMOVE_STOCK,
  id,
});
