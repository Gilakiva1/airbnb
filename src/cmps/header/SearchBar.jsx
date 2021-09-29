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
import { utilService } from '../../services/util.service'




export class _SearchBar extends React.Component {

  state = {
    criteria: {
      address: '',
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

  inputRef = React.createRef(null)

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
    let { criteria } = this.state
    let { checkIn, checkOut } = criteria
    checkIn = ` ${start.toLocaleString('en-IL', { month: 'short', day: 'numeric' })} `
    if (end) checkOut = ` ${end.toLocaleString('en-IL', { month: 'short', day: 'numeric' })} `
    this.setState({ criteria: { ...criteria, checkIn, checkOut } })
  }

  handleKeyPress = () => {
    return false
  }


  onSubmit = async (ev) => {
    ev.preventDefault()
    const { criteria } = this.state
    const queryString = utilService.makeQueryParams(criteria)
    // await this.props.onload(criteria)
    this.props.history.push(`/stay?${queryString}`)

  }



  activeInput = (input) => {
    this.closeInputs()
    switch (input) {
      case 'guest':
        this.setState({ isPickingGuests: true })
        break;
      case 'date':
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
    const { isPickingGuests, isPickingDates: isPickingCheckIn, criteria } = this.state
    const { checkIn, checkOut } = criteria
    return (
      <section className="flex column align-center">
        <div>
          <div className="flex column">
        <form className="search-bar-container flex" onClick={this.preventPropagation} onSubmit={this.onSubmit}>
          <div className="input-container flex column"
            onClick={() => this.inputRef.current.focus()}
          >
            <span>address:</span>
            <input
              type="search"
              ref={this.inputRef}
              placeholder="Where are you going?"
              name="address"
              autoComplete="off"
              onChange={this.handleChange}
              onClick={this.closeInputs}
            />
          </div>
          <div className="input-container flex column" onClick={() => this.activeInput('date')}>
            <span>Check in:</span>
            <input
              type="text"
              placeholder="Add dates"
              name="checkIn"
              value={checkIn}
              autoComplete="off"
              disabled
              onChange={this.handleChange}

            />
          </div>
          <div className="input-container flex column"
            onClick={() => this.activeInput('date')}>
            <span>Check out:</span>
            <input
              type="text"
              placeholder="Add dates"
              autoComplete="off"
              name="checkOut"
              value={checkOut}
              disabled
              onChange={this.handleChange}

            />
          </div>
          <div className="input-container flex column"
            onClick={() => this.activeInput('guest')}
          >
            <span>Guests:</span>
            <input
              type="search"
              placeholder="Add guests"
              autoComplete="off"
              name="guests"
              placeholder={'guests:' + this.getTotalGuests()}
              disabled
              onChange={this.handleChange}

            />
          </div>
          <button className="search-bar-submit flex">{<FontAwesomeIcon className='search-icon' icon={faSearch} />}</button>
        </form>
        <div className={isPickingGuests ? "picking-guest-container" : "picking-guest-container none"}> {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />} </div>
        <div className={isPickingCheckIn ? "picking-dates-container" : "checkin-container none"}> {isPickingCheckIn && <DatePicker preventPropagation={this.preventPropagation} handlePickingDates={this.handlePickingDates} />} </div>
        </div>
        </div>
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


