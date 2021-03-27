import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  display: "",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setDisplay(name) {
    dispatch({
      type: "SET_DISPLAY",
      payload: name,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        display: state.display,
        setDisplay,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
