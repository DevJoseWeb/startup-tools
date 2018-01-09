import React, { Component, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

import 'font-awesome/css/font-awesome.min.css';
import 'assets/global.css';

import Routes from './routes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ToastContainer position="top-center" />
        <Routes />
      </Fragment>
    );
  }
}

export default App;
