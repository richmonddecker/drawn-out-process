import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import navigationReducer from "./navigationReducer";
import configurationReducer from "./configurationReducer";
import triggerReducer from "./triggerReducer";

export default (history) => combineReducers({
  router: connectRouter(history),
  navigation: navigationReducer,
  configuration: configurationReducer,
  trigger: triggerReducer
});