import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../services/util.service';
import { GuestsPicking } from './header/GuestsPicking';
import { DatePicker } from './header/DatePicker';

export class OrderModal extends Component {

    state = {
        criteria: {
            dates: {
                chackIn: '',
                chackOut: ''
            },
            guests: {
                adult: 0,
                child: 0,
                infant: 0
            }
        },
        isReserve: false,
        isPickingGuests: false,
        isPickingDates: false
    }

    componentDidMount() {
        window.addEventListener('click', this.setIsPickingGuests)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.setIsPickingGuests)
    }

    setIsPickingGuests = () => {
        let { isPickingGuests } = this.state
        isPickingGuests = false
        this.setState({ isPickingGuests })
    };

    handleChange = (ev) => {
        const { criteria } = this.state
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ criteria: { ...criteria, [field]: value } })
    }

    closeInputs = () => {
        let { isPickingGuests, isPickingDates } = this.state
        isPickingGuests = false
        isPickingDates = false
        this.setState({ isPickingGuests, isPickingDates })
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


    setIsPickingGuests = () => {
        let { isPickingGuests } = this.state
        isPickingGuests = false
        this.setState({ isPickingGuests })
    }

    preventPropagation = event => {
        event.stopPropagation()
    }

    getTotalGuests = () => {
        let { adult, child, infant } = this.state.criteria.guests
        var guests = `Guests:${adult + child}`
        if (infant) {
            guests += ` infant: ${infant}`
        }
        return guests
    }
    handleKeyPress = () => {
        return false
    }

    handleGuestsChanege = (field, value) => {
        let { criteria } = this.state
        let { guests } = criteria
        this.setState({ criteria: { ...criteria, guests: { ...guests, [field]: value } } })
    }

    handlePickingDates = (start, end) => {
        console.log('start', start, 'end', end);
        let { criteria } = this.state
        let { checkIn, checkOut } = criteria
        checkIn = ` ${start.toLocaleString('en-IL', { month: 'short', day: 'numeric' })} `
        if (end) checkOut = ` ${end.toLocaleString('en-IL', { month: 'short', day: 'numeric' })} `
        console.log('check in:', checkIn, 'checkout', checkOut);
        this.setState({ criteria: { ...criteria, checkIn, checkOut } })
    }



    onSubmit = (ev) => {
        console.log(ev);
        console.log(ev.target.type === 'button');
        if (ev.target.type === 'button') {
            this.setState({ isReserve: true })
            ev.target.type = 'submit'
        }
        else {

        }

    }
    render() {

        const { isPickingGuests } = this.state
        const { isPickingDates } = this.state
        console.log('isPickingCheckIn', isPickingDates);
        console.log('isPickingGuests', isPickingGuests);
        const { criteria } = this.state
        const { checkIn, checkOut } = criteria
        const { isReserve } = this.state
        const { stay } = this.props
        console.log(stay.price);
        return (
            <div className="order-modal">
                <div className="flex gap5">
                    <div>
                        {/* ${stay.price}/Night */}
                    </div>
                    <div>

                        {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                        5
                        ({utilService.getRandomIntInclusive(30, 500)} reviews) <span> </span>
                    </div>
                </div>
                <div className="flex column" >
                    <form className="flex column" onClick={this.preventPropagation}>
                        <div className="date-input flex column">
                            <span>Check in:</span>
                            <input
                                type="text"
                                placeholder="Add dates"
                                name="checkIn"
                                value={checkIn}
                                style={{ outline: 'none' }}
                                onChange={this.handleChange}
                                onClick={() => this.activeInput('date')}
                            />
                        </div>
                        <div className="input-container flex column">
                            <span>Check out:</span>
                            <input
                                type="text"
                                placeholder="Add dates"
                                name="checkOut"
                                value={checkOut}

                                style={{ outline: 'none' }}
                                onChange={this.handleChange}
                                onClick={() => this.activeInput('date')}
                            />
                        </div>
                        <div className="input-container flex column">
                            <span>Guests:</span>
                        </div>
                        <div className="flex column">
                            <button className="confirm-order" type="button" onClick={() => this.activeInput('guest')}>{this.getTotalGuests()}</button>
                            {!isReserve && <button type="button" onClick={this.onSubmit}>Check availability</button>}
                            {isReserve && <button type="button" onClick={this.onSubmit}>Reserve</button>}
                        </div>
                    </form>
                    <div className={isPickingGuests ? "picking-guest-container" : "picking-guest-container none"}> {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />} </div>
                    <div className={isPickingDates ? "picking-dates-container" : "checkin-container none"}> {isPickingDates && <DatePicker preventPropagation={this.preventPropagation} handlePickingDates={this.handlePickingDates} />} </div>

                </div>
            </div>
        )
    }
}