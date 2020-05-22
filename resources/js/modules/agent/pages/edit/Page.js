// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom';
import {browserHistory} from 'react-router'
import Loader from 'react-loader-spinner'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import {userAgentUpdateRequest, agentDetails} from '../../service'


class Page extends Component {
  static displayName = 'EditAgentsPage'
  static propTypes = {
    match: PropTypes.object,
    userAgent: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.validator = new ReeValidate({
      'name': 'required|min:3',
      'username': 'required|min:3',
      'email': 'required|email',
      'phone': 'required|min:8|numeric',
    })

    this.state = {
      userAgent: this.props.userAgent,
      editedUserAgent: {},
      errors: this.validator.errors
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const userAgent = nextProps.userAgent

    if (!_.isEqual(this.state.userAgent, userAgent)) {
      this.setState({userAgent})
    }

  }

  handleChange(name, value) {
    const {errors} = this.validator

    this.setState({userAgent: {...this.state.userAgent, [name]: value}})

    errors.remove(name)

    this.validator.validate(name, value)
      .then(() => {
        this.setState({errors})
      })
  }

  handleSubmit(e) {
    e.preventDefault()
    let userAgent = this.state.userAgent
    const {errors} = this.validator

    this.validator.validateAll(userAgent)
      .then((success) => {
        if (success) {
          this.submit(userAgent)
        } else {
          this.setState({errors})
        }
      })
  }

  submit(userAgent) {
    this.props.dispatch(userAgentUpdateRequest(userAgent))
      .catch(({error, statusCode}) => {
        const {errors} = this.validator

        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        }

        this.setState({errors})
      })
    this.props.history.push('/agent/' + this.state.userAgent.id);
  }

  handleBack() {
    this.props.history.push('/agent/' + this.state.userAgent.id);
  }

  render() {
    const {userAgent} = this.props
    if (_.isEmpty(userAgent)) {
      return <div className="container">
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
    } else {
      const {userAgent, errors} = this.state
      return (
        <div className="container">
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="row">
              <div className="col-md-6">
                <h4 className="mb-3">Edit Agent Profile</h4>
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label>Name</label>
                    <input type="text"
                           id="name"
                           name="name"
                           className={`form-control ${errors.has('name') && 'is-invalid'} `}
                           value={userAgent.name}
                           onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                    {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label>Username</label>
                    <input type="text"
                           id="username"
                           name="username"
                           className={`form-control ${errors.has('username') && 'is-invalid'} `}
                           value={userAgent.username}
                           onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                    {errors.has('username') && <div className="invalid-feedback">{errors.first('username')}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label>Email</label>
                    <input type="email"
                           id="email"
                           name="email"
                           className={`form-control ${errors.has('email') && 'is-invalid'} `}
                           value={userAgent.email}
                           onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                    {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label>Phone</label>
                    <input type="text"
                           id="phone"
                           name="phone"
                           className={`form-control ${errors.has('phone') && 'is-invalid'} `}
                           value={userAgent.phone}
                           onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                    {errors.has('phone') && <div className="invalid-feedback">{errors.first('phone')}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3 align-self-end">
                    <button className="btn btn-md btn-warning btn-block" type="button" onClick={() => this.handleBack()}>
                      Back
                    </button>
                  </div>
                  <div className="col-md-3 mb-3 align-self-end">
                    <button className="btn btn-md btn-primary btn-block" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )
    }
  }
}

export default Page
