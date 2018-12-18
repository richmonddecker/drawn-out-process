import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const history = createBrowserHistory();

const state = {
  navigation: {
    openNavSection: "/repetitive",
    barsOpen: true
  },
  trigger: {
    saveFrame: false,
    resetFrame: false
  }
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