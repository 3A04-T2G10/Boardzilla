import { SET_NEWS, ADD_STICKY, UPDATE_NEWS, REMOVE_NEWS } from "./types";

export const setNews = (news) => ({
  type: SET_NEWS,
  news,
});

export const addNews = ({ id, topic }) => ({
  type: ADD_STICKY,
  id,
  topic,
});

//   export const updateSticky = ({ id, text }) => ({
//     type: UPDATE_STICKY,
//     id,
//     text,
//   });

//   export const removeSticky = (id) => ({
//     type: REMOVE_STICKY,
//     id,
//   });
