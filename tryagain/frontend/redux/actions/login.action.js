import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "./type";
import axios from "axios";

export const loginAction = (data) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios({
    method: "POST",
    url: `http://localhost:9000/v1/voters/fetchVoter`,
    data: data,
  })
    .then((response) => {
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      return dispatch({
        type: LOGIN_ERROR,
        payload: error.response,
      });
    });
};
