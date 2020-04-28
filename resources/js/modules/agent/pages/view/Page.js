// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import {agentListRequest, agentDetails} from '../../service'

// import components
import {Link} from 'react-router-dom'
import Pagination from './../../../article/pages/list/components/Pagination'

class Page extends Component {
  static displayName = 'AgentsPage'
  static propTypes = {
    match: PropTypes.object,
    user: PropTypes.object,
    agent: PropTypes.object,
    agents: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(agentDetails(this.props.match.params));
  }

  renderInfo() {
    return this.props.agents.detail.map(function (info) {
      return (
        <ul className="list-group">
          {
            info.userPlayer.map(function (user) {
              return <li key={user.id} className="list-group-item">{user.name}</li>
            })
          }
        </ul>
      )
    })
  }

  render() {
    console.log(this.props)
    const {agents, match} = this.props
    const id = match.params.id
    const agent = _.filter(agents.data,
      function (o) {
        if (o.id === parseInt(id)) {
          return o;
        }
      });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4 className="mb-3">Agent Profile</h4>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label>Username</label>
                <div className="form-control">{}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label>Email</label>
                <div className="form-control">{}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label>Phone</label>
                <div className="form-control">{}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label>Rake Back</label>
                <div className="form-control"></div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="">Assigned Players</h4>
            <div className="row">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Page
