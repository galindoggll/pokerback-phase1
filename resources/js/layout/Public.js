//import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import Navigation from '../common/navigation/index'
import ScrollTop from '../common/scroll-top/index'
import Footer from '../common/footer/index'

const containerStyle = {
  paddingTop: '3.5rem',
}

const displayName = 'Public Layout'
const propTypes = {
  children: PropTypes.node.isRequired,
}

function PublicLayout({ children }) {
  return <div>
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">Bluebird Gaming Inc.</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a className="p-2 text-dark" href="#">Contact</a>
        <a className="p-2 text-dark" href="#">About Us</a>
        <a className="p-2 text-dark" href="/register">Sign Up</a>
      </nav>
      <a className="btn btn-outline-primary" href="/login">Log In</a>
    </div>
    <main>
      { children }
      {/*?<ScrollTop />*/}
    </main>
    <Footer/>
  </div>
}

PublicLayout.dispatch = displayName
PublicLayout.propTypes = propTypes

export default PublicLayout
