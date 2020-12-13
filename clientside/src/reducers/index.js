import { combineReducers } from "redux";
import ratesReducer from "./ratesReducer";
import userReducer from "./userReducer";

export default combineReducers({
  rates: ratesReducer,
  user: userReducer,
});
