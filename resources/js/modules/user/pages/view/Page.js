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
    if (user.type === 2 && user.info.info) {
      return (
        <div className="text-center">
          <div className="mt-lg-5 card box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Agent</h4>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mt-3 mb-4">
                <li>{user.info.info[0].agent.user.name}</li>
                <li>{user.info.info[0].agent.user.email}</li>
                <li>{user.info.info[0].agent.user.phone}</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }

    if (user.type === 1 && user.info.info) {
      return (
        <div className="order-md-1">
          <h4 className="mb-3">Players</h4>
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
              user.info.info[0].player.map((player, i) => {
                return (
                  <tr key={i}>
                    <td>{player.playingId}</td>
                    <td>{player.nickname}</td>
                    <td>{player.user.email}</td>
                  </tr>)
              })
            }
            </tbody>
          </table>
        </div>
      )
    }
  }

  render() {
    const {user} = this.props
    if (user) {
      return (
        <div className="container">
          <div className="col-md-12 order-md-1">
            <div className="row">
              <div className="col-md-6">
                <h4 className="mb-3">Profile</h4>
                <div className="mb-3">
                  <label>Username</label>
                  <div className="form-control">{user.name}</div>
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <div className="form-control">{user.email}</div>
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <div className="form-control">{user.phone}</div>
                  {/*<div className="col-md-3 mb-3 align-self-end">*/}
                  {/*<a className="btn btn-sm btn-primary btn-block"*/}
                  {/*href={`profile/edit/${user.id}`}>*/}
                  {/*Edit Profile*/}
                  {/*</a>*/}
                  {/*</div>*/}
                </div>
              </div>
              <div className="col-md-6">
                {this.renderInfo()}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Page
