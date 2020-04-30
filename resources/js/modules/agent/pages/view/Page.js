// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner'
import {agentDetails, unassignedPlayers} from '../../service'

// import components
import {Link} from 'react-router-dom'
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

  componentDidMount() {
    this.props.dispatch(agentDetails(this.props.match.params));
  }

  handleOpenAssignPlayerModal() {
    this.props.dispatch(unassignedPlayers(this.props.match.params));
    this.setState({openAssignPlayersModal: true});
  }

  setToggleAssignPlayerModal() {
    this.setState({openAssignPlayersModal: false});
  }

  render() {
    let {userAgent, agent, playerList} = this.props.agent
    if (userAgent) {
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
                  <div className="form-control">{agent.rakeback}</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4 className="">Assigned Players</h4>
              <div className="row">
                <ul className="list-group col-md-7 ml-3">
                  {
                    playerList.length > 0 &&
                    playerList.map(function (player, index) {
                      return <li key={index} className="list-group-item">{player.username}</li>
                    })
                  }
                  {
                    playerList.length === 0 &&
                    <li className="list-group-item">No Players Assigned</li>
                  }
                </ul>
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
    } else {
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
    }
  }
}

export default Page
