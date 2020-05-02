// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {playerDetailRequest} from '../../service'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Loader from "react-loader-spinner";

// import components
import TotalOwed from './components/TotalOwed'
import TotalRaked from './components/TotalRaked'

class Page extends Component {
  static displayName = 'PlayerDetailsPage'
  static propTypes = {
    match: PropTypes.object,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      details: {}
    }
  }

  UNSAFE_componentWillMount() {
    const {dispatch, match} = this.props
    dispatch(playerDetailRequest(match.params))
  }

  render() {
    const { playerDetail } = this.props.players
    if (!playerDetail) {
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
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <h3>Player Report</h3>
              <table className="table table-responsive table-striped">
                <thead className="thead-inverse">
                <tr>
                  <th>Player ID</th>
                  <th>Nickname</th>
                  <th>Memoname</th>
                  <th>Winnings</th>
                  <th>Rake</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{playerDetail.playingId}</td>
                  <td>{playerDetail.nickname}</td>
                  <td>{playerDetail.memoname}</td>
                  <td>{playerDetail.winnings}</td>
                  <td>{playerDetail.rake}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-auto">
              <table className="table table-responsive table-striped">
                <tbody>
                <tr>
                  <td>Total Winnings and Rake</td>
                  <td>{playerDetail.winnings}</td>
                  <td>{playerDetail.rake}</td>
                </tr>
                <tr>
                  <td>Percentage</td>
                  <td>100%</td>
                  <td>{playerDetail.rakebackPercentage}%</td>
                </tr>
                <tr>
                  <td>Total Winnings and Rakeback</td>
                  <td>{playerDetail.winnings}</td>
                  <td>{parseInt(playerDetail.rake) * parseInt(playerDetail.rakebackPercentage) / 100}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }

  }
}

export default Page
