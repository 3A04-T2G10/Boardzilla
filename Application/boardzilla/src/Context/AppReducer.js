export default (state, action) => {
  switch (action.type) {
    case "SET_DISPLAY":
      return {
        ...state,
        display: action.payload,
      };
    default:
      return state;
  }
};
