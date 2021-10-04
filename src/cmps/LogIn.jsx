import { TextField } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userService } from "../services/user.service"
import { onAddUser } from "../store/user.action"

export class _LogIn extends React.Component {

  state = {
    credentials: {
      username: '',
      password: ''
    }

  }
  inputRef = React.createRef(null)

  componentDidMount() {
    window.addEventListener('click', this.props.toggleLogIn)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.props.toggleLogIn)

  }

  handleChange = (ev) => {
    const { credentials } = this.state
    const field = ev.target.name
    const value = ev.target.value
    this.setState({ credentials: { ...credentials, [field]: value } })
  }


  onSetColor = (ev) => {
    let x = ev.clientX
    let y = ev.clientY
    this.inputRef.current.style.setProperty('--mouse-x', x)
    this.inputRef.current.style.setProperty('--mouse-y', y)
  }


  onSubmit = async (ev) => {
    debugger
    ev.preventDefault()
    const { credentials } = this.state
    let user = await userService.login(credentials)
    if (user === 'signup') {
      user = await userService.signup(credentials)
      onAddUser(user)
      this.props.toggleLogIn()
    }

    return
  }

  render() {
    const { animateClassName } = this.props
    return (
      <section>
        <div className="screen">

          <form className={`login-form flex column align-center ${animateClassName}`} onClick={(ev) => ev.stopPropagation()} onSubmit={this.onSubmit}>
            <p className="login-header fs16 fh20 bold">Log in or sign up</p>
            <div className="seperation-line-login "></div>
            <div className="login-main-container">
              <h2 className="login-welcome fw-unset fs22 fh26 medium">Welcome to Homeaway</h2>
              <div className="login-input-continer flex column gap10">
                <TextField
                  id="outlined-basic"
                  label="Enter username"
                  variant="outlined"
                  name='username'
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic-2"
                  label="Enter password"
                  variant="outlined"
                  name='password'
                  type='password'
                  onChange={this.handleChange}
                />
                {/* <TextField
                id="outlined-basic-2"
                label="Enter fullname"
                variant="outlined"
                name='fullname'
                type='password'
                onChange={this.handleChange}
                />
              <p>New to Homeaway? <span>Sign up!</span></p> */}
              </div>
              <button ref={this.inputRef} onMouseMove={this.onSetColor} className="continue-btn fs16 fh20 medium ">Continue</button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return state
}
const mapDispatchToProps = {
  onAddUser,


}


export const LogIn = connect(mapStateToProps, mapDispatchToProps)(withRouter(_LogIn))

