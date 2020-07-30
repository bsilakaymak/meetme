import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  let history = useHistory();
  const switchToSignUp = () => {
    setIsLoginMode(false);
  };
  const switchToLogin = () => {
    setIsLoginMode(true);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  const login = () => {
    //call login
    history.push('/meeting-overview');
  };
  const signup = () => {
    // call signup
    history.push('/meeting-overview');
  };
  const loginHTML = (
    <>
      <label for="email"> Email:</label>
      <br />
      <input type="email" id="email" name="email" value="" />
      <br />
      <label for="password"> Password:</label>
      <br />
      <input type="password" id="password" name="password" />
    </>
  );
  const signupHTML = (
    <>
      <label for="firstName">First name:</label>
      <br />
      <input type="text" id="firstName" name="firstName" value="" />
      <br />
      <label for="lastName">Last name:</label>
      <br />
      <input type="text" id="lastName" name="lastName" value=""></input> <br />
      <label for="email"> Email:</label>
      <br />
      <input type="email" id="email" name="email" value="" />
      <br />
      <label for="companyName"> Company Name:</label>
      <br />
      <input type="text" id="companyName" name="companyName" value=""></input>
      <br />
      <label for="password"> Password:</label>
      <br />
      <input type="password" id="password" name="password" />
    </>
  );
  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        <button onClick={switchToSignUp}> SignUp </button>{' '}
        <button onClick={switchToLogin}> Login </button>
      </div>
      {isLoginMode ? loginHTML : signupHTML}
      <br />
      {isLoginMode ? (
        <button onClick={login}> Login </button>
      ) : (
        <button onClick={signup}> SignUp </button>
      )}
    </form>
  );
};

export default Auth;
