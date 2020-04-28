// import libs
import { connect } from 'react-redux'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const {data, ...meta} = state.players

  return {
    players: data,
    meta: Object.assign({}, meta)
  }
}

export default connect(mapStateToProps)(Page)
