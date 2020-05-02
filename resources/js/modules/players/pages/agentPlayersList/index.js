// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const {...meta} = state.players
  return {
    players: state.players.agentPlayerList,
    meta: Object.assign({}, meta)
  }
}

export default connect(mapStateToProps)(Page)
