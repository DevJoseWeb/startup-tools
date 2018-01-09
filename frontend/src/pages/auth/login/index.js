/* Core */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from 'services/api';

import Button from 'components/Button';

import '../styles.css';

export default class Login extends Component {
  state = {
    loading: false,
    email: '',
    password: '',
  }

  componentDidMount() {
    const email = localStorage.getItem('@JumpstartTools:email') || '';

    if (email) {
      this.setState({ email });
      this._secondInput.focus();
    } else {
      this._firstInput.focus();
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    this.setState({ loading: true });

    try {
      const response = await api.post('auth/authenticate', { email, password });

      localStorage.setItem('@JumpstartTools:email', email);
      localStorage.setItem('@JumpstartTools:token', response.data.token);
      localStorage.setItem('@JumpstartTools:user', JSON.stringify(response.data.user));

      this.props.history.push('/');
    } catch (err) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <h1>Startup Tools</h1>
          <div className="login-box">
            <h1>Acessar plataforma</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                required
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                ref={input => this._firstInput = input}
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />

              <input
                required
                type="password"
                name="password"
                placeholder="Sua senha secreta"
                ref={input => this._secondInput = input}
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />

              <Button type="submit">
                { this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'Entrar' }
              </Button>
            </form>

            <div className="links">
              <Link to="forgot-password">Esqueci a senha</Link>
              <Link to="register">Criar nova conta</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
