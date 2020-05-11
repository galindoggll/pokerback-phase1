//import libs
import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

// import components
import Navigation from '../common/navigation/index'
import ScrollTop from '../common/scroll-top/index'
import Footer from '../common/footer/index'

const containerStyle = {
  zIndex: '5',
}

const displayName = 'Private Layout'
const propTypes = {
  children: PropTypes.node.isRequired,
  logout: PropTypes.func.isRequired,
}

function PrivateLayout({ children, props, logout }) {
  return <div>
    /*Implement on top loading*/
    {/*<div style={containerStyle}>*/}
      {/*<Loader*/}
        {/*type="Puff"*/}
        {/*color="#00BFFF"*/}
        {/*height={500}*/}
        {/*width={500}*/}
        {/*timeout={1000} //3 secs*/}

      {/*/>*/}
    {/*</div>*/}

    <div
      className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">Bluebird Gaming Inc.</h5>
      {
        props.user.type == 0 &&
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="/">Home</a>
          <a className="p-2 text-dark" href="/agents">Agents</a>
          <a className="p-2 text-dark" href="/players">Players</a>
          <a className="p-2 text-dark" href={`profile/${props.user.id}`}>Profile</a>
        </nav>
      }
      {
        props.user.type == 1 &&
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="/">Home</a>
          <a className="p-2 text-dark" href={`/players/agent-list/${props.user.id}`}>Players</a>
          <a className="p-2 text-dark" href={`profile/${props.user.id}`}>Profile</a>
        </nav>
      }
      {
        props.user.type == 2 &&
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="/">Home</a>
          <a className="p-2 text-dark" href={`/players/view-report/${props.user.id}/${props.user.type}`}>Report</a>
          <a className="p-2 text-dark" href={`profile/${props.user.id}`}>Profile</a>
        </nav>
      }
      <a className="btn btn-outline-danger" onClick={e => logout(e)}>Log Out</a>
    </div>
    <main>
      { children }
      {/*<ScrollTop />*/}
    </main>
    <Footer/>
  </div>
}

PrivateLayout.dispatch = displayName
PrivateLayout.propTypes = propTypes

export default PrivateLayout
