import React from "react"
import PropTypes from 'prop-types'
import logo from '../../../../../../../images/logo.png'


const displayName = "HomePageHeader"
const propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
}

const Header = ({user, isAuthenticated}) => (
  <div className="container">
    <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <img src={logo} className="img-fluid" alt="Responsive image"/>
    </div>
    {
      isAuthenticated && user.type === 0 &&
      <div className="card-deck mb-3 text-center mt-3">
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal"><a className="p-2 text-dark" href="/agents">Agent</a></h4>
          </div>
          <div className="card-body">
            <ul className="list-unstyled mt-3 mb-4">
              <li>List of Agents</li>
              <li>Assign Player to Agent</li>
            </ul>
          </div>
        </div>
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal"><a className="p-2 text-dark" href="/players">Player</a></h4>
          </div>
          <div className="card-body">
            <ul className="list-unstyled mt-3 mb-4">
              <li>List of Players</li>
              <li>Import Data for Players</li>
              <li>Set Percentage</li>
              <li>View Player Report</li>
            </ul>
          </div>
        </div>
      </div>
    }
    {
      isAuthenticated && user.type === 1 &&
      <div className="card-deck mb-3 text-center mt-3">
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Player</h4>
          </div>
          <div className="card-body">
            <ul className="list-unstyled mt-3 mb-4">
              <li>List of Players</li>
              <li>View Player Report</li>
            </ul>
          </div>
        </div>
      </div>
    }
  </div>
)

Header.displayName = displayName
Header.propTypes = propTypes

export default Header
