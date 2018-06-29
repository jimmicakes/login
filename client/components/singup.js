import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth, checkEmail, checkName } from '../store'

/**
 * COMPONENT
 */
class Register extends React.Component {
    //const { name, displayName, handleSubmit, error } = props
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            confirmEmail: '',
            username: '',
            password: '',
            repeatPass: '',

        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const val = e.target.name
        if (val === 'email') this.setState({ email: e.target.value })
        if (val === 'confirmEmail') this.setState({ confirmEmail: e.target.value })
        if (val === 'username') this.setState({ username: e.target.value })
        if (val === 'password') this.setState({ password: e.target.value })
        if (val === 'repeatPass') this.setState({ repeatPass: e.target.value })
    }

    render() {
        return (
            <main>
                <h2>{this.props.displayName}</h2>
                <form onSubmit={this.props.handleSubmit} name={this.props.name}>
                    <div>
                        <label htmlFor="email">
                            <small>Email Address</small>
                        </label>
                        <input name="email" type="email" required="required" value={this.state.email} onChange={this.handleChange} />
                        {
                            this.state.email ? (
                                this.state.email.includes('@') && this.state.email.includes('.') ?
                                    <label className='pass'><small>checked</small></label>
                                    : <label className='error'><small>not valid</small></label>
                            ) : <label className='error'><small>required</small></label>
                        }
                    </div>
                    <div>
                        <label>
                            <small>Confirm Email</small>
                        </label>
                        <input name="confirmEmail" type="email" required="required" value={this.state.confirmEmail} onChange={this.handleChange} />
                        {
                            this.state.confirmEmail ? (
                                this.state.confirmEmail === this.state.email ? (
                                    <label className='pass'><small>matched</small></label>
                                ) : <label className='error'><small>unmatch</small></label>
                            ) : <label className='error'><small>required</small></label>

                        }
                    </div>
                    <div>
                        <label htmlFor="username">
                            <small>Username</small>
                        </label>
                        <input name="username" type="text" required="required" value={this.state.username} onChange={this.handleChange} />
                        {this.state.username ?
                            <label className='pass'><small>checked</small></label>
                            :
                            <label className='error'><small>required</small></label>
                        }
                    </div>
                    <div>
                        <label htmlFor="password">
                            <small>Password</small>
                        </label>
                        <input name="password" type="password" pattern=".{3,}" required="required" value={this.state.pass} onChange={this.handleChange} />
                        {this.state.password ? (
                            this.state.password.length > 2 ?
                                <label className='pass'><small>checked</small></label> :
                                <label className='error'><small>{"<"}3chars</small></label>
                        ) : <label className='error'><small>required</small></label>
                        }
                    </div>
                    <div>
                        <label>
                            <small>Repeat Password</small>
                        </label>
                        <input name="repeatPass" type="password" required="required" value={this.state.repeatPass} onChange={this.handleChange} />
                        {
                            this.state.repeatPass ? (
                                this.state.repeatPass === this.state.password ? (
                                    <label className='pass'><small>matched</small></label>
                                ) : <label className='error'><small>unmatch</small></label>
                            ) : <label className='error'><small>required</small></label>

                        }
                    </div>
                    <div>
                        <button type="submit">{this.props.displayName}</button>
                        <label>
                            <a href='/login'>Have an account?</a>
                        </label>
                    </div>
                    {this.props.error
                        && this.props.error.response
                        && <div className="error">
                            {this.props.error.response.data}
                        </div>}
                </form>
            </main >
        )
    }
}

const mapSignup = state => {
    return {
        name: 'signup',
        displayName: 'Sign Up',
        error: state.user.error,
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
        },
        lookUpEmail(email) {
            dispatch(checkEmail(email))
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
