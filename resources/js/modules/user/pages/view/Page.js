// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {userDetails} from '../../service'

class Page extends Component {
  static displayName = 'ProfilePage'
  static propTypes = {
    match: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(userDetails(this.props.match.params));
  }

  renderInfo() {
    const {user} = this.props
    if (user.type === 2) {
      return this.props.user.info.map(function (info) {
        return (
          <div>
            <hr className="mb-4"/>
            <div className="col-md-12 order-md-1">
              <h4 className="mb-3">Agent</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name</label>
                  <div className="form-control">{info.agent.user.name}</div>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }

    if (user.type === 1) {
      return this.props.user.info.map(function (info) {
        return (
          <div>
            <hr className="mb-4"/>
            <div className="col-md-6 order-md-1">
              <h4 className="mb-3">Players</h4>
              <ul className="list-group">
                {
                  info.userPlayer.map(function (user) {
                    return <li key={user.id} className="list-group-item">{user.name}</li>
                  })
                }
              </ul>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    const {user} = this.props
    return (
      <div className="container">
        <div className="col-md-12 order-md-1">
          <h4 className="mb-3">Profile</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Username</label>
              <div className="form-control">{user.name}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Email</label>
              <div className="form-control">{user.email}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Phone</label>
              <div className="form-control">{user.phone}</div>
            </div>
            <div className="col-md-3 mb-3 align-self-end">
              <a className="btn btn-sm btn-primary btn-block"
                 href={`profile/edit/${user.id}`}>
                Edit Profile
              </a>
            </div>
          </div>
        </div>
        {this.renderInfo()}
      </div>
    )

  }
}

export default Page
