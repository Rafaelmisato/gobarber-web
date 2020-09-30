import React from 'react';
import './App.css';

import SignIn from './pages/SignIn/SignIn';
// import SignUp from './pages/SignUp/SignUp';

import ToastContainer from './components/ToastContainer/ToastContainer';
import { AuthProvider } from './hooks/AuthContext';

const App = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <ToastContainer />
  </>
);

export default App;
