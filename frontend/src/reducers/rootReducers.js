import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";
import { calendarReducer } from "./calendarReducer";
import { authReducer } from "./authReducer";
// *********************************************

// controlador de los reducers
export const rootReducers = combineReducers({
   ui: uiReducer,
   calendar: calendarReducer,
   auth: authReducer,
});
