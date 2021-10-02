import React from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../services/util.service';
import { GuestsPicking } from './header/GuestsPicking';
import { DatePicker } from './header/DatePicker';
import { stayService } from '../services/stay.service';
import { withRouter } from 'react-router';
import { onAddOrder } from '../store/order.action';

export class _OrderModal extends React.Component {

    state = {
        order: null,
        isReserve: false,
        isPickingGuests: false,
        isPickingDates: false,
        reviewsNumber: 0,
        orderParams: null

    }

    async componentDidMount() {
        let { reviewsNumber } = this.state
        reviewsNumber = utilService.getRandomIntInclusive(30, 500)
        window.addEventListener('click', this.closeInputs)
        const { order } = this.props
        this.setState({ order, reviewsNumber })
    }

    inputRef = React.createRef(null)

    componentDidUpdate() {
        // debugger
        // const { order } = this.state
        // const { currOrder } = this.props
        // if (order.checkIn !== currOrder.checkIn || order.checkOut !== currOrder.checkOut) {
        //     this.setState({ order: this.props.currOrder })
        // }
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.closeInputs)
    }

    onSetColor = (ev) => {
        let x = ev.clientX
        let y = ev.clientY
        this.inputRef.current.style.setProperty('--mouse-x', x)
        this.inputRef.current.style.setProperty('--mouse-y', y)
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
        const { isPickingDates, isPickingGuests, isReserve, reviewsNumber, order, orderParams } = this.state
        const { stay } = this.props
        if (!order) return <div>loading</div>
        return (
            <div className="order-modal">
                <div className="flex space-between align-center">
                    <span className="price fs22 medium">${stay.price}
                        <span className="fs16 light clr2"> / night</span>
                    </span>
                    <div className="rating-container flex align-center">
                        {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                        <span className="fs14 medium clr2"> 5</span>
                        <span className="rating medium fs14 clr1 "> ({reviewsNumber} reviews)  </span>
                    </div>
                </div>
                <form className="" onClick={this.preventPropagation}>
                    <div className="flex column">
                        <div className={`input-container pointer flex ${isPickingDates ? 'focus' : ''}`}>
                            <div className={"check-in"}
                                onClick={() => this.activeInput('date')}>
                                <span className="date-label fs10 bold">CHECK-IN:</span>
                                <input
                                    className="light fs14"
                                    type="text"
                                    placeholder="Add dates"
                                    name="checkIn"
                                    value={order.checkIn|| ''}
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
                                    value={order.checkOut|| ''}
                                    disabled
                                    style={{ outline: 'none' }}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <label className={`guests ${isPickingGuests ? 'focus' : ''}`}>
                            <div className="flex column  ">
                                <span className="bold fs10">GUESTS</span>
                                <button onClick={() => this.activeInput('guest')} className="fs14 confirm-guests light clr2" type="button" >{this.getTotalGuests()} guest</button>
                            </div>
                        </label>
                    </div>
                    <div className="flex column">
                        {!isReserve && <button onMouseMove={this.onSetColor} ref={this.inputRef} className="confirm-order fs16" type="button" onClick={this.onSubmit}><span>Check availability</span></button>}
                        {isReserve &&
                            <button onMouseMove={this.onSetColor} ref={this.inputRef} className="confirm-order fs16 medium" type="button" onClick={this.onSubmit}>Reserve</button>}

                    </div>
                    <div className={`${isPickingGuests ? '' : 'none'}`}> {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />} </div>

                </form >
                <div className={isPickingDates ? '' : 'none'}> {isPickingDates && <DatePicker order={order} preventPropagation={this.preventPropagation} handlePickingDates={this.handlePickingDates} />} </div>
            </div >
        )
    }
}
function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,

    }
}
const mapDispatchToProps = {
    onAddOrder,

}
export const OrderModal = connect(mapStateToProps, mapDispatchToProps)(withRouter(_OrderModal))