import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const { params } = router.match
  return {
    params: params,
    playerDetail: state.players.playerDetail
  }
}

export default connect(mapStateToProps)(Page)
