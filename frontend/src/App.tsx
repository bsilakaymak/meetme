import React from "react";
import "./App.css";
import AuthState from "./context/authContext/AuthState";
import { GlobalStyle } from "./components/Shared/Layout";

const App: React.FC = () => {
  return (
    <AuthState>
      <GlobalStyle />
    </AuthState>
  );
};

export default App;
