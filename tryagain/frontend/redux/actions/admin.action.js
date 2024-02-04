import {
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
} from "./type";
import axios from "axios";

export const adminLogin = (data) => (dispatch) => {
  dispatch({ type: ADMIN_LOGIN_REQUEST });
  return axios({
    method: "POST",
    url: `http://localhost:9000/v1/admin/fetchAdmin`,
    data: data,
  })
    .then((response) => {
      return dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      return dispatch({
        type: ADMIN_LOGIN_ERROR,
        payload: error.response,
      });
    });
};
