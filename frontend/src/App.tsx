import React from "react";
import "./App.css";

import { GlobalStyle } from "./components/Shared/Layout";
import Routes from "./components/Routes/Routes";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
};

export default App;
