import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Loader from 'react-loader-spinner'

const PublicRoutes = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => {
    return <Suspense fallback={<div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={2000} //3 secs
          />
        </div>
      </div>
    </div>}>
      <Component {...props}/>
    </Suspense>
  }}/>
}

PublicRoutes.propTypes = {
  component: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default PublicRoutes
