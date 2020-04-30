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
    if (this.props.user.id) {
      return (<div>
        <Header/>
      </div>)
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
        </div>)
    }

  }
}

export default Page
