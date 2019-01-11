import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import defaults from "./scripts/defaults";

const history = createBrowserHistory();

const state = {
  interface: {
    openNavSection: "informative",
    barsOpen: false,
    cursorHidden: false,
    invalidUrl: false
  },
  configuration: {
    fullScreen: false,
    barTabs: true,
    barLock: false,
    squareScreen: false
  },
  trigger: {
    saveFrame: false,
    resetFrame: false
  },
  control: defaults
};

export default function configureStore(initialState=state) {
  return createStore(
    rootReducer(history),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  );
}