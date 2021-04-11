import update from "immutability-helper";
import R from "ramda";
import { SET_NEWS, ADD_NEWS } from "_actions/types";

import { LOGOUT_USER } from "_actions/user";

export function article(state = {}, action) {
  switch (action.type) {
    case ADD_NEWS:
      return update(state, {
        id: { $set: action.id },
        topic: { $set: action.topic },
        articles: { $set: action.articles },
      });
    // case UPDATE_STICKY:
    //   return update(state, {
    //     text: { $set: action.text },
    //   });
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
    // case UPDATE_STICKY:
    //   return update(state, updatedAtIndex);
    // case REMOVE_STICKY:
    //   return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
