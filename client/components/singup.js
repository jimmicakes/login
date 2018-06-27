import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
const Register = props => {
    const { name, displayName, handleSubmit, error } = props

    return (
        <div>
            <form onSubmit={handleSubmit} name={name}>
                <div>
                    <label htmlFor="email">
                        <small>Email Address</small>
                    </label>
                    <input name="email" type="email" />
                </div>
                <div>
                    <label htmlFor="username">
                        <small>Username</small>
                    </label>
                    <input name="username" type="text" />
                </div>
                <div>
                    <label htmlFor="password">
                        <small>Password</small>
                    </label>
                    <input name="password" type="password" />
                </div>
                <div>
                    <button type="submit">{displayName}</button>
                </div>
                {error && error.response && <div> {error.response.data} </div>}
            </form>
        </div>
    )
}

const mapSignup = state => {
    return {
        name: 'signup',
        displayName: 'Sign Up',
        error: state.user.error
    }
}

const mapDispatch = dispatch => {
    return {
        handleSubmit(evt) {
            evt.preventDefault()
            const formName = evt.target.name
            const email = evt.target.email.value
            const username = evt.target.username.value
            const password = evt.target.password.value
            dispatch(auth(email, username, password, formName))
        }
    }
}

export const Signup = connect(mapSignup, mapDispatch)(Register)

/**
 * PROP TYPES
 */
Register.propTypes = {
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.object
}
