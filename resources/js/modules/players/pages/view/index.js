import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const { params } = router.match
  return {
    ...state,
  }
}

export default connect(mapStateToProps)(Page)
