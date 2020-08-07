import React from "react";
import "./App.css";

import { GlobalStyle } from "./components/Shared/Layout";
import Routes from "./components/Routes/Routes";
import AuthState from "context/authContext/AuthState";

const App: React.FC = () => {
  return (
    <AuthState>
      <GlobalStyle />
      <Routes />
    </AuthState>
  );
};

export default App;
