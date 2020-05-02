// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {playerListRequest, importData} from '../../service'

// import components
import {Link} from 'react-router-dom'
import Pagination from './../../../article/pages/list/components/Pagination'
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
      data:{},
      loading: this.props.isExtracted,
    }
    this.pageChange = this.pageChange.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.createFile = this.createFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.isExtracted !== prevProps.isExtracted) {
      this.setState({loading: false})
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(playerListRequest({}))
  }

  pageChange(pageNumber) {
    this.props.dispatch(playerListRequest({pageNumber}))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({loading: true})
    let form = new FormData()
    form.append('file', this.state.file)
    this.props.dispatch(importData(form))
  }

  handleOnChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    this.setState({fileName: e.target.files[0].name})
    if (!files.length)
      return;
    this.createFile(files[0]);
  }

  createFile(file) {
    this.setState({
      file: file,
    })
  }

  render() {
    const {players} = this.props
    if (this.state.loading) {
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
              {
                players.map((player, i) => {
                  return (
                    <tr key={i}>
                      <td>{player.player[0].playingId}</td>
                      <td>{player.username}</td>
                      <td>{player.player[0].winnings}</td>
                      <td>{player.player[0].rake}</td>
                      <td>
                        <Link to={`players/view-report/${player.player[0].id}/0`} className="btn btn-primary">View Report</Link>
                      </td>
                      <td>
                        <Link to={`players/set-percentage/${player.player[0].id}`} className="btn btn-info">Set Percentage</Link>
                      </td>
                    </tr>)
                })
              }
              </tbody>
            </table>
            <Pagination meta={this.props.meta} onChange={this.pageChange}/>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col"><h3>Import Data</h3></div>
        </div>
        <div className="row">
          <div className="input-group col-md-6">
            <div className="custom-file">
              <input type="file" className="custom-file-input" onChange={e => this.handleOnChange(e)}/>
                <label className="custom-file-label">{this.state.fileName}</label>
            </div>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" onClick={this.handleSubmit}>Import Data</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Page
