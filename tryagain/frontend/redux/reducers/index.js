import { combineReducers } from "redux";
import login from "./login.reducer";
import eligible from "./eligible.reducer";

export default combineReducers({
  login,
  eligible
});
