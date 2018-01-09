import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import { isAuthenticated } from 'services/auth';

import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import ForgotPassword from 'pages/auth/forgotpassword';
import ResetPassword from 'pages/auth/resetpassword';
import Canvas from 'pages/canvas';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const Routes = () => (
  <Router>
    <div className="container">
      <PrivateRoute exact path="/" component={Canvas} />
      <GuestRoute path="/register" component={Register} />
      <GuestRoute path="/login" component={Login} />
      <GuestRoute path="/forgot-password" component={ForgotPassword} />
      <GuestRoute path="/reset-password/:token" component={ResetPassword} />
    </div>
  </Router>
);

export default Routes;
