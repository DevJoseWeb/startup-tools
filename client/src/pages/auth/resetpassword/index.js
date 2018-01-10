/* Core */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from 'services/api';

import Button from 'components/Button';

import '../styles.css';

export default class ForgotPassword extends Component {
  state = {
    loading: false,
    password: '',
    password_confirm: '',
  }

  componentDidMount() {
    this._firstInput.focus();
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { token } = this.props.match.params;
    const { password, password_confirm } = this.state;

    this.setState({ loading: true });

    try {
      await api.post('auth/reset_password', {
        token,
        password,
        password_confirm,
      });

      toast.success("Senha alterada com sucesso!");

      this.props.history.push('/login');
    } catch (err) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <h1>Startup Tools</h1>
          <div className="form-box">
            <h1>Ufa... você voltou!</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                required
                type="password"
                name="password"
                placeholder="Digite sua nova senha"
                ref={input => this._firstInput = input}
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />

              <input
                required
                type="password"
                name="password_confirm"
                placeholder="Confirme a senha"
                value={this.state.password_confirm}
                onChange={e => this.setState({ password_confirm: e.target.value })}
              />

              <Button type="submit">
                { this.state.loading ? <i class="fa fa-spinner fa-pulse" /> : 'Resetar senha' }
              </Button>
            </form>

            <div className="links">
              <Link to="/login">Cancelar</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
