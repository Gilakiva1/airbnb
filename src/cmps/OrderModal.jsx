import { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../services/util.service';
import { GuestsPicking } from './header/GuestsPicking';
import { DatePicker } from './header/DatePicker';
import { stayService } from '../services/stay.service';
import { withRouter } from 'react-router';
import { onLoadOrder, onSetOrder } from '../store/order.action';

export class _OrderModal extends Component {

    state = {
        order: {

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
        this.setState({ order })
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
        const { order } = this.state
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ order: { ...order, [field]: value } })
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
        let { adult, child, infant } = this.state.order.guests
        var guests = `guests:${adult + child}`
        if (infant) {
            guests += ` infant: ${infant}`
        }
        return guests
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
        const { stay, order } = this.state
        if (ev.target.type === 'button') {
            ev.target.type = 'submit'
        }
        else {
            // this.props.onSetOrder(this.state.order)
            const savedOrder = await this.props.onSetOrder(order)
            const stay = await stayService.getById(this.props.match.params.stayId)
            stay.orders.push(savedOrder)
        }
    }

    temp = ()=>{
        const { stay, order } = this.state
        const checkIn = Date.parse(order.checkIn)
        console.log('checkIn',checkIn);
            }


    render() {
        const { isPickingDates, isPickingGuests, isReserve } = this.state
        // const { checkIn, checkOut } = order
        const { order, stay } = this.props

        if (!order) return <div>loading</div>
        return (
            <div className="order-modal">
                <div className="flex space-between">

                    <span><span className="price">${stay.price}</span>/Night</span>
                    <div>
                        {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                        5
                        <span className="rating"> ({utilService.getRandomIntInclusive(30, 500)} reviews)  </span>
                    </div>
                </div>
                <form className="" onClick={this.preventPropagation}>
                    <div className="flex column">
                        <div className="input-container flex">
                            <div className="check-in"
                                onClick={() => this.activeInput('date')}>
                                <span className="date-label">Check in:</span>
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
                            <div className="check-out"
                                onClick={() => this.activeInput('date')}>
                                <span className="date-label">Check out:</span>
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
                        <div className="guests flex column">
                            <label htmlFor="confirm-guests">Guests:</label>
                            <button className="confirm-guests" type="button" onClick={() => this.activeInput('guest')}>{this.getTotalGuests()}</button>
                        </div>
                    </div>
                    <div className="flex column">
                        {!isReserve && <button className="confirm-order" type="button" onClick={this.onSubmit}>Check availability</button>}
                        {isReserve && <button className="confirm-order" type="button" onClick={this.onSubmit}>Reserve</button>}
                        
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
    console.log('state.orderReducer.order', state.orderReducer.order);
    return {
        stays: state.stayReducer.stays,
        order: state.orderReducer.order
    }
}
const mapDispatchToProps = {
    onLoadOrder,
    onSetOrder

}
export const OrderModal = connect(mapStateToProps, mapDispatchToProps)(withRouter(_OrderModal))