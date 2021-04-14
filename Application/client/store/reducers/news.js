import update from "immutability-helper";
import R from "ramda";
import { SET_NEWS, ADD_NEWS, REMOVE_NEWS, UPDATE_NEWS } from "_actions/types";

import { LOGOUT_USER } from "_actions/user";

export function article(state = {}, action) {
  switch (action.type) {
    case ADD_NEWS:
      return update(state, {
        id: { $set: action.id },
        topic: { $set: action.topic },
        articles: { $set: action.articles },
        widgetType: { $set: action.widgetType },
        x: { $set: action.x },
        y: { $set: action.y },
        width: { $set: action.width },
        height: { $set: action.height },
      });
    case UPDATE_NEWS:
      return update(state, {
        id: { $set: action.id },
        topic: { $set: action.topic },
        articles: { $set: action.articles },
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

export default function news(state = [], action) {
  const index = R.findIndex(R.propEq("id", action.id), state);
  const updatedAtIndex = {
    $splice: [[index, 1, article(state[index], action)]],
  };

  switch (action.type) {
    case SET_NEWS:
      return update(state, { $set: action.news });
    case ADD_NEWS:
      return update(state, { $push: [article(undefined, action)] });
    case UPDATE_NEWS:
      return update(state, updatedAtIndex);
    case REMOVE_NEWS:
      return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
