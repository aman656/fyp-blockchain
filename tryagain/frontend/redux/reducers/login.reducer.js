import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions/type";

export default function (state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: [payload],
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
