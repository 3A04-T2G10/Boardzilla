import { snakeToCamelCase } from "_utils/snakeToCC";
import R from "ramda";

import { getNews, postNews } from "_api/news";

import { setNews, addNews } from "_actions/news";

import { dispatchError } from "_utils/api";

export const attemptGetNews = () => (dispatch) =>
  getNews()
    .then((data) => {
      console.log(data);
      const news = R.map(
        (article) =>
          R.omit(["Id"], R.assoc("id", article._id, snakeToCamelCase(article))),
        data.news
      );
      dispatch(setNews(news));
      return data.news;
    })
    .catch(dispatchError(dispatch));

export const attemptAddNews = (topic) => (dispatch) =>
  postNews({ topic })
    .then((data) => {
      console.log("data here", data);
      const item = R.omit(
        ["Id"],
        R.assoc("id", data.article._id, snakeToCamelCase(data.article))
      );
      dispatch(addNews(item));
      return data.user;
    })
    .catch(dispatchError(dispatch));

// export const attemptUpdateSticky = (id, text) => (dispatch) =>
//   putSticky({ id, text })
//     .then((returnData) => {
//       dispatch(updateSticky({ id, text }));
//       return returnData;
//     })
//     .catch(dispatchError(dispatch));

// export const attemptDeleteSticky = (id) => (dispatch) =>
//   deleteSticky({ id })
//     .then((data) => {
//       dispatch(removeSticky(id));
//       return data;
//     })
//     .catch(dispatchError(dispatch));
