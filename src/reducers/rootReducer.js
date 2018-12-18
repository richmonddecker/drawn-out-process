import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import navigationReducer from "./navigationReducer";
import triggerReducer from "./triggerReducer";

export default (history) => combineReducers({
  router: connectRouter(history),
  navigation: navigationReducer,
  trigger: triggerReducer
});