import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const displayName = 'AssignPlayerModal'
const propTypes = {
  openAssignPlayersModal: PropTypes.bool,
  closeAssignPlayersModal: PropTypes.func,
  unassignedList: PropTypes.object,
  checked: PropTypes.bool,
  handleSaveAssignment: PropTypes.func,
  handleSelect: PropTypes.func,
  checkedItems: PropTypes.object
}

const AssignPlayerModal = ({openAssignPlayersModal, closeAssignPlayersModal, unassignedList, checked, handleSaveAssignment, handleSelect, checkedItems}) => (
  <div className="col-md-12">
    <h4 className="">Unassigned Players</h4>
    <div className="row overflow-auto"  style={{maxHeight: "500px"}}>
      <table className="table table-striped table-responsive-md">
        <thead>
        <tr>
          <th>Player ID</th>
          <th>Nickname</th>
          <th>Assign To Agent</th>
        </tr>
        </thead>
        <tbody className="overflow-auto">
        {
          !_.isEmpty(unassignedList) &&
          unassignedList.map((agent, i) => {
            return (
              <tr key={i}>
                <td>{agent.playingId}</td>
                <td>{agent.nickname}</td>
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
        {
          _.isEmpty(unassignedList) &&
          <tr>
            <td colSpan={3}>No Unassigned Players</td>
          </tr>
        }
        </tbody>
      </table>
    </div>
    <div className="row">
      <div className="col-md-8 mb-3 mt-3">
        <button className="btn btn-info" onClick={handleSaveAssignment}>
          Assign Player
        </button>
      </div>
    </div>
  </div>
)

AssignPlayerModal.displayName = displayName
AssignPlayerModal.propTypes = propTypes

export default AssignPlayerModal
