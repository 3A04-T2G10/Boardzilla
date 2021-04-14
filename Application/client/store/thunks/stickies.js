import { snakeToCamelCase } from "_utils/snakeToCC";
import R from "ramda";

import {
  getStickies,
  postSticky,
  putSticky,
  deleteSticky,
  putStickyLayout,
} from "_api/stickies";

import {
  setStickies,
  addSticky,
  updateSticky,
  removeSticky,
} from "_actions/stickies";

import { dispatchError } from "_utils/api";

export const attemptGetStickies = () => (dispatch) =>
  getStickies()
    .then((data) => {
      const stickies = R.map(
        (sticky) =>
          R.omit(["Id"], R.assoc("id", sticky._id, snakeToCamelCase(sticky))),
        data.stickies
      );
      dispatch(setStickies(stickies));
      return data.stickies;
    })
    .catch(dispatchError(dispatch));

export const attemptAddSticky = (text, color, textColor, x, y) => (dispatch) =>
  postSticky({ text, color, textColor, x, y })
    .then((data) => {
      const sticky = R.omit(
        ["Id"],
        R.assoc("id", data.sticky._id, snakeToCamelCase(data.sticky))
      );
      dispatch(addSticky(sticky));
      return data.user;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateSticky = (id, text, color, textColor) => (dispatch) =>
  putSticky({ id, text, color, textColor })
    .then((data) => {
      const sticky = R.omit(
        ["Id"],
        R.assoc("id", data.widget._id, snakeToCamelCase(data.widget))
      );
      dispatch(updateSticky(sticky));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateStickyLayout = (id, x, y, width, height) => (
  dispatch
) =>
  putStickyLayout({ id, x, y, width, height })
    .then((data) => {
      const sticky = R.omit(
        ["Id"],
        R.assoc("id", data.widget._id, snakeToCamelCase(data.widget))
      );
      dispatch(updateSticky(sticky));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptDeleteSticky = (id) => (dispatch) =>
  deleteSticky({ id })
    .then((data) => {
      dispatch(removeSticky(id));
      return data;
    })
    .catch(dispatchError(dispatch));
