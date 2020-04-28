// import libs
import { connect } from "react-redux"

// import components
import Page from "./Page"
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user
  }
}

export default connect(mapStateToProps)(Page)
