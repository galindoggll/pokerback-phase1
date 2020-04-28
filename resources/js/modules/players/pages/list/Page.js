// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {playerListRequest} from '../../service'

// import components
import {Link} from 'react-router-dom'
import Pagination from './../../../article/pages/list/components/Pagination'

class Page extends Component {
  static displayName = 'PlayersPage'
  static propTypes = {
    meta: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.pageChange = this.pageChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const {dispatch} = this.props

    dispatch(playerListRequest({}))
  }

  pageChange(pageNumber) {
    this.props.dispatch(playerListRequest({pageNumber}))
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="row">
              <div className="col"><h1>Players</h1></div>
              <div className="col"> <button className="btn btn-info">Import Data</button></div>
            </div>
            <table className="table table-responsive table-striped">
              <thead className="thead-inverse">
              <tr>
                <th>#</th>
                <th>Player ID</th>
                <th>Nickname</th>
                <th>Region</th>
                <th>Winnings</th>
                <th>Rake</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {
                this.props.players.map(function (player, i) {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{player.playerId}</td>
                      <td>{player.nickname}</td>
                      <td>{player.region}</td>
                      <td>{player.winnings}</td>
                      <td>{player.rake}</td>
                      <td>
                        <Link to={`players/view-report/${player.id}`} className="btn btn-primary">View Report</Link>
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
  }
}

export default Page
