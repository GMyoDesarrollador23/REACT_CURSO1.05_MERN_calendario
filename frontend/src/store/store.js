import {
   createStore,
   compose,
   applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

import { rootReducers } from "../reducers/rootReducers";

const composeEnhancers =
   (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;

// MANEJO DEL ESTADO DE LA APP
// fuente de la verdad
export const store = createStore(
   rootReducers,
   composeEnhancers(applyMiddleware(thunk))
);
