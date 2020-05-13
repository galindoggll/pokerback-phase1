import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Modal, Button, Table} from "react-bootstrap";

const displayName = 'AssignPlayerModal'
const propTypes = {
  openAssignPlayersModal: PropTypes.bool,
  closeAssignPlayersModal: PropTypes.func,
  unassignedList: PropTypes.object,
  userAgentId: PropTypes.number,
  agentId: PropTypes.number,
  checked: PropTypes.bool,
  handleSaveAssignment: PropTypes.func,
  handleSelect: PropTypes.func,
  checkedItems: PropTypes.object
}

const AssignPlayerModal = ({openAssignPlayersModal, closeAssignPlayersModal, unassignedList, userAgentId, agentId, checked, handleSaveAssignment, handleSelect, checkedItems}) => (
  <Modal animation={false} show={openAssignPlayersModal} onHide={closeAssignPlayersModal}>
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
          unassignedList.length > 0 &&
          unassignedList.map((agent, i) => {
            return (
              <tr key={i}>
                <td>{agent.playingId}</td>
                <td>{agent.user.username}</td>
                <td className="align-middle">
                  <input type="checkbox"
                         name={agent.id}
                         value={agent.id}
                         onChange={(e) => handleSelect(e)} defaultChecked={checked}
                         checked={checkedItems.get(agent.id)}/>
                </td>
              </tr>)
          })
        }
        </tbody>
      </Table>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleSaveAssignment}>
        Save
      </Button>
      <Button variant="secondary" onClick={closeAssignPlayersModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
)

AssignPlayerModal.displayName = displayName
AssignPlayerModal.propTypes = propTypes

export default AssignPlayerModal
