import React from 'react';
import './App.css';

import SignIn from './pages/SignIn/SignIn';
// import SignUp from './pages/SignUp/SignUp';

import { AuthProvider } from './context/AuthContext';

const App = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  </>
);

export default App;
