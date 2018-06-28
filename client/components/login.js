import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { forgotPass: false }
    this.forgotPass = this.forgotPass.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  forgotPass() {
    this.setState({ forgotPass: true })
  }

  cancel() {
    this.setState({ forgotPass: false })
  }

  render() {
    // const { name, displayName, handleSubmit, error } = props
    console.log(this.state.forgotPass)
    return (
      <main>
        <h2>{this.props.displayName}</h2>
        {!this.state.forgotPass ? (
          <form onSubmit={this.props.handleSubmit} name={this.props.name}>
            <div>
              <label htmlFor="username">
                <small>Email/Username</small>
              </label>
              <input name="username" type="text" required="required" />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" required="required" />
            </div>
            <div>
              <label id='forgotPass' onClick={this.forgotPass}>Forgot password?</label>
              <button type="submit">{this.props.displayName}</button>
            </div>
            {this.props.error && this.props.error.response && <div> {this.props.error.response.data} </div>}
          </form>
        ) : (

            <form onSubmit={this.handleForgot} name={this.props.name}>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="email" required="required" />
              </div>
              <div>
                <label id='cancel' onClick={this.cancel}>Cancel</label>
                <button type="submit">submit</button>
              </div>
              {/* {this.props.error && this.props.error.response && <div> {this.props.error.response.data} </div>} */}
            </form>
          )}

      </main>
    )
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.username.value
      const username = email
      const password = evt.target.password.value
      dispatch(auth(email, username, password, formName))
    },
    handleForgot(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(Signin)

/**
 * PROP TYPES
 */
Signin.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
