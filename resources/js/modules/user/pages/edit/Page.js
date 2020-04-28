// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { userUpdateRequest } from '../../service'
import ReeValidate from 'ree-validate'

// import components
import Form from './components/Form'


class Page extends Component {
  static displayName = 'UserPage'
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
      'username': 'required|min:3',
      'email': 'required|email',
      'phone': 'min:8|numeric',
    })

    this.state = {
      user: this.props.user,
      editedUser: {},
      errors: this.validator.errors
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    const user = nextProps.user
    
    if (!_.isEqual(this.state.user, user)) {
      this.setState({ user })
    }
    
  }
  
  handleChange(name, value) {
    const { errors } = this.validator
    
    this.setState({ user: { ...this.props.user, [name]: value} })
    
    errors.remove(name)
    
    this.validator.validate(name, value)
      .then(() => {
          this.setState({ errors })
      })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    const user = this.state.user
    const { errors } = this.validator
    
    this.validator.validateAll(user)
      .then((success) => {
        if (success) {
          this.submit(user)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit(user) {
    this.props.dispatch(userUpdateRequest(user))
      .catch(({ error, statusCode }) => {
        const { errors } = this.validator
        
        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        }
        
        this.setState({ errors })
      })
  }
  
  render() {
    console.log(this.state)
    const {user, errors} = this.state
    return (
      <div className="container">
        <form onSubmit={e => this.handleSubmit(e)}>
        <div className="col-md-12 order-md-1">
          <h4 className="mb-3">Edit Profile</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Username</label>
              <input type="text"
                     id="username"
                     name="username"
                     className={`form-control ${errors.has('username') && 'is-invalid'} `}
                     value={user.username || ''}
                     onChange={e => this.handleChange(e.target.name, e.target.value)} />
              {errors.has('username') && <div className="invalid-feedback">{errors.first('username')}</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input type="email"
                     id="email"
                     name="email"
                     className={`form-control ${errors.has('email') && 'is-invalid'} `}
                     value={user.email || ''}
                     onChange={e => this.handleChange(e.target.name, e.target.value)} />
              {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Phone</label>
              <input type="text"
                     id="phone"
                     name="phone"
                     className={`form-control ${errors.has('phone') && 'is-invalid'} `}
                     value={user.phone || ''}
                     onChange={e => this.handleChange(e.target.name, e.target.value)} />
              {errors.has('phone') && <div className="invalid-feedback">{errors.first('phone')}</div>}
            </div>
            <div className="col-md-3 mb-3 align-self-end">
              <button className="btn btn-md btn-primary btn-block" type="submit">
                Save
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>)
  }
}

export default Page
