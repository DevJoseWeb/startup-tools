import React, { Component, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

import 'config/toast';
import 'font-awesome/css/font-awesome.min.css';
import 'assets/forms.css';
import 'assets/global.css';

import Routes from './routes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ToastContainer
          autoClose={3000}
          toastClassName="toaster"
          position="top-center"
        />

        <Routes />
      </Fragment>
    );
  }
}

export default App;
