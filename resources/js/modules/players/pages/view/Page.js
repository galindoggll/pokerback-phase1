// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {playerDetailRequest} from '../../service'

import Loader from "react-loader-spinner";

// import components
import TotalOwed from './components/TotalOwed'
import TotalRaked from './components/TotalRaked'

class Page extends Component {
  static displayName = 'PlayerDetailsPage'
  static propTypes = {
    params: PropTypes.object,
    playerDetail: PropTypes.object,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      details: {}
    }
  }

  UNSAFE_componentWillMount() {
    const {dispatch, params} = this.props
    dispatch(playerDetailRequest(params))
  }

  render() {
    if (_.isEmpty(this.props.playerDetail)) {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}

              />
            </div>
          </div>
        </div>
      )
    } else {
      const rakeback = parseInt(this.props.playerDetail.rake) * parseInt(this.props.playerDetail.rakebackPercentage) / 100;
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
                  <td>{this.props.playerDetail.playingId}</td>
                  <td>{this.props.playerDetail.nickname}</td>
                  <td>{this.props.playerDetail.memoname}</td>
                  <td>{parseInt(this.props.playerDetail.winnings) || 0}</td>
                  <td>{parseInt(this.props.playerDetail.rake) || 0}</td>
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
                  <td>{parseInt(this.props.playerDetail.winnings) || 0}</td>
                  <td>{parseInt(this.props.playerDetail.rake) || 0}</td>
                </tr>
                <tr>
                  <td>Percentage</td>
                  <td>100%</td>
                  <td>{parseInt(this.props.playerDetail.rakebackPercentage) || 0}%</td>
                </tr>
                <tr>
                  <td>Total Winnings and Rakeback</td>
                  <td>{parseInt(this.props.playerDetail.winnings) || 0}</td>
                  <td>{rakeback}</td>
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
