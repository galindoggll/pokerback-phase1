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

  renderTotalOwed() {
    return <TotalOwed />
  }

  renderTotalRaked() {
    return <TotalRaked />
  }

  render() {
    const { playerDetail } = this.props.players
    if (playerDetail) {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
              <h3>Player Details</h3>
              <table className="table table-responsive table-striped">
                <thead className="thead-inverse">
                <tr>
                  <th>Player ID</th>
                  <th>Region</th>
                  <th>Nickname</th>
                  <th>Memoname</th>
                  <th>Winnings</th>
                  <th>Rake</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{playerDetail.playerId}</td>
                  <td>{playerDetail.region}</td>
                  <td>{playerDetail.nickname}</td>
                  <td>{playerDetail.memoname}</td>
                  <td>{playerDetail.winnings}</td>
                  <td>{playerDetail.rake}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row justify-content-center">
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
                  <td>30%</td>
                </tr>
                <tr>
                  <td>Total Winnings and Rakeback</td>
                  <td>{playerDetail.winnings}</td>
                  <td></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              { this.renderTotalOwed() }
            </div>
            <div className="col-auto">
              { this.renderTotalRaked() }
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Loader
          type="TailSpin"
          height={200}
          width={200}
          color="#fff"/>
      )
    }

  }
}

export default Page
