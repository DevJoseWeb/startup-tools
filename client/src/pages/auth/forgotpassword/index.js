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
    email: '',
  }

  componentDidMount() {
    this._firstInput.focus();
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email } = this.state;

    this.setState({ loading: true });

    try {
      await api.post('auth/forgot_password', { email });

      toast.success("Enviamos uma confirmação para seu e-mail!");

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
          <div className="form-box">
            <h1>Malditas senhas...</h1>
            <p>
              Você receberá um e-mail contendo informações para recuperação de senha.
            </p>
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

              <Button type="submit">
                { this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'Receber e-mail' }
              </Button>
            </form>

            <div className="links">
              <Link to="login">Voltar</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
