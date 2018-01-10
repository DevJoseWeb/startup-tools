/* Core */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from 'services/api';

import Button from 'components/Button';

import './styles.css';

export default class Profile extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    password: '',
    new_password: '',
    new_password_confirm: '',
  }

  componentDidMount() {
    const { name, email } = JSON.parse(localStorage.getItem('@JumpstartTools:user'));

    this.setState({ name, email });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { name, password, new_password, new_password_confirm } = this.state;

    this.setState({ loading: true });

    try {
      const response = await api.put(`users`, {
        name,
        password,
        new_password,
        new_password_confirm,
      });

      localStorage.setItem('@JumpstartTools:user', JSON.stringify(response.data.user));

      toast.success('Perfil atualizado com sucesso!');

      this.props.history.push('/');
    } catch (err) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="profile-wrapper">
        <div className="profile-container">
          <div className="form-box">
            <h1>Meu perfil</h1>
            <p>Seu e-mail é: {this.state.email}</p>
            <form onSubmit={this.handleSubmit}>
              <input
                required
                type="name"
                placeholder="Seu nome completo"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />

              <input
                required
                type="password"
                placeholder="Sua senha secreta"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />

              <hr />

              <input
                type="password"
                placeholder="Quer alterar sua senha?"
                value={this.state.new_password}
                onChange={e => this.setState({ new_password: e.target.value })}
              />

              <input
                type="password"
                placeholder="Confirme sua nova senha"
                value={this.state.new_password_confirm}
                onChange={e => this.setState({ new_password_confirm: e.target.value })}
              />

              <Button type="submit">
                { this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'Atualizar' }
              </Button>
            </form>

            <div className="links">
              <Link to="/">Cancelar</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
