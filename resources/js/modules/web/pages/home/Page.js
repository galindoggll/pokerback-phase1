import React, {Component} from "react"
import PropTypes from "prop-types"

// import components
import Header from "./components/Header"
import Loader from 'react-loader-spinner'

// import services

class Page extends Component {
  static displayName = "HomePage"
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  componentDidMount() {
    // this.props.dispatch(articleListRequest({ url: '/articles/published' }))
  }

  render() {
    return (
      <div>
        <Header/>
      </div>)
  }
}

export default Page
