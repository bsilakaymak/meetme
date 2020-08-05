import React from 'react';
import './App.css';
import AuthState from './context/authContext/AuthState';
import { GlobalStyle } from './components/Shared/Layout';
import Routes from './components/Routes/Routes';

const App: React.FC = () => {
  return (
    <AuthState>
      <GlobalStyle />
      <Routes />
    </AuthState>
  );
};

export default App;
