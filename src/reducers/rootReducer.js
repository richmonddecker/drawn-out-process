import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import interfaceReducer from "./interfaceReducer";
import configurationReducer from "./configurationReducer";
import triggerReducer from "./triggerReducer";
import controlReducer from "./controlReducer";

export default (history) => combineReducers({
  router: connectRouter(history),
  interface: interfaceReducer,
  configuration: configurationReducer,
  trigger: triggerReducer,
  control: controlReducer
});