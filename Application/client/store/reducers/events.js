import update from "immutability-helper";
import R from "ramda";
import {
  SET_EVENTS,
  ADD_EVENT,
  UPDATE_EVENT,
  REMOVE_EVENT,
} from "_actions/types";

import { LOGOUT_USER } from "_actions/user";

export function event(state = {}, action) {
  switch (action.type) {
    case ADD_EVENT:
      return update(state, {
        id: { $set: action.id },
        text: { $set: action.text },
        date: { $set: action.date },
        widgetType: { $set: action.widgetType },
      });
    case UPDATE_EVENT:
      return update(state, {
        id: { $set: action.id },
        text: { $set: action.text },
        date: { $set: action.date },
        widgetType: { $set: action.widgetType },
      });
    default:
      return state;
  }
}

export default function events(state = [], action) {
  const index = R.findIndex(R.propEq("id", action.id), state);
  const updatedAtIndex = {
    $splice: [[index, 1, event(state[index], action)]],
  };

  switch (action.type) {
    case SET_EVENTS:
      return update(state, { $set: action.events });
    case ADD_EVENT:
      return update(state, { $push: [event(undefined, action)] });
    case UPDATE_EVENT:
      return update(state, updatedAtIndex);
    case REMOVE_EVENT:
      return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
