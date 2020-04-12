import { TOGGLE_LED, SET_BLINK, SET_ERROR } from "./actions.js";

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_LED:
      return {
        ...state,
        [action.color]: action.status,
        apiResponse: action.apiResponse,
      };
    case SET_BLINK:
      return {
        ...state,
        blinkInterval: action.value,
      };
    case SET_ERROR:
      return {
        ...state,
        apiResponse: action.apiResponse,
      };
    default:
      return false;
  }
};
