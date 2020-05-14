import React, {Suspense} from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return <Route {...rest} render={props => {
        return <Suspense fallback={
          <div className="container">
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
          </div>
        }>
            {
                isAuthenticated
                    ? <Component {...props}/>
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}/>
            }
        </Suspense>
    }}/>
}

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
