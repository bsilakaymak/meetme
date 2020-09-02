import React from "react";
import "./App.css";
import { GlobalStyle } from "./components/Shared/Layout";
import Routes from "./components/Routes/Routes";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
};

export default App;
