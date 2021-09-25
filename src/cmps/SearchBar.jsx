// import * as React from 'react';
// import TextField from '@mui/material/TextField';
import React from 'react'
// import reactDom from 'react-dom'
// import 'react-dates/initialize';
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';
import { GuestsPicking } from './GuestsPicking.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { rgbToHex } from '@material-ui/core'

export class SearchBar extends React.Component {

  state = {
    criteria: {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: {
        adult: 0,
        child: 0,
        infant: 0
      },
    },
    // startDate: '',
    // endDate: '',
    // isPickingDate: false
    isPickingGuests: false
  }

  componentDidMount() {
    // window.addEventListener('click', (event) => {
    //   this.state.isPickingGuests = false
    // });

  }
  componentWillUnmount() {
    // window.removeEventListener('click');

  }


  handleChange = (ev) => {
    const { criteria } = this.state
    const field = ev.target.name
    const value = ev.target.value
    this.setState({ criteria: { ...criteria, [field]: value } })
  }

  handleGuestsChanege = (field, value) => {
let {criteria} = this.state
let {guests} = criteria
    this.setState({criteria:{ ...criteria, guests: { ...guests, [field]: value }} })
    return
  }

  handleKeyPress = () => {
    return false
  }


  onSubmit = (ev) => {
    ev.preventDefault()
  }

  activeInput = (input) => {
    switch (input) {
      case 'guest':
        this.setState({ isPickingGuests: true })
    }
  }

  getTotalGuests = () => {
    let { adult, child, infant } = this.state.criteria.guests
    return adult + child + infant
  }


  // datePickerOn =() => {
  //   let {isPickingDate} = this.state
  //   isPickingDate = true
  //   this.setState({ isPickingDate}) 
  // }
  // datePickerOff =() => {
  //   return
  //   // let {isPickingDate} = this.state
  //   // isPickingDate = false
  //   // this.setState({isPickingDate}) 
  // }

  render() {
    const { isPickingGuests } = this.state
    return (
      <form className="search-bar-container flex" onSubmit={this.onSubmit}>
        <div className="input-container flex column">
          <span>Location:</span>
          <input
            type="search"
            placeholder="Where are you going?"
            name="location"
            style={{ border: 'none' }}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-container flex column">
          <span>Check in:</span>
          <input
            type="date"
            placeholder="Add dates"
            name="checkIn"
            style={{ border: 'none' }}
          // onFocus={this.datePickerOn}
          // onBlur={this.datePickerOff}
          />
          {/* {isPickingDate && <ReduxForm/>} */}
        </div>
        <div className="input-container flex column">
          <span>Check out:</span>
          <input
            type="date"
            placeholder="Add dates"
            name="checkOut"
            style={{ border: 'none' }}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-container flex column">
          <span>Guests:</span>
          <input
            type="search"
            placeholder="Add guests"
            name="guests"
            placeholder={'guests:' + this.getTotalGuests()}
            style={{ border: 'none' }}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
            onClick={() => this.activeInput('guest')}
          />
          {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />}
        </div>
        <button className="search-bar-submit flex">{<FontAwesomeIcon className='search-icon' icon={faSearch} />}</button>
      </form>
    )
  }
}

{/* <DateRangePicker
      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired, */}