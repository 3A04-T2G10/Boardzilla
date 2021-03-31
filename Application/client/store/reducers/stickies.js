import update from "immutability-helper";
import R from "ramda";

import {
  SET_STICKIES,
  ADD_STICKY,
  UPDATE_STICKY,
  REMOVE_STICKY,
} from "_actions/stickies";

import { LOGOUT_USER } from "_actions/user";

export function sticky(state, action) {
  switch (action.type) {
    case ADD_STICKY:
      console.log("in red");
      return update(state, {
        id: { $set: action.id },
        text: { $set: action.text },
      });
    case UPDATE_STICKY:
      return update(state, {
        text: { $set: action.text },
      });
    default:
      return state;
  }
}

export default function stickies(state = [], action) {
  const index = R.findIndex(R.propEq("id", action.id), state);
  const updatedAtIndex = {
    $splice: [[index, 1, sticky(state[index], action)]],
  };

  switch (action.type) {
    case SET_STICKIES:
      return update(state, { $set: action.stickies });
    case ADD_STICKY:
      return update(state, { $push: [sticky(undefined, action)] });
    case UPDATE_STICKY:
      return update(state, updatedAtIndex);
    case REMOVE_STICKY:
      return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
