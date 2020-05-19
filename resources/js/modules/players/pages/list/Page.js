// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {playerListRequest, importData, exportPlayer} from '../../service'
import _ from 'lodash'

// import components
import {Link} from 'react-router-dom'
import Pagination from './../../../../utils/Pagination'
import Loader from 'react-loader-spinner'

class Page extends Component {
  static displayName = 'PlayersPage'
  static propTypes = {
    meta: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      modalId: null,
      fileName: 'Choose File',
      file: '',
      data: {},
      isImported: false,
      isFileReady: false,
      isExtracted: false,
      loading: this.props.isExtracted,
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.createFile = this.createFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.players !== prevProps.players) {
      this.setState({loading: false})
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(playerListRequest({}))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({loading: true})
    let form = new FormData()
    form.append('file', this.state.file)
    this.setState({isExtracted: true})
    this.props.dispatch(importData(form))
  }

  handleOnChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    this.setState({fileName: e.target.files[0].name, isFileReady: true})
    if (!files.length)
      return;
    this.createFile(files[0]);
  }

  createFile(file) {
    this.setState({
      file: file,
    })
  }

  pageChange(pageNumber) {
    this.props.dispatch(playerListRequest({ pageNumber }))
  }

  handleDownload() {
    this.props.dispatch(exportPlayer())
  }

  renderPlayers() {
    if (this.props.players.length > 0) {
      return (
        this.props.players.map((player, i) => {
          return (
            <tr>
              <td>{player.player[0].playingId}</td>
              <td>{player.username}</td>
              <td>{player.player[0].winnings || 0}</td>
              <td>{player.player[0].rake || 0}</td>
              <td>
                <Link to={`/players/view-report/${player.player[0].id}/0`} className="btn btn-primary">
                  View Report
                </Link>
              </td>
              <td>
                <Link to={`/players/set-percentage/${player.player[0].id}`} className="btn btn-info">
                  Set Percentage
                </Link>
              </td>
            </tr>)
        })
      )
    } else {
      return (
        <tr>
          <td colSpan={6}>No Players</td>
        </tr>)
    }
  }

  render() {
    if (_.isEmpty(this.props.players) || this.state.loading) {
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
        </div>)
    } else {
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
                  <th colSpan={2}></th>
                </tr>
                </thead>
                <tbody>
                {this.renderPlayers()}
                </tbody>
              </table>
              <Pagination meta={this.props.meta} onChange={this.pageChange}/>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col"><h3>Import Data</h3></div>
          </div>
          <div className="row mb-3">
            <div className="input-group col-md-6">
              <div className="input-group-append">
                <button className="btn btn-outline-secondary"
                        onClick={this.handleDownload}>
                  Download Players
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-group col-md-6">
              <div className="custom-file">
                <input type="file" className="custom-file-input" onChange={e => this.handleOnChange(e)}/>
                <label className="custom-file-label">{this.state.fileName}</label>
              </div>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" disabled={!this.state.isFileReady}
                        onClick={this.handleSubmit}>
                  Import Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Page
