// import libs
import { connect } from 'react-redux'
import User from '../../User'

// import components
import Page from './Page'

// map store state as properties of the component
const mapStateToProps = (state, router) => {
  const { params } = router.match
  return {
    ...state,
  }
}

// binding store with component
export default connect(mapStateToProps)(Page)
