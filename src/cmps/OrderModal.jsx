import React from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../services/util.service';
import { GuestsPicking } from './header/GuestsPicking';
import { DatePicker } from './header/DatePicker';
import { stayService } from '../services/stay.service';
import { withRouter } from 'react-router';
import { OrderMsg } from './OrderMsg';
import { onAddOrder, onUpdateOrder, onSetOrder } from '../store/order.action';

export class _OrderModal extends React.Component {

    state = {
        isReserve: false,
        isFinalReserve: false,
        isPickingGuests: false,
        isPickingDates: false,
        reviewsNumber: 0,
        orderParams: null,

    }

    async componentDidMount() {
        let { reviewsNumber } = this.state
        reviewsNumber = utilService.getRandomIntInclusive(30, 500)
        window.addEventListener('click', this.closeInputs)
        this.setState({ reviewsNumber })

    }

    inputRef = React.createRef(null)

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
        ev.preventDefault()
        const { currOrder } = this.props
        const orderCopy = { ...currOrder }
        const field = ev.target.name
        const value = ev.target.value
        orderCopy[field] = value
        this.props.onUpdateOrder(orderCopy)
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

    preventPropagation = ev => {
        ev.stopPropagation()
    }

    getTotalGuests = () => {
        if (this.props.currOrder.guests) {
            console.log(this.props.currOrder);
            let { adult, child, infant } = this.props.currOrder.guests
            var guests = `guests:${adult + child + infant}`
            return guests
        } else {
            return 0
        }
    }

    handleGuestsChanege = (field, value) => {
        const orderCopy = { ...this.props.currOrder }
        if (!orderCopy.guests) {
            orderCopy.guests = {
                adult: 0,
                child: 0,
                infant: 0
            }
        }
        orderCopy.guests[field] = value
        this.props.onUpdateOrder(orderCopy)
    }

    handlePickingDates = (start, end) => {
        const orderCopy = { ...this.props.currOrder }
        orderCopy.checkIn = Date.parse(start)
        if (end) {
            orderCopy.checkOut = Date.parse(end)
        }
        this.props.onUpdateOrder(orderCopy)
    }


    createFinalOrder = () => {
        const { currOrder, stay } = this.props
        const finalOrder = {
            hostId: stay.host._id,
            createdAt: Date.now(),
            price: ((currOrder.checkOut - currOrder.checkIn) / (1000 * 60 * 60 * 24)) * stay.price,
            checkIn: currOrder.checkIn,
            checkOut: currOrder.checkOut,
            guests: currOrder.guests,
            img: stay.imgUrls[0],
            status: 'pending',
            buyer: {
                _id: 'userId',
                fullname: 'user.fullname'
    

            },
            stay: {
                _id: stay._id,
                name: stay.name,
                address: stay.loc.address
            }
        }
        return finalOrder
    }
    onSubmit = async (ev) => {
        ev.preventDefault()
        const { isReserve } = this.state
        if (!isReserve) {
            ev.target.type = 'submit' //?
            this.setState({ isReserve: true })
        }
        else {

            // await this.props.onSetOrder(null)
            //change to save id at stay or mini order
            const finalOrder = this.createFinalOrder()
            await this.props.onAddOrder(finalOrder)
            this.setState({ isFinalReserve: true })
            setTimeout(() => {
                this.setState({ isFinalReserve: false })
                this.props.history.push('/trip')
            }, 2000);
        }
    }



    render() {
        const { isPickingDates, isPickingGuests, isFinalReserve, isReserve, reviewsNumber } = this.state
        const { stay, currOrder } = this.props
        if (!currOrder) return <div>loading</div>
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
                                    value={new Date(currOrder.checkIn).toLocaleString('en-IL', { month: 'short', day: 'numeric' }) || ''}
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
                                    value={new Date(currOrder.checkOut).toLocaleString('en-IL', { month: 'short', day: 'numeric' }) || ''}
                                    disabled
                                    style={{ outline: 'none' }}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <label className={`guests ${isPickingGuests ? 'focus' : ''}`}>
                            <div className="flex column  ">
                                <span className="bold fs10">GUESTS</span>
                                <button onClick={() => this.activeInput('guest')} className="fs14 confirm-guests light clr2" type="button" ><span></span>{this.getTotalGuests()}</button>
                            </div>
                        </label>
                    </div>
                    <div className="flex column">
                        {!isReserve && <button onMouseMove={this.onSetColor} ref={this.inputRef} className="confirm-order fs16" type="button" onClick={this.onSubmit}><span>Check availability</span></button>}
                        {isReserve &&
                            <button onMouseMove={this.onSetColor} ref={this.inputRef} className="confirm-order fs16 medium" onClick={this.onSubmit}>Reserve</button>}
                    </div>
                    <div className={`${isPickingGuests ? '' : 'none'}`}> {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />} </div>
                    <div className={isPickingDates ? '' : 'none'}> {isPickingDates && <DatePicker order={currOrder} preventPropagation={this.preventPropagation} handlePickingDates={this.handlePickingDates} />} </div>
                </form >
                {isFinalReserve && <OrderMsg animateClassName={isFinalReserve ? 'slide-in-bottom' : ''} />}
            </div >
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        stays: state.stayReducer.stays,
        currOrder: state.orderReducer.currOrder
    }
}
const mapDispatchToProps = {
    onAddOrder,
    onUpdateOrder,
    onSetOrder
}

export const OrderModal = connect(mapStateToProps, mapDispatchToProps)(withRouter(_OrderModal))