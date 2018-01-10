/* Core */
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { toast } from 'react-toastify';
import { isEqual } from 'lodash';
import { Link } from 'react-router-dom';

import api from 'services/api';
import Button from 'components/Button';

import './styles.css';

export default class Canvas extends Component {
  state = {
    canvasList: [],
    selectedCanvas: null,
    newCanvasLoading: false,
    loadingCanvasList: false,
    saveCanvasLoading: false,
    deleteCanvasLoading: false,
    shareCanvasLoading: false,
  }

  componentWillMount() {
    window.addEventListener("beforeunload", e => {
      const confirmationMessage = 'Seu canvas possui alterações não salvas, deseja realmente sair?';

      if (this.checkUnsavedChanges()) {
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      }
    });
  }

  async componentDidMount() {
    this.setState({ loadingCanvasList: true });

    const user = JSON.parse(localStorage.getItem('@JumpstartTools:user'));

    try {
      const response = await api.get(`canvas/from/${user.id}`);

      this.setState({ canvasList: response.data.canvas });
    } catch (err) {
    }

    this.setState({ loadingCanvasList: false });
  }

  checkUnsavedChanges = () => {
    const { selectedCanvas, canvasList } = this.state;

    if (selectedCanvas === null)
      return false;

    const canvas = canvasList.find(findCanvas => findCanvas.id === selectedCanvas.id);

    return !isEqual(canvas, selectedCanvas);
  }

  logout = async () => {
    if (this.checkUnsavedChanges()
      && window.confirm('Você possui algumas alterações no seu canvas que não foram salvas, deseja salvar agora?')) {
      await this.saveCanvas();
    }

    localStorage.removeItem('@JumpstartTools:token');
    localStorage.removeItem('@JumpstartTools:user');

    this.props.history.push('/login');
  }

  loadCanvas = async canvas => {
    if (this.checkUnsavedChanges()
      && window.confirm('Você possui algumas alterações no seu canvas que não foram salvas, deseja salvar agora?')) {
      await this.saveCanvas();
    }

    this.setState({ selectedCanvas: canvas });
  }

  newCanvas = async () => {
    if (this.checkUnsavedChanges()
      && window.confirm('Você possui algumas alterações no seu canvas que não foram salvas, deseja salvar agora?')) {
      await this.saveCanvas();
    }

    this.setState({ newCanvasLoading: true });

    try {
      const response = await api.post('canvas');

      this.setState({
        canvasList: [response.data.canva, ...this.state.canvasList],
        selectedCanvas: response.data.canva,
      });

      toast.info('Clique em um quadrante para preencher');
    } catch (err) {
    }

    this.setState({ newCanvasLoading: false });
  }

  saveCanvas = async () => {
    const { selectedCanvas } = this.state;

    this.setState({ saveCanvasLoading: true });

    try {
      await api.put(`canvas/${selectedCanvas.id}`, selectedCanvas);

      let canvasList = [ ...this.state.canvasList ];

      canvasList = canvasList.map(canvas =>
        canvas.id === selectedCanvas.id ? selectedCanvas : canvas
      );

      this.setState({ canvasList });

      toast.success('Canvas salvo com sucesso!');
    } catch (err) {
    }

    this.setState({ saveCanvasLoading: false, saveModalVisible: false });
  }

  deleteCanvas = async () => {
    if (!window.confirm('Tem certeza que deseja deletar esse canvas?'))
      return;

    const { selectedCanvas } = this.state;

    this.setState({ deleteCanvasLoading: true });

    try {
      await api.delete(`canvas/${selectedCanvas.id}`);

      let canvasList = [ ...this.state.canvasList ];

      canvasList = canvasList.filter(canvas =>
        canvas.id !== selectedCanvas.id
      );

      this.setState({ canvasList, selectedCanvas: null });

      toast.success('Canvas deletado com sucesso!');
    } catch (err) {
    }

    this.setState({ deleteCanvasLoading: false });
  }

  shareCanvas = () => {

  }

  renderCanvas = () => {
    const canvas = this.state.selectedCanvas;

    return (
      <Fragment>
        <header>
          <div className="board-title">
            <input
              type="text"
              name="name"
              placeholder="Dê um nome ao canvas"
              value={canvas.title}
              onChange={e => this.setState({ selectedCanvas: { ...this.state.selectedCanvas, title: e.target.value } })}
            />
            <i className="fa fa-pencil" />
          </div>

          <div className="buttons">
            <Button
              className="button-share"
              size="small"
              color="info"
              onClick={this.shareCanvas}
              loading={this.state.shareCanvasLoading}
            >
              <i class="fa fa-share" />&nbsp; Compartilhar
            </Button>
            <Button
              style={{ width: 150 }}
              size="small"
              color="info"
              onClick={this.saveCanvas}
              loading={this.state.saveCanvasLoading}
            >
              Salvar canvas
            </Button>
            <Button
              className="button-remove"
              size="small"
              color="danger"
              onClick={this.deleteCanvas}
              loading={this.state.deleteCanvasLoading}
            >
              <i className="fa fa-trash" />
            </Button>
          </div>
        </header>

        <div className="canvas">
          <div className="line">
            <div className="column">
              <div className="quadrant">
                <strong>Problema</strong>
                <textarea
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

  renderCanvasOrEmpty = () => (
    this.state.selectedCanvas !== null
      ? this.renderCanvas()
      : <div className="not-selected">Nenhum canvas selecionado</div>
  )

  render() {
    const user = JSON.parse(localStorage.getItem('@JumpstartTools:user'));

    return (
      <Fragment>
        <div className="canvas-container">
          <div className="sidebar">
            <div className="list-container">
              <h1>Meus canvas ({this.state.canvasList.length})</h1>

              <Button type="block" onClick={this.newCanvas} loading={this.state.newCanvasLoading}>
                <i className="fa fa-plus" />
              </Button>

              <Scrollbars renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{display:"none"}}/>} className="scrollbar">
                <ul className="canvas-list">
                  { this.state.canvasList.map(canvas => (
                    <li
                      key={canvas.id}
                      className={(this.state.selectedCanvas && this.state.selectedCanvas.id === canvas.id) ? 'active' : ''}
                      onClick={() => this.loadCanvas(canvas)}
                    >
                      <div>
                        <strong>{canvas.title}</strong>
                        <p>Alterado: {canvas.lastUpdatedAt}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Scrollbars>
            </div>

            <div className="buttons">
              <div className="profile">
                <div className="info">
                  <p>Olá, <strong>{user.name}</strong></p>
                  <Link to="/profile">Alterar perfil</Link>
                </div>
                <Button className="logout-button" size="small" color="danger" onClick={this.logout}>
                  <i className="fa fa-sign-out" />
                </Button>
              </div>
            </div>
          </div>

          <div className="board">
            { this.renderCanvasOrEmpty() }
          </div>
        </div>
      </Fragment>
    );
  }
}