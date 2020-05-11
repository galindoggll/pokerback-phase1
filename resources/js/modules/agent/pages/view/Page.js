// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import {agentDetails, unassignedPlayers} from '../../service'

// import components
import AssignPlayerModal from "./components/AssignPlayerModal";

class Page extends Component {
  static displayName = 'AgentsPage'
  static propTypes = {
    match: PropTypes.object,
    agent: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      openAssignPlayersModal: false,
    };

    this.handleOpenAssignPlayerModal = this.handleOpenAssignPlayerModal.bind(this);
    this.setToggleAssignPlayerModal = this.setToggleAssignPlayerModal.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(agentDetails(this.props.match.params));
  }

  handleOpenAssignPlayerModal() {
    this.props.dispatch(unassignedPlayers(this.props.match.params));
    this.setState({openAssignPlayersModal: true});
  }

  setToggleAssignPlayerModal() {
    this.setState({openAssignPlayersModal: false});
  }

  renderPlayers() {
    if (this.props.agent.agent.player.length > 0) {
      return (
        this.props.agent.agent.player.map((player, i) => {
          return (
            <tr key={i}>
              <td>{player.playingId}</td>
              <td>{player.nickname}</td>
              <td>{player.user.email}</td>
            </tr>)
        })
      )
    } else {
      return (
        <tr>
          <td colSpan="3">No Players Assigned</td>
        </tr>)
    }
  }

  render() {
    const {userAgent, agent} = this.props.agent
    if (!userAgent && !agent) {
      return <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={2000} //3 secs
            />
          </div>
        </div>
      </div>
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4 className="mb-3">Agent Profile</h4>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label>Username</label>
                  <div className="form-control">{userAgent.username}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label>Email</label>
                  <div className="form-control">{userAgent.email}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label>Phone</label>
                  <div className="form-control">{userAgent.phone}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label>Rake Back</label>
                  <div className="form-control">{parseInt(agent.rakeback) || 0}</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4 className="">Assigned Players</h4>
              <div className="row">
                <table className="table table-responsive table-striped">
                  <thead className="thead-inverse">
                  <tr>
                    <th>Player ID</th>
                    <th>Nickname</th>
                    <th>Email</th>
                  </tr>
                  </thead>
                  <tbody>
                   {this.renderPlayers()}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-md-8 mb-3 mt-3">
                  <button className="btn btn-info" onClick={this.handleOpenAssignPlayerModal}>
                    Assign Player
                  </button>
                </div>
              </div>
            </div>
          </div>
          <AssignPlayerModal openAssignPlayersModal={this.state.openAssignPlayersModal}
                             closeAssignPlayersModal={this.setToggleAssignPlayerModal}
                             unassignedList={this.props}
                             userAgentId={userAgent.id}
                             agentId={agent.id}
          />
        </div>
      )
    }
  }
}

export default Page
