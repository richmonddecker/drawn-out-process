import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { combineForms } from "react-redux-form";
import navigationReducer from "./navigationReducer";
import configurationReducer from "./configurationReducer";
import triggerReducer from "./triggerReducer";
import defaults from "../scripts/defaults";

export default (history) => combineReducers({
  router: connectRouter(history),
  navigation: navigationReducer,
  configuration: configurationReducer,
  trigger: triggerReducer,
  controls: combineForms(defaults, "controls")
});