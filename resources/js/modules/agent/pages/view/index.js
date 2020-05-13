import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const { params } = router.match
  return {
    agent: state.agents.agent,
    userAgent: state.agents.userAgent,
    playerList: state.agents.playerList,
    unassignedList: state.agents.unassignedList
  }
}

export default connect(mapStateToProps)(Page)
