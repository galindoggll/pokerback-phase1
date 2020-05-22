// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'
import _ from 'lodash'
import {agentListRequest} from '../../service'

// import components
import {Link} from 'react-router-dom'


class Page extends Component {
  static displayName = 'PlayersPage'
  static propTypes = {
    meta: PropTypes.object.isRequired,
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  UNSAFE_componentWillMount() {
    const {dispatch} = this.props

    dispatch(agentListRequest({}))
  }

  renderAgents() {
    if (this.props.agents.length > 0) {
      return (
        this.props.agents.map(function (agent, i) {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>
                <Link to={`agent/${agent.id}`} className="btn btn-primary">View Agent</Link>
              </td>
            </tr>)
        })
      )
    } else {
      return (
        <tr>
          <td colspan={4}>No Agents</td>
        </tr>
      )
    }
  }

  render() {
    const {agents} = this.props
    if (!_.isEmpty(agents)) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="row">
                <div className="col"><h1>Agents</h1></div>
              </div>
              <table className="table table-responsive table-striped table-responsive-lg">
                <thead className="thead-inverse">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {this.renderAgents()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container">
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
        </div>)
    }
  }
}

export default Page
