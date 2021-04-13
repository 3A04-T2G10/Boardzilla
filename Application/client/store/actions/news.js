import { SET_NEWS, ADD_NEWS, UPDATE_NEWS, REMOVE_NEWS } from "./types";

export const setNews = (news) => ({
  type: SET_NEWS,
  news,
});

export const addNews = ({
  id,
  type,
  topic,
  articles,
  x,
  y,
  width,
  height,
}) => ({
  type: ADD_NEWS,
  id: id,
  widgetType: type,
  topic: topic,
  articles: articles,
  x: x,
  y: y,
  width: width,
  height: height,
});

export const updateNews = ({
  id,
  type,
  topic,
  articles,
  x,
  y,
  width,
  height,
}) => ({
  type: UPDATE_NEWS,
  id: id,
  widgetType: type,
  topic: topic,
  articles: articles,
  x: x,
  y: y,
  width: width,
  height: height,
});

export const removeNews = (id) => ({
  type: REMOVE_NEWS,
  id,
});
