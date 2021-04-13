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

export const addSticky = ({
  id,
  text,
  color,
  textColor,
  type,
  x,
  y,
  width,
  height,
}) => ({
  type: ADD_STICKY,
  id,
  widgetType: type,
  text,
  color,
  textColor,
  x,
  y,
  width,
  height,
});

export const updateSticky = ({
  id,
  text,
  color,
  textColor,
  type,
  x,
  y,
  width,
  height,
}) => ({
  type: UPDATE_STICKY,
  id,
  widgetType: type,
  text,
  color,
  textColor,
  x,
  y,
  width,
  height,
});

export const removeSticky = (id) => ({
  type: REMOVE_STICKY,
  id,
});
