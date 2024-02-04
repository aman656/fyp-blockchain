import {
    ELIGIBILITY_ERROR,ELIGIBILITY_REQUEST,ELIGIBILITY_SUCCESS
  } from "../actions/type";
  
  export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case ELIGIBILITY_REQUEST:
        return {
          loading: true,
        };
      case ELIGIBILITY_SUCCESS:
        return {
          ...state,
          loading: false,
          payload: [payload],
        };
      case ELIGIBILITY_ERROR:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  