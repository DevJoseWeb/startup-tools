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
import Profile from 'pages/profile';
import Canvas from 'pages/canvas';
import Shared from 'pages/shared';

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
      <PrivateRoute path="/profile" component={Profile} />
      <GuestRoute path="/register" component={Register} />
      <GuestRoute path="/login" component={Login} />
      <GuestRoute path="/forgot-password" component={ForgotPassword} />
      <GuestRoute path="/reset-password/:token" component={ResetPassword} />
      <Route path="/shared/:id" component={Shared} />
    </div>
  </Router>
);

export default Routes;
