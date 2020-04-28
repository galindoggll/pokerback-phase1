// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {agentListRequest} from '../../service'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

// import components
import {Link} from 'react-router-dom'
import Pagination from './../../../article/pages/list/components/Pagination'
import Loader from 'react-loader-spinner'

class Page extends Component {
  static displayName = 'PlayersPage'
  static propTypes = {
    meta: PropTypes.object.isRequired,
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.pageChange = this.pageChange.bind(this)
    this.handleViewAgent = this.handleViewAgent.bind(this)
  }

  UNSAFE_componentWillMount() {
    const {dispatch} = this.props

    dispatch(agentListRequest({}))
  }

  pageChange(pageNumber) {
    this.props.dispatch(agentListRequest({pageNumber}))
  }

  handleViewAgent(agent) {
    console.log(agent)
    //this.props.dispatch(agentListRequest({pageNumber}))
  }

  renderAgents() {

  }

  render() {
    const {agents} = this.props
    if (agents) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="row">
                <div className="col"><h1>Agents</h1></div>
              </div>
              <table className="table table-responsive table-striped">
                <thead className="thead-inverse">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {
                  agents.map(function (agent, i) {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{agent.name}</td>
                        <td>{agent.email}</td>
                        <td>
                          <button onClick={this.props.handleViewAgent} className="btn btn-primary">View Agent</button>
                        </td>
                      </tr>)
                  })
                }
                </tbody>
              </table>
              <Pagination meta={this.props.meta} onChange={this.pageChange}/>
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
