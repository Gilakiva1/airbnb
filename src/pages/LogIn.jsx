import { TextField } from "@material-ui/core";
import { Component } from "react";



export class LogIn extends Component {

state = {

}

 handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

   handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

   handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

onSubmit = () => {
    return
}

render() {
    return (
        <form className="login-form" onSubmit={this.onSubmit}>
<TextField
 id="outlined-basic" 
 label="Username" 
 variant="outlined"
 placeholder="Enter username here" />
  <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </form>
    )
}




}