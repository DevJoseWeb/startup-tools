/* Core */
import React, { Component, Fragment } from 'react';

import api from 'services/api';

export default class Shared extends Component {
  state = {
    selectedCanvas: null,
    loading: true,
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    try {
      const response = await api.get(`canvas/${id}`);

      this.setState({ selectedCanvas: response.data.canva });
    } catch (err) {
      this.props.history.push('/login');
    }

    this.setState({ loading: false });
  }

  renderCanvas = () => {
    const canvas = this.state.selectedCanvas;

    return (
      <Fragment>
        <header>
          <div className="board-title">
            <input
              type="text"
              placeholder="Dê um nome ao canvas"
              value={canvas.title}
              onChange={e => this.setState({ selectedCanvas: { ...this.state.selectedCanvas, title: e.target.value } })}
              readOnly
            />
          </div>

          <div className="buttons" />
        </header>

        <div className="canvas">
          <div className="line">
            <div className="column">
              <div className="quadrant">
                <strong>Problema</strong>
                <textarea
                  readOnly
                  value={canvas.board[0] || ''}
                  onChange={e => {
                    const board = [...this.state.selectedCanvas.board];
                    board[0] = e.target.value;

                    this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                  }}
                />
              </div>
              <div className="quadrant sub">
                <strong>Solução atual</strong>
                <textarea
                  readOnly
                  value={canvas.board[1] || ''}
                  onChange={e => {
                    const board = [...this.state.selectedCanvas.board];
                    board[1] = e.target.value;

                    this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                  }}
                />
              </div>
            </div>
            <div className="column">
              <div className="quadrant">
                <strong>Solução</strong>
                <textarea
                  readOnly
                  value={canvas.board[2] || ''}
                  onChange={e => {
                    const board = [...this.state.selectedCanvas.board];
                    board[2] = e.target.value;

                    this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                  }}
                />
              </div>
              <div className="quadrant">
                <strong>Riscos</strong>
                <textarea
                  readOnly
                  value={canvas.board[3] || ''}
                  onChange={e => {
                    const board = [...this.state.selectedCanvas.board];
                    board[3] = e.target.value;

                    this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                  }}
                />
              </div>
            </div>
            <div className="column">
              <div className="quadrant">
                <strong>Proposta de valor</strong>
                <textarea
                  readOnly
                  value={canvas.board[4] || ''}
                  onChange={e => {
                    const board = [...this.state.selectedCanvas.board];
                    board[4] = e.target.value;

                    this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                  }}
                />
              </div>
              <div className="quadrant sub">
                <strong>Conceito</strong>
                <textarea
                  readOnly
                  value={canvas.board[5] || ''}
                  onChange={e => {
                    const board = [...this.state.selectedCanvas.board];
                    board[5] = e.target.value;

                    this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                  }}
                />
              </div>
            </div>
            <div className="column">
              <div className="quadrant">
                <strong>Canais</strong>
                <textarea
                  readOnly
                  value={canvas.board[6] || ''}
                  onChange={e => {
                    const board = [...this.state.selectedCanvas.board];
                    board[6] = e.target.value;

                    this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                  }}
                />
              </div>
              <div className="quadrant">
                <strong>Vantagens</strong>
                <textarea
                  readOnly
                  value={canvas.board[7] || ''}
                  onChange={e => {
                    const board = [...this.state.selectedCanvas.board];
                    board[7] = e.target.value;

                    this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                  }}
                />
              </div>
            </div>
            <div className="column">
              <div className="quadrant">
                <strong>Público</strong>
                <textarea
                  readOnly
                  value={canvas.board[8] || ''}
                  onChange={e => {
                    const board = [...this.state.selectedCanvas.board];
                    board[8] = e.target.value;

                    this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                  }}
                />
              </div>
              <div className="quadrant sub">
                <strong>Mercado</strong>
                <textarea
                  readOnly
                  value={canvas.board[9] || ''}
                  onChange={e => {
                    const board = [...this.state.selectedCanvas.board];
                    board[9] = e.target.value;

                    this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                  }}
                />
              </div>
            </div>
          </div>
          <div className="line">
            <div className="quadrant">
              <strong>Custos</strong>
              <textarea
                readOnly
                value={canvas.board[10] || ''}
                onChange={e => {
                  const board = [...this.state.selectedCanvas.board];
                  board[10] = e.target.value;

                  this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                }}
              />
            </div>
            <div className="quadrant">
              <strong>Receita</strong>
              <textarea
                readOnly
                value={canvas.board[11] || ''}
                onChange={e => {
                  const board = [...this.state.selectedCanvas.board];
                  board[11] = e.target.value;

                  this.setState({ selectedCanvas: { ...this.state.selectedCanvas, board } })
                }}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <div className="canvas-container">
          <div style={{ marginLeft: 0 }} className="board">
            { this.state.loading
              ? <div className="loading"><i className="fa fa-spinner fa-pulse" /></div>
              : this.renderCanvas() }
          </div>
        </div>
      </Fragment>
    );
  }
}
