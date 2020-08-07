import React, { useContext, useEffect } from "react";
import "./App.css";
import { GlobalStyle } from "./components/Shared/Layout";
import Routes from "./components/Routes/Routes";
import setAuthToken from "./utils/setAuthToken";
import AuthContext from "./context/authContext/authContext";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App: React.FC = () => {
  const { loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
};

export default App;
