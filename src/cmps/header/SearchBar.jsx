// import * as React from 'react';
// import TextField from '@mui/material/TextField';
import React from 'react'
// import reactDom from 'react-dom'
// import 'react-dates/initialize';
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';
import { GuestsPicking } from './GuestsPicking.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { onSetFilter } from '../../store/stay.action.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

export class _SearchBar extends React.Component {

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
    isPickingGuests: false
  }

  componentDidMount() {
    window.addEventListener('click', () => {
      let { isPickingGuests } = this.state
      isPickingGuests = false
      this.setState({ isPickingGuests })
    });

  }
  componentWillUnmount() {
    window.removeEventListener('click', () => {
      let { isPickingGuests } = this.state
      isPickingGuests = false
      this.setState({ isPickingGuests })
    });

  }


  handleChange = (ev) => {
    const { criteria } = this.state
    const field = ev.target.name
    const value = ev.target.value
    console.log('field',field,'value',value);
    this.setState({ criteria: { ...criteria, [field]: value } })
  }

  handleGuestsChanege = (field, value) => {
    let { criteria } = this.state
    let { guests } = criteria
    this.setState({ criteria: { ...criteria, guests: { ...guests, [field]: value } } })
    return
  }

  handleKeyPress = () => {
    return false
  }


   onSubmit = async (ev) => {
     const {criteria} = this.state
    ev.preventDefault()
   await this.props.onSetFilter(criteria)
    const query = `location=${criteria.location}&guests=${criteria.guests.adult+criteria.guests.child+criteria.guests.infant}`
    this.props.history.push(`/stay?${query}`)
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

  preventPropagation = event => {
    event.stopPropagation()
  }

  closeInputs = () => {
    let { isPickingGuests } = this.state
      isPickingGuests = false
      this.setState({ isPickingGuests })
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
      <section className="flex column">
      <form className="search-bar-container flex" onClick={this.preventPropagation} onSubmit={this.onSubmit}>
        <div className="input-container flex column">
          <span>Location:</span>
          <input
            type="search"
            placeholder="Where are you going?"
            name="location"
            style={{ border: 'none' }}
            onChange={this.handleChange}
            onClick={this.closeInputs}
          />
        </div>
        <div className="input-container flex column">
          <span>Check in:</span>
          <input
            type="date"
            placeholder="Add dates"
            name="checkIn"
            style={{ border: 'none' }}
            onChange={this.handleChange}
            onClick={this.closeInputs}
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
            onClick={this.closeInputs}
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
        </div>
        <button className="search-bar-submit flex">{<FontAwesomeIcon className='search-icon' icon={faSearch} />}</button>
      </form>
         <div className="picking-guest-container"> {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />} </div>
          </section>
    )
  }
}

function mapStateToProps(state) {
  return state
}
const mapDispatchToProps = {
  onSetFilter


}


export const SearchBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SearchBar))


/* <DateRangePicker
      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired, */