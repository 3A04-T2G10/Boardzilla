import update from "immutability-helper";
import R from "ramda";
import {
  SET_STOCKS,
  ADD_STOCK,
  REMOVE_STOCK,
  UPDATE_STOCK,
} from "_actions/types";

import { LOGOUT_USER } from "_actions/user";

export function stock(state = {}, action) {
  switch (action.type) {
    case ADD_STOCK:
      return update(state, {
        id: { $set: action.id },
        symbol: { $set: action.symbol },
        dailyData: { $set: action.dailyData },
        widgetType: { $set: action.widgetType },
        x: { $set: action.x },
        y: { $set: action.y },
        width: { $set: action.width },
        height: { $set: action.height },
      });
    case UPDATE_STOCK:
      return update(state, {
        id: { $set: action.id },
        symbol: { $set: action.symbol },
        dailyData: { $set: action.dailyData },
        widgetType: { $set: action.widgetType },
        x: { $set: action.x },
        y: { $set: action.y },
        width: { $set: action.width },
        height: { $set: action.height },
      });
    default:
      return state;
  }
}

export default function stocks(state = [], action) {
  const index = R.findIndex(R.propEq("id", action.id), state);
  const updatedAtIndex = {
    $splice: [[index, 1, stock(state[index], action)]],
  };

  switch (action.type) {
    case SET_STOCKS:
      return update(state, { $set: action.stocks });
    case ADD_STOCK:
      return update(state, { $push: [stock(undefined, action)] });
    case UPDATE_STOCK:
      return update(state, updatedAtIndex);
    case REMOVE_STOCK:
      return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
