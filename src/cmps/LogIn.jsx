import { TextField } from "@material-ui/core";
import { Component } from "react";

// w-570 h640

export class LogIn extends Component {

  state = {

  }


  onSubmit = () => {
    return
  }

  render() {
    return (
      <form className="login-form flex column align-center" onSubmit={this.onSubmit}>
          <p className="login-header fs16 fh20 bold">Log in or sign up</p>
          <div className="seperation-line-login "></div>
          <div className="login-main-container">
        <h2 className="login-welcome fw-unset fs22 fh26 medium">Welcome to Homeaway</h2>
        <div className="login-input-continer flex column gap10">
        <TextField
          id="outlined-basic"
          label="Enter username"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Enter password"
          variant="outlined"
        />
        </div>
        </div>
      </form>
    )
  }




}