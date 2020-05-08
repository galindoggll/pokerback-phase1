// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class PrivateHeader extends Component {
  static displayName = 'PrivateHeader'
  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object.isRequired,
    showNavigation: PropTypes.bool.isRequired,
    showDropdown: PropTypes.bool.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {user} = this.props
    if (user) {
      return (
        <div
          className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
          <h5 className="my-0 mr-md-auto font-weight-normal">Bluebird Gaming Inc.</h5>
            {
              user.type === 0 &&
              <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="/">Home</a>
                <a className="p-2 text-dark" href="/agents">Agents</a>
                <a className="p-2 text-dark" href="/players">Players</a>
                <a className="p-2 text-dark" href={`profile/${user.id}`}>Profile</a>
              </nav>
            }
            {
              user.type === 1 &&
              <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="/">Home</a>
                <a className="p-2 text-dark" href={`/players/agent-list/${user.id}`}>Players</a>
                <a className="p-2 text-dark" href={`profile/${user.id}`}>Profile</a>
              </nav>
            }
            {
              user.type === 2 &&
              <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="/">Home</a>
                <a className="p-2 text-dark" href={`/players/view-report/${user.id}/${user.type}`}>Report</a>
                <a className="p-2 text-dark" href={`profile/${user.id}`}>Profile</a>
              </nav>
            }
          <a className="btn btn-outline-danger" onClick={e => this.props.logout(e)}>Log Out</a>
        </div>
      );
    }
  }
}

export default PrivateHeader;
