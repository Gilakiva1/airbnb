// import * as React from 'react';
// import TextField from '@mui/material/TextField';
import { Component } from 'react'

export class SearchBar extends Component {


  state = {
    criteria: {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: {
        adults: '',
        children: '',
        babies: ''
      }
    }
  }

  handleChange = (ev) => {
    const {criteria} = this.state
    const value = ev.target.value
    this.setState({ criteria: { ...criteria, location: value } })
  }


  onSubmit = (ev) => {
    ev.preventdefault()
  }


  render() {
    return (
      <form className="search-bar-container flex" onSubmit={this.onSubmit}>
        <div className="input-container flex column">
         <span>Location:</span> 
          <input
            type="text"
            name="location"
            style={{border:'none'}}
            onChange={this.handleChange}
          />
        </div>
      </form>
    )
  }
}
























// export function SearchBar() {


//   return (
//     <div>
//       <TextField
//   variant="outlined"
//   label='Location'
//   notched={true}
//   InputLabelProps={{
//     shrink: true,
//   }}
// />
// <TextField 
// id="filled-basic" 
// label="Filled"
//  variant="filled"
//  style={{backgroundColor:'transparent'}} />
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//     </div>
//   )
// }