import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';

import Dashboard from '../pages/Dashboard/Dashboard';

const { user } = useAuth;
const isPrivate = false;

const Routes = (location) => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard">
      {isPrivate === user ? (
        <Redirect to={{ pathname: '/', state: { from: location } }} />
      ) : (
        <Dashboard />
      )}
    </Route>
  </Switch>
);

export default Routes;
