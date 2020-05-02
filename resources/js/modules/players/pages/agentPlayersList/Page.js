// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {playerListOfAgentRequest} from '../../service'

// import components
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

class Page extends Component {
  static displayName = 'PlayersPage'
  static propTypes = {
    meta: PropTypes.object,
    players: PropTypes.array,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(playerListOfAgentRequest(this.props.match.params))
  }

  render() {
    const {players} = this.props
    if (players) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="row">
                <div className="col"><h1>Players</h1></div>
              </div>
              <table className="table table-responsive table-striped">
                <thead className="thead-inverse">
                <tr>
                  <th>Player ID</th>
                  <th>Nickname</th>
                  <th>Winnings</th>
                  <th>Rake</th>
                  <th colSpan={1}></th>
                </tr>
                </thead>
                <tbody>
                {
                  players.players.map((player, i) => {
                    return (
                      <tr key={i}>
                        <td>{player.playingId}</td>
                        <td>{player.nickname}</td>
                        <td>{player.winnings}</td>
                        <td>{player.rake}</td>
                        <td>
                          <Link to={`/players/view-report/${player.id}/1`}
                                replace={true}
                                className="btn btn-primary">
                            View Report
                          </Link>
                        </td>
                      </tr>)
                  })
                }
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
        </div>
      )
    }

  }
}

export default Page
