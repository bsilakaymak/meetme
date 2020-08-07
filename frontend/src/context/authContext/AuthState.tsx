import React, { useReducer } from "react";
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
  error: string | null;
  login?: (FormData: AuthType) => Promise<void>;
  register?: (FormData: AuthType) => Promise<void>;
  loadUser: () => Promise<void>;
}

const AuthState = (props: any) => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    token: localStorage.getItem("token"),
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("http://localhost:5000/api/auth/me");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: null });
    }
  };
  const login = async (FormData: AuthType): Promise<void> => {
    const config = {
      headers: {
        "Type-content": "application/json",
      },
    };
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
    try {
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.errors,
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
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
