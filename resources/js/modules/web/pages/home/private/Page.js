import React, {Component} from "react"
import PropTypes from "prop-types"

// import components
import Header from "../private/components/Header"
import Loader from 'react-loader-spinner'

// import services

class Page extends Component {
  static displayName = "HomePage"
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} isAuthenticated={this.props.isAuthenticated}/>
      </div>)
  }
}

export default Page
