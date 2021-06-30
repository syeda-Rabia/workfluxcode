import { combineReducers } from "redux";

// Authentication Module
import Login from "./auth/login/reducer";

const rootReducer = combineReducers({
  // Authentication
  Login,
});

export default rootReducer;
