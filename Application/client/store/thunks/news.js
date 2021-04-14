import { snakeToCamelCase } from "_utils/snakeToCC";
import R from "ramda";

import {
  getNews,
  postNews,
  deleteNews,
  putNews,
  putNewsLayout,
} from "_api/news";

import { setNews, addNews, removeNews, updateNews } from "_actions/news";

import { dispatchError } from "_utils/api";

export const attemptGetNews = () => (dispatch) =>
  getNews()
    .then((data) => {
      const news = R.map(
        (article) =>
          R.omit(["Id"], R.assoc("id", article._id, snakeToCamelCase(article))),
        data.news
      );
      dispatch(setNews(news));
      return data.news;
    })
    .catch(dispatchError(dispatch));

export const attemptAddNews = (topic, x, y) => (dispatch) =>
  postNews({ topic })
    .then((data) => {
      const item = R.omit(
        ["Id"],
        R.assoc("id", data.newsItem._id, snakeToCamelCase(data.newsItem))
      );
      dispatch(addNews(item));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateNews = (id, topic) => (dispatch) =>
  putNews({ id, topic })
    .then((data) => {
      const item = R.omit(
        ["Id"],
        R.assoc("id", data.widget._id, snakeToCamelCase(data.widget))
      );
      dispatch(updateNews(item));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateNewsLayout = (id, x, y, width, height) => (
  dispatch
) =>
  putNewsLayout({ id, x, y, width, height })
    .then((data) => {
      const item = R.omit(
        ["Id"],
        R.assoc("id", data.widget._id, snakeToCamelCase(data.widget))
      );
      dispatch(updateNews(item));
      return data;
    })
    .catch(dispatchError(dispatch));
export const attemptDeleteNews = (id) => (dispatch) =>
  deleteNews({ id })
    .then((data) => {
      dispatch(removeNews(id));
      return data;
    })
    .catch(dispatchError(dispatch));
