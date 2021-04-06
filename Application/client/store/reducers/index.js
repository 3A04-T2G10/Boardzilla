import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./user";
import stickies from "./stickies";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    stickies,
  });

export default createRootReducer;
