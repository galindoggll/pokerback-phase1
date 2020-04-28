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
    <Navigation/>
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
