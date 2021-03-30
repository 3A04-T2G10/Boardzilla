import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import App from "./App";

export default function Root({ history, store }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
