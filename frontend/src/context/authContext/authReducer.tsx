import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGOUT,
  REGISTER_FAIL,
  AUTH_ERROR,
} from "../types";

import { InitialStateType } from "./AuthState";

interface Actions {
  type: string;
  payload: any;
}

export default (state: InitialStateType, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
      };

    default:
      return state;
  }
};
