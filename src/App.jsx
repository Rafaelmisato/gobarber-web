import React from 'react';
import './App.css';

import SignIn from './pages/SignIn/SignIn';
// import SignUp from './pages/SignUp/SignUp';

import AppProvider from './hooks/index';

const App = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>
  </>
);

export default App;
