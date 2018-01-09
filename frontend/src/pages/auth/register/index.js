/* Core */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from 'services/api';
import Button from 'components/Button';

import '../styles.css';

export default class Register extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    password: '',
  }

  componentDidMount() {
    this._firstInput.focus();
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { name, email, password } = this.state;

    this.setState({ loading: true });

    try {
      const response = await api.post('auth/register', { name, email, password });

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
            <h1>Só falta 3 campos...</h1>
            <p>Fica tranquilo, seus dados estão seguros :)</p>
            <form onSubmit={this.handleSubmit}>

              <input
                required
                type="text"
                name="name"
                placeholder="Seu nome completo"
                ref={input => this._firstInput = input}
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />

              <input
                required
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />

              <input
                required
                type="password"
                name="password"
                placeholder="Sua senha secreta"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />

              <Button type="submit">
                { this.state.loading ? <i class="fa fa-spinner fa-pulse" /> : 'Criar conta grátis' }
              </Button>
            </form>

            <div className="links">
              <Link to="login">Já tenho conta</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
