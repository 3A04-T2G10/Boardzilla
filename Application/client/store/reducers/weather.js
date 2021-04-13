import update from "immutability-helper";
import R from "ramda";
import {
  SET_WEATHER,
  ADD_WEATHER,
  REMOVE_WEATHER,
  UPDATE_WEATHER,
} from "_actions/types";

import { LOGOUT_USER } from "_actions/user";

export function singleWeather(state = {}, action) {
  switch (action.type) {
    case ADD_WEATHER:
      return update(state, {
        id: { $set: action.data.id },
        widgetType: { $set: action.data.type },
        x: { $set: action.data.x },
        y: { $set: action.data.y },
        width: { $set: action.data.width },
        height: { $set: action.data.height },
        place: { $set: action.data.place },
        timeOffset: { $set: action.data.timeOffset },
        current: { $set: action.data.current },
        hourly: { $set: action.data.hourly },
        daily: { $set: action.data.daily },
        alert: { $set: action.data.alert },
      });
    case UPDATE_WEATHER:
      return update(state, {
        id: { $set: action.data.id },
        widgetType: { $set: action.data.type },
        x: { $set: action.data.x },
        y: { $set: action.data.y },
        width: { $set: action.data.width },
        height: { $set: action.data.height },
        place: { $set: action.data.place },
        timeOffset: { $set: action.data.timeOffset },
        current: { $set: action.data.current },
        hourly: { $set: action.data.hourly },
        daily: { $set: action.data.daily },
        alert: { $set: action.data.alert },
      });
    default:
      return state;
  }
}

export default function weather(state = [], action) {
  const index = R.findIndex(R.propEq("id", action.id), state);
  const updatedAtIndex = {
    $splice: [[index, 1, singleWeather(state[index], action)]],
  };

  switch (action.type) {
    case SET_WEATHER:
      return update(state, { $set: action.widgets });
    case ADD_WEATHER:
      return update(state, { $push: [singleWeather(undefined, action)] });
    case UPDATE_WEATHER:
      return update(state, updatedAtIndex);
    case REMOVE_WEATHER:
      return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
