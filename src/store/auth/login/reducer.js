import {
  // CHECK_LOGIN,
  LOGIN_USER,
  // API_ERROR,
  LOGOUT_USER,
  REGISTER_USER,
  UPDATE_USERINFO,
  // LOGOUT_USER_SUCCESS,
} from "./actionTypes";

import { storeDataOnLocalStorage, logout } from "utils/LocalStorage";
import moment from "moment";

try {
  var currTime = moment();
  var storedTime = moment(JSON.parse(localStorage.getItem("loggedTime")));
  var logoutTime = currTime.diff(storedTime, "hours", true);
  console.log("log", logoutTime);
  if (logoutTime > 24) {
    logout();
  }
} catch (error) {}

// const initialState = {
//   logged:
//     localStorage.getItem("logged") != null
//       ? JSON.parse(localStorage.getItem("logged"))
//       : false,
//   user_info: JSON.parse(localStorage.getItem("user_info")),
//   token: JSON.parse(localStorage.getItem("token")),
//   platform: JSON.parse(localStorage.getItem("platform")),
// };

const initialState = {
  logged: false,
  user_info: null,
  token: null,
  platform: null,
  userType: null,
  picture:
    localStorage.getItem("picture") !== null
      ? JSON.parse(localStorage.getItem("picture"))
      : null,
  loggedTime:
    localStorage.getItem("loggedTime") !== null
      ? JSON.parse(localStorage.getItem("loggedTime"))
      : null,
};

const getDataFromLocalStorage = async () => {
  console.log("-------------------------------------> redux");

  try {
    let res1 = localStorage.getItem("user_info");
    let res2 = localStorage.getItem("token");
    let res3 = localStorage.getItem("logged");
    let res4 = localStorage.getItem("platform");
    let res5 = localStorage.getItem("userType");
    let res6 = localStorage.getItem("picture");
    let res7 = localStorage.getItem("loggedTime");

    if (res1 != null) {
      initialState.user_info = JSON.parse(res1);
    } else {
      initialState.user_info = null;
    }

    if (res2 != null) {
      initialState.token = JSON.parse(res2);
    } else {
      initialState.token = null;
    }

    if (res3 != null) {
      initialState.logged = JSON.parse(res3);
    } else {
      initialState.logged = false;
    }
    if (res4 != null) {
      initialState.platform = JSON.parse(res4);
    } else {
      initialState.platform = null;
    }
    if (res5 != null) {
      initialState.userType = JSON.parse(res5);
    } else {
      initialState.userType = null;
    }
    if (res6 != null) {
      console.log(JSON.parse(res6));
      initialState.picture = JSON.parse(res6);
    } else {
      console.log(JSON.parse(res6));

      initialState.picture = null;
    }
    if (res7 != null) {
      console.log(JSON.parse(res6));

      initialState.loggedTime = JSON.parse(res7);
    } else {
      console.log(JSON.parse(res6));

      initialState.loggedTime = null;
    }
  } catch (error) {
    // console.log(error);
  }
};
getDataFromLocalStorage();

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      storeDataOnLocalStorage(
        action.payload.user,
        action.payload.token,
        true,
        action.payload.platform,
        action.payload.userType,
        action.payload.picture,
        moment()
      );

      return {
        ...state,
        logged: true,
        user_info: action.payload.user,
        token: action.payload.token,
        platform: action.payload.platform,
        userType: action.payload.userType,
        picture: action.payload.picture,
        loggedTime: moment(),
      };
    case REGISTER_USER:
      storeDataOnLocalStorage(
        action.payload.user,
        action.payload.token,
        true,
        action.payload.platform,
        action.payload.userType
      );

      return {
        ...state,
        logged: true,
        user_info: action.payload.user,
        token: action.payload.token,
        platform: action.payload.platform,
        userType: action.payload.userType,
      };
    case UPDATE_USERINFO:
      localStorage.setItem("picture", JSON.stringify(action.payload.picture));

      return {
        ...state,
        picture: action.payload.picture,
      };

    case LOGOUT_USER:
      logout();
      return {
        ...state,
        logged: false,
        user_info: null,
        token: null,
        platform: null,
        userType: null,
        loggedTime: null,
      };

    default:
      return state;
  }
};

export default login;
