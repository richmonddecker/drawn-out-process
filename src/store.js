import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const history = createBrowserHistory();

export default function configureStore(initialState={}) {
  return createStore(
    rootReducer(history),
    initialState,
    applyMiddleware(thunk)
  );
}