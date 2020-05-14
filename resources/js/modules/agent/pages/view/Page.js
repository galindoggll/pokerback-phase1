// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import _ from 'lodash'
import {agentDetails, unassignedPlayers, assignPlayers, unassignPlayer} from '../../service'

// import components
import AssignPlayerModal from "./components/AssignPlayerModal";

class Page extends Component {
  static displayName = 'AgentsPage'
  static propTypes = {
    match: PropTypes.object,
    agent: PropTypes.object,
    userAgent: PropTypes.object,
    unassignedList: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      openAssignPlayersModal: false,
      checkedItems: new Map(),
      checked: false,
    };

    this.handleOpenAssignPlayerModal = this.handleOpenAssignPlayerModal.bind(this);
    this.setToggleAssignPlayerModal = this.setToggleAssignPlayerModal.bind(this);
    this.handleSaveAssignment = this.handleSaveAssignment.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemovePlayer = this.handleRemovePlayer.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(agentDetails(this.props.match.params));
    this.props.dispatch(unassignedPlayers());
  }

  handleOpenAssignPlayerModal() {
    //this.props.dispatch(unassignedPlayers(this.props.match.params));
    this.setState({openAssignPlayersModal: true});
  }

  setToggleAssignPlayerModal() {
    this.setState({openAssignPlayersModal: false});
  }

  handleSaveAssignment() {
    console.log(this.props.agent);
    let obj = Array.from(this.state.checkedItems).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
    let params = {};
    params.players = obj;
    params.agent = this.props.agent.id;
    this.props.dispatch(assignPlayers(params));
    this.props.dispatch(unassignedPlayers());
    //this.props.dispatch(agentDetails({id: this.props.userAgentId}));
    this.setToggleAssignPlayerModal();
  }

  handleSelect(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({checkedItems: prevState.checkedItems.set(item, isChecked)}));
  }

  handleRemovePlayer(e) {
    let params = {};
    params.agent = this.props.agent.id;
    params.player = parseInt(e.target.value)
    this.props.dispatch(unassignPlayer(params));
  }

  renderPlayers() {
    if (!_.isUndefined(this.props.agent.player)) {
      return (
        this.props.agent.player.map((player, i) => {
          return (
            <tr key={i}>
              <td>{player.playingId}</td>
              <td>{player.nickname}</td>
              <td>{player.user.email}</td>
              <td>
                <button className="btn btn-danger"
                        name={player.id}
                        value={player.id}
                        onClick={(e) => this.handleRemovePlayer(e)}>
                  Remove
                </button>
              </td>
            </tr>)
        })
      )
    } else {
      return (
      <tr>
        <td colSpan="3">No Players Assigned</td>
      </tr>
      )
    }
  }

  render() {
    const {userAgent, agent} = this.props
    console.log(agent);
    if (_.isEmpty(userAgent) && _.isEmpty(agent)) {
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
                  {
                    !_.isEmpty(this.props.agent) && this.renderPlayers()
                  }
                  </tbody>
                </table>
              </div>
              <hr/>
              <div className="row">
                <AssignPlayerModal openAssignPlayersModal={this.state.openAssignPlayersModal}
                                   closeAssignPlayersModal={this.setToggleAssignPlayerModal}
                                   unassignedList={this.props.unassignedList}
                                   checked={this.state.checked}
                                   handleSaveAssignment={this.handleSaveAssignment}
                                   handleSelect={this.handleSelect}
                                   checkedItems={this.state.checkedItems}
                />

              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Page
