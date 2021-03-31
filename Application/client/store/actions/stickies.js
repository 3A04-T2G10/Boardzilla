export const SET_STICKIES = "SET_STICKIES";
export const ADD_STICKY = "ADD_STICKY";
export const UPDATE_STICKY = "UPDATE_STICKY";
export const REMOVE_STICKY = "REMOVE_STICKY";

export const setStickies = (stickies) => ({
  type: SET_STICKIES,
  stickies,
});

export const addSticky = ({ id, text }) => ({
  type: ADD_STICKY,
  id,
  text,
});

export const updateSticky = ({ id, text }) => ({
  type: UPDATE_STICKY,
  updatedAt,
  id,
  text,
});

export const removeSticky = (id) => ({
  type: REMOVE_STICKY,
  id,
});
