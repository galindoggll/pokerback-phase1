// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {playerDetailRequest, updatePlayer} from '../../service'
import { Redirect } from 'react-router-dom'

import Loader from "react-loader-spinner";

// import components

class Page extends Component {
  static displayName = 'PlayerDetailsPage'
  static propTypes = {
    match: PropTypes.object,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      player: '',
      redirect: false
    }

    this.savePercentage = this.savePercentage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dropdownOptions = this.dropdownOptions.bind(this);
  }

  componentWillMount() {
    //dispatch getPlayer
    this.props.dispatch(playerDetailRequest(this.props.match.params));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  savePercentage() {
    event.preventDefault();
    const params = this.state;
    params.player = this.props.players.playerDetail.id
    this.props.dispatch(updatePlayer(params))
    this.setState({redirect: true})
    return <Redirect to='/target' />
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/players' />
    }
  }

  dropdownOptions() {
    let options = [];
    for (let i=0;i<=100;i++) {
      options.push(i);
    }
    return options;
  }

  render() {

    const percentageOptions = this.dropdownOptions();
    const {playerDetail} = this.props.players
    if (playerDetail) {
      return (
        <div className="container">
          <div className="col-md-12">
            <h4 className="mb-3">{playerDetail.memoname} | Set Percentage</h4>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label>Rakeback Percentage</label>
                <select className="form-control"
                        name="rakebackPercentage"
                        onChange={e => this.handleChange(e)}
                        defaultValue={playerDetail.rakebackPercentage || '0'}>
                  {
                    percentageOptions.map( function(option, i) {
                      return <option key={i} value={option}>{option}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label>Super Agent Percentage</label>
                <select className="form-control"
                        name="superAgentPercentage"
                        onChange={e => this.handleChange(e)}
                        defaultValue={playerDetail.superAgentPercentage || '0'}>
                  {
                    percentageOptions.map( function(option, i) {
                      return <option key={i} value={option}>{option}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label>Agent Percentage</label>
                <select className="form-control"
                        name="agentPercentage"
                        onChange={e => this.handleChange(e)}
                        defaultValue={playerDetail.agentPercentage || '0'}>
                  {
                    percentageOptions.map( function(option, i) {
                      return <option key={i} value={option}>{option}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label>Player Percentage</label>
                <select className="form-control"
                        name="playerPercentage"
                        onChange={e => this.handleChange(e)}
                        defaultValue={playerDetail.playerPercentage || '0'}>
                  {
                    percentageOptions.map( function(option) {
                      return <option value={option}>{option}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                {this.renderRedirect()}
                <button className="btn btn-info" onClick={this.savePercentage}>Save</button>
              </div>
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
