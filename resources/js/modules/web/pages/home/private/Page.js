import React, {Component} from "react"
import PropTypes from "prop-types"
import _ from 'lodash'

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
    if (_.isEmpty(this.props.user)) {
      return <div className="container">
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
    } else {
      return (
        <div>
          <Header user={this.props.user} isAuthenticated={this.props.isAuthenticated}/>
        </div>)
    }
  }
}

export default Page
