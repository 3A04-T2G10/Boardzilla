import {
  SET_STICKIES,
  ADD_STICKY,
  UPDATE_STICKY,
  REMOVE_STICKY,
} from "./types";

export const setStickies = (stickies) => ({
  type: SET_STICKIES,
  stickies,
});

export const addSticky = ({ id, text, color, textColor }) => ({
  type: ADD_STICKY,
  id,
  text,
  color,
  textColor,
});

export const updateSticky = ({ id, text }) => ({
  type: UPDATE_STICKY,
  id,
  text,
});

export const removeSticky = (id) => ({
  type: REMOVE_STICKY,
  id,
});
