import { compose, createStore, applyMiddleware, Store, AnyAction } from "redux";
import rootReducer, { RootState } from "./reducers";
import thunk from "redux-thunk";
import { createWrapper, MakeStore } from "next-redux-wrapper";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middleware = [thunk];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const makeStore: MakeStore<Store<RootState, AnyAction>> = () =>
  createStore(rootReducer, enhancer);

export const wrapper = createWrapper(makeStore);