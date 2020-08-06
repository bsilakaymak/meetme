import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';

import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

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
}

const AuthState = (props: any) => {
  const initialState: InitialStateType = {
    user: null,
    isAuthenticated: false,
    loading: false,
    token: localStorage.getItem('token'),
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = async (FormData: AuthType): Promise<void> => {
    const config = {
      headers: {
        'Type-content': 'application/json',
      },
    };
    const data = await axios.post('http://localhost:5000/api/auth/login', FormData, config);

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
  const register = async (signUpForm: AuthType): Promise<void> => {
    console.log(signUpForm);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', signUpForm, config);
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
