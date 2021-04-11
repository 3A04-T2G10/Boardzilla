import { SET_NEWS, ADD_NEWS, UPDATE_NEWS, REMOVE_NEWS } from "./types";

export const setNews = (news) => ({
  type: SET_NEWS,
  news,
});

export const addNews = ({ id, topic, articles }) => ({
  type: ADD_NEWS,
  id: id,
  topic: topic,
  articles: articles,
});

export const updateNews = ({ id, topic, articles }) => ({
  type: UPDATE_NEWS,
  id: id,
  topic: topic,
  articles: articles,
});

export const removeNews = (id) => ({
  type: REMOVE_NEWS,
  id,
});
