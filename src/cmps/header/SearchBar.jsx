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
import { DatePicker } from './DatePicker.jsx'



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
    isPickingGuests: false,
    isPickingDates: false
  }

  componentDidMount() {
    window.addEventListener('click', this.closeInputs)

  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeInputs)
  }


  handleChange = (ev) => {
    const { criteria } = this.state
    const field = ev.target.name
    const value = ev.target.value
    console.log('field', field, 'value', value);
    this.setState({ criteria: { ...criteria, [field]: value } })
  }

  handleGuestsChanege = (field, value) => {
    let { criteria } = this.state
    let { guests } = criteria
    this.setState({ criteria: { ...criteria, guests: { ...guests, [field]: value } } })
  }

  handlePickingDates = (start, end) => {
    console.log('start',start,'end',end);
    let {criteria} = this.state
    let { checkIn, checkOut } = criteria
    checkIn = `${start.getDay()} ${start.toLocaleString('en-us', { month: 'short' })} `
    if (end) checkOut = `${end.getDay()} ${end.toLocaleString('en-us', { month: 'short' })}`
    console.log('check in:', checkIn,'checkout',checkOut);
    this.setState({criteria:{...criteria, checkIn,checkOut}})
  }

  handleKeyPress = () => {
    return false
  }


  onSubmit = async (ev) => {
    const { criteria } = this.state
    ev.preventDefault()
    await this.props.onSetFilter(criteria)
    const query = `location=${criteria.location}&guests=${criteria.guests.adult + criteria.guests.child + criteria.guests.infant}`
    this.props.history.push(`/stay?${query}`)
  }

  activeInput = (input) => {
    this.closeInputs()
    switch (input) {
      case 'guest':
        this.setState({ isPickingGuests: true })
        break;
      case 'check in':
        this.setState({ isPickingDates: true })
        break;
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
    let { isPickingGuests, isPickingDates } = this.state
    isPickingGuests = false
    isPickingDates = false
    this.setState({ isPickingGuests, isPickingDates })
  }

  render() {
    const { isPickingGuests, isPickingDates: isPickingCheckIn,criteria } = this.state
    const {checkIn,checkOut} = criteria
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
              type="text"
              placeholder="Add dates"
              name="checkIn"
              value={checkIn}
              style={{ border: 'none' }}
              onChange={this.handleChange}
              // onClick={this.closeInputs}
              onClick={() => this.activeInput('check in')}
            />
          </div>
          <div className="input-container flex column">
            <span>Check out:</span>
            <input
              type="text"
              placeholder="Add dates"
              name="checkOut"
              value={checkOut}
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
        <div className={isPickingGuests ? "picking-guest-container" : "picking-guest-container none"}> {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />} </div>
        <div  className={isPickingCheckIn ? "picking-dates-container" : "checkin-container none"}> {isPickingCheckIn && <DatePicker preventPropagation={this.preventPropagation}  handlePickingDates={this.handlePickingDates} />} </div>

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


