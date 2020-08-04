import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";

import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../types";

interface MyContextType {
  user?: any;
  token?: any;
  loading?: any;
  error?: any;
  isAuthenticated?: any;
  login: (authForm: any) => Promise<void>;
  register: (FormData: any) => Promise<void>;
}
const AuthState = (props) => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    token: localStorage.getItem("token"),
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = async (authForm) => {
    const config = {
      headers: {
        "Type-content": "application/json",
      },
    };
    const data = await axios.post(
      "http://localhost:5000/api/auth/signup",
      config,
      authForm
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.data,
    });
    try {
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
  const register = async (FormData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users", FormData, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      // loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
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
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
