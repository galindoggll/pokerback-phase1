// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const {data, ...meta} = state.agents

  return {
    agents: data,
    meta: Object.assign({}, meta)
  }
}

export default connect(mapStateToProps)(Page)
