// import libs
import React, {Component} from "react";
import PropTypes from "prop-types";
import {assignPlayers, agentDetails} from '../../../service'
import { useHistory } from 'react-router-dom';

import {Modal, Button, Table} from "react-bootstrap";
import {connect} from "react-redux";

const displayName = "Description";

class AssignPlayerModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      checkedItems: new Map(),
      checked: false,
      openAssignPlayersModal: false
    };

    this.handleOpenAssignPlayerModal = this.handleOpenAssignPlayerModal.bind(this);
    this.handleSaveAssignment = this.handleSaveAssignment.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.setState({openAssignPlayersModal: this.props.openAssignPlayersModal});
  }

  handleOpenAssignPlayerModal() {
    this.setState({openAssignPlayersModal: true});
  }

  handleSaveAssignment() {
    let obj = Array.from(this.state.checkedItems).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
    let params = {};
    params.players = obj;
    params.agent = this.props.agentId;
    this.props.dispatch(assignPlayers(params));
    this.props.dispatch(agentDetails({id: this.props.userAgentId}));
    this.props.closeAssignPlayersModal();
  }

  handleSelect(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  render() {
    console.log(this.props)
    const {openAssignPlayersModal, closeAssignPlayersModal, agents} = this.props;
    if (agents.unassignedList) {
      return (
        <React.Fragment>
          <Modal show={openAssignPlayersModal} onHide={closeAssignPlayersModal}>
            <Modal.Header closeButton>
              <Modal.Title>Assign Players</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover size="sm">
                <thead>
                <tr>
                  <th>Player ID</th>
                  <th>Username</th>
                  <th>Assign To Agent</th>
                </tr>
                </thead>
                <tbody>
                {
                  agents.unassignedList.map((agent, i) => {
                    return (
                      <tr key={i}>
                        <td>{agent.playingId}</td>
                        <td>{agent.user.username}</td>
                        <td className="align-middle">
                          <input type="checkbox"
                                 name={agent.id}
                                 value={agent.id}
                                 onChange={(e) => this.handleSelect(e)} defaultChecked={this.state.checked}
                                 checked={this.state.checkedItems.get(agent.id)}/>
                        </td>
                      </tr>)
                  })
                }
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleSaveAssignment}>
                Save
              </Button>
              <Button variant="secondary" onClick={closeAssignPlayersModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
    } else {
      return "";
    }
  }
}

AssignPlayerModal.displayName = displayName;

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(AssignPlayerModal);