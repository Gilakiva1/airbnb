import { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../services/util.service';
import { GuestsPicking } from './header/GuestsPicking';
import { DatePicker } from './header/DatePicker';
// import { onSetOrder } from '../store/order.action'
import { onLoadOrder } from '../store/order.action';

export class _OrderModal extends Component {

    state = {
        criteria: {

            chackIn: '',
            chackOut: '',

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

    async componentDidMount() {
        window.addEventListener('click', this.setIsPickingGuests)
        const order = await this.props.onLoadOrder()


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
        var guests = `Adults:${adult + child}`
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
        let { criteria } = this.state
        let { checkIn, checkOut } = criteria
        checkIn = ` ${start.toLocaleString('en-IL', { month: 'short', day: 'numeric' })} `
        if (end) checkOut = ` ${end.toLocaleString('en-IL', { month: 'short', day: 'numeric' })} `
        this.setState({ criteria: { ...criteria, checkIn, checkOut } })
    }

    onSubmit = (ev) => {
        if (ev.target.type === 'button') {
            this.setState({ isReserve: true })
            ev.target.type = 'submit'
        }
        else {
            this.props.onSetOrder(this.state.criteria)
        }
    } 


    render() {
        const { isPickingDates, criteria, isPickingGuests, isReserve } = this.state
        const { checkIn, checkOut } = criteria
        const { stay, order } = this.props
        if (!order) return <div>loading</div>
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
                        <div className="input flex">
                            <div className="flex column">
                                <div className="flex">

                                    <div className="date-input flex column"
                                        onClick={() => this.activeInput('date')}>
                                        <span>Check in:</span>
                                        <input
                                            type="text"
                                            placeholder="Add dates"
                                            name="checkIn"  
                                            value={order.checkIn}
                                            disabled
                                            style={{ outline: 'none' }}
                                            onChange={this.handleChange}
                                            onClick={() => this.activeInput('date')}
                                        />
                                    </div>
                                    <div className="input-container flex column"
                                        onClick={() => this.activeInput('date')}>
                                        <span>Check out:</span>
                                        <input
                                            type="text"
                                            placeholder="Add dates"
                                            name="checkOut"  
                                            value={order.checkOut}
                                            disabled
                                            style={{ outline: 'none' }}
                                            onChange={this.handleChange}

                                        />
                                    </div>
                                </div>
                                <div className="input-container flex column">
                                    <span>Guests:</span>
                                </div>
                            </div>
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

function mapStateToProps(state) {
    console.log('state.orderReducer.order',state.orderReducer.order);
    return {
        stays: state.stayReducer.stays,
        order: state.orderReducer.order
    }
}
const mapDispatchToProps = {
    onLoadOrder
}
export const OrderModal = connect(mapStateToProps, mapDispatchToProps)(_OrderModal)