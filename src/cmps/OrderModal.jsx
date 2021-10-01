import { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../services/util.service';
import { GuestsPicking } from './header/GuestsPicking';
import { DatePicker } from './header/DatePicker';
import { stayService } from '../services/stay.service';
import { withRouter } from 'react-router';
import { onAddOrder, onLoadOrder } from '../store/order.action';

export class _OrderModal extends Component {

    state = {
        order: {
            checkIn: '',
            checkOut: '',
            guests: {
                adult: 0,
                child: 0,
                infant: 0
            }
        },
        isReserve: false,
        isPickingGuests: false,
        isPickingDates: false,
        reviewsNumber: 0

    }

    async componentDidMount() {
        let { reviewsNumber } = this.state
        reviewsNumber = utilService.getRandomIntInclusive(30, 500)
        window.addEventListener('click', this.closeInputs)
        const order = await this.props.onLoadOrder('load')
        console.log(this.props);
        this.setState({ order, reviewsNumber })
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.closeInputs)
    }

    handleChange = (ev) => {
        const { order } = this.state
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ order: { ...order, [field]: value } })
    }

    closeInputs = () => {
        let { isPickingGuests, isPickingDates } = this.state
        if (!isPickingGuests && !isPickingDates) return
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
        if (this.state.order.guests) {

            let { adult, child, infant } = this.state.order.guests
            var guests = `guests:${adult + child + infant}`
            return guests
        } else {
            return 0
        }
    }
    handleKeyPress = () => {
        return false
    }

    handleGuestsChanege = (field, value) => {
        let { order } = this.state
        let { guests } = order
        this.setState({ order: { ...order, guests: { ...guests, [field]: value } } })
    }

    handlePickingDates = (start, end) => {
        let { order } = this.state
        let { checkIn, checkOut } = order
        checkIn = ` ${start.toLocaleString('en-IL', { month: 'short', day: 'numeric' })} `
        if (end) checkOut = ` ${end.toLocaleString('en-IL', { month: 'short', day: 'numeric' })} `
        this.setState({ order: { ...order, checkIn, checkOut } })
    }

    onSubmit = async (ev) => {
        ev.preventDefault()
        const { order, isReserve } = this.state
        if (!isReserve) {
            ev.target.type = 'submit'
            this.setState({ isReserve: true })
        }
        else {
            // this.props.onAddOrder(this.state.order)
            const savedOrder = await this.props.onAddOrder(order)
            const stay = await stayService.getById(this.props.match.params.stayId)
            stay.orders.push(savedOrder)
            console.log('stay', stay);
        }
    }

    temp = () => {
        const { stay, order } = this.state
        const checkIn = Date.parse(order.checkIn)
    }


    render() {
        const { isPickingDates, isPickingGuests, isReserve, reviewsNumber, order } = this.state
        const { stay, currOrder } = this.props
        if (!currOrder) return <div>loading</div>
        return (
            <div className="order-modal">
                <div className="flex space-between align-center">

                    <span className="price fs22 meduim">${stay.price} <span className="fs16 book clr2"> / night</span></span>
                    <div className="rating-conatiner flex align-center">
                        {<FontAwesomeIcon className='star-icon ' icon={faStar} />}
                        <span className="fs14 meduim clr2"> 5</span>
                        <span className="rating"> ({reviewsNumber} reviews)  </span>
                    </div>
                </div>
                <form className="" onClick={this.preventPropagation}>
                    <div className="flex column">
                        <div className="input-container flex">
                            <div className="check-in"
                                onClick={() => this.activeInput('date')}>
                                <span className="date-label fs10 bold">CHECK-IN:</span>
                                <input
                                    className="light fs14"
                                    type="text"
                                    placeholder="Add dates"
                                    name="checkIn"
                                    value={order.checkIn || ''}
                                    disabled
                                    style={{ outline: 'none' }}
                                    onChange={this.handleChange}
                                    onClick={() => this.activeInput('date')}
                                />
                            </div>
                            <div className="check-out"
                                onClick={() => this.activeInput('date')}>
                                <span className="date-label fs10 bold ">CHEACKOUT:</span>
                                <input
                                    className="light fs14"
                                    type="text"
                                    placeholder="Add dates"
                                    name="checkOut"
                                    value={order.checkOut || ''}
                                    disabled
                                    style={{ outline: 'none' }}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <label className="guests" onClick={() => this.activeInput('guest')}>
                            <div className="flex column  ">
                                <span className="bold fs10">GUESTS</span>
                                <button className="fs14 confirm-guests light" type="button" >{this.getTotalGuests()} GUESTS</button>
                            </div>
                        </label>
                    </div>
                    <div className="flex column">
                        {!isReserve && <button className="confirm-order fs16" type="button" onClick={this.onSubmit}>Check availability</button>}
                        {isReserve && <button className="confirm-order fs16" type="button" onClick={this.onSubmit}>Reserve</button>}

                    </div>
                    <span>You won't be charged yet </span>
                    <div className={isPickingGuests ? "picking-guest-container" : "picking-guest-container none"}> {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />} </div>

                </form>
                <div className={isPickingDates ? "picking-dates-container" : "checkin-container none"}> {isPickingDates && <DatePicker preventPropagation={this.preventPropagation} handlePickingDates={this.handlePickingDates} />} </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
        currOrder: state.orderReducer.currOrder

    }
}
const mapDispatchToProps = {
    onAddOrder,
    onLoadOrder

}
export const OrderModal = connect(mapStateToProps, mapDispatchToProps)(withRouter(_OrderModal))