import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import navReducer from "./navReducer";

export default (history) => combineReducers({
  router: connectRouter(history),
  navigation: navReducer
});