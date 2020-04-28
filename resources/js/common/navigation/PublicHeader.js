// import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import { Collapse } from 'reactstrap'
import NavItem from './NavItem'

// define component name
const displayName = 'PublicHeader'

// validate properties
const propTypes = {
  showNavigation: PropTypes.bool.isRequired,
}

// initiate comppnent
const PublicHeader = ({ showNavigation }) => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
    <h5 className="my-0 mr-md-auto font-weight-normal">Bluebird Gaming Inc.</h5>
    <nav className="my-2 my-md-0 mr-md-3">
      <a className="p-2 text-dark" href="#">Contact</a>
      <a className="p-2 text-dark" href="#">About Us</a>
      <a className="p-2 text-dark" href="/register">Sign Up</a>
    </nav>
    <a className="btn btn-outline-primary" href="/login">Log In</a>
  </div>)

// bind properties
PublicHeader.displayName = displayName
PublicHeader.propTypes = propTypes

// export component
export default PublicHeader
