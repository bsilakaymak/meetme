import React, { useReducer, useCallback } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_MEETINGS,
  CLEAR_CURRENT_MEETING,
  CLEAR_NOTES,
} from "../types";

interface AuthType {
  name?: string;
  email: string;
  password: string;
  company?: string;
}

export interface InitialStateType {
  user: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  token?: string | null;
  error: string[];
  login?: (FormData: AuthType) => Promise<void>;
  register?: (FormData: AuthType) => Promise<void>;
  loadUser?: () => Promise<void>;
  logout?: () => void;
}

const AuthState = (props: any) => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    token: localStorage.getItem("token"),
    error: [],
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("http://localhost:5000/api/auth/me");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: null });
    }
  }, []);

  const login = async (FormData: AuthType): Promise<void> => {
    const config = {
      headers: {
        "Type-content": "application/json",
      },
    };
    try {
      const data = await axios.post(
        "http://localhost:5000/api/auth/login",
        FormData,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data,
      });
    }
  };

  const register = async (signUpForm: AuthType): Promise<void> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        signUpForm,
        config
      );
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT, payload: null });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        login,
        logout,
        register,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
