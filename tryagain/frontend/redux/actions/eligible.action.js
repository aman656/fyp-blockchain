import {
    ELIGIBILITY_ERROR,ELIGIBILITY_REQUEST,ELIGIBILITY_SUCCESS
  } from "./type";
  import axios from "axios";
  
  export const eligibleCheck = (data) => (dispatch) => {
    dispatch({ type: ELIGIBILITY_REQUEST });
    return axios({
      method: "POST",
      url: `http://localhost:9000/v1/voters/checkStatus`,
      data: {
        cnic:data.cnic
      },
    })
      .then((response) => {
        return dispatch({
          type: ELIGIBILITY_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        return dispatch({
          type: ELIGIBILITY_ERROR,
          payload: error.response,
        });
      });
  };
  