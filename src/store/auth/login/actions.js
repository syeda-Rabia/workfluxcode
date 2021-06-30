import {
  CHECK_LOGIN,
  LOGIN_USER,
  API_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER,
  UPDATE_USERINFO,
} from "./actionTypes";

export const checkLogin = (user, history) => {
  return {
    type: CHECK_LOGIN,
    payload: { user, history },
  };
};

export const loginUser = (payload) => {
  return {
    type: LOGIN_USER,
    payload,
  };
};
export const registerUser = (payload) => {
  return {
    type: REGISTER_USER,
    payload,
  };
};
export const updateUserInfo = (payload) => {
  return {
    type: UPDATE_USERINFO,
    payload,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};
