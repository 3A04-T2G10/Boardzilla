import { snakeToCamelCase } from "_utils/snakeToCC";
import R from "ramda";

import {
  getStickies,
  postSticky,
  putSticky,
  deleteSticky,
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

export const attemptAddSticky = (text) => (dispatch) =>
  postSticky({ text })
    .then((data) => {
      const sticky = R.omit(
        ["Id"],
        R.assoc("id", data.sticky._id, snakeToCamelCase(data.sticky))
      );
      dispatch(addSticky(sticky));
      return data.user;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateSticky = (id, text) => (dispatch) =>
  putSticky({ id, text })
    .then((returnData) => {
      dispatch(updateSticky({ id, text }));
      return returnData;
    })
    .catch(dispatchError(dispatch));

export const attemptDeleteSticky = (id) => (dispatch) =>
  deleteSticky({ id })
    .then((data) => {
      dispatch(removeSticky(id));
      return data;
    })
    .catch(dispatchError(dispatch));
