import { applyMiddleware, compose, createStore } from "redux";
import storage from "./storage";
import reducer from "./reducers/auth";
import clientMiddleware from "./middleware/clientMiddleware";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        serialize: {
          options: {
            undefined: true,
            function(fn) {
              return fn.toString();
            },
          },
        },
      })
    : compose;
/* eslint-enable */

const persistedState = {
  auth: storage.get("auth"),
};

const defaultStore = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(clientMiddleware, promise, thunk))
);

export const store = defaultStore;
