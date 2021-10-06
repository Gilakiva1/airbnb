import React from "react"
import { connect } from 'react-redux'
import { orderService } from '../services/order.service'
import { TripHero } from "../cmps/svgs/TripHero.jsx"
import { onLoadOrders, onSetOrder } from "../store/order.action"
import { TripList } from "../cmps/trip/TripList"
import { userReducer } from "../store/user.reducer"

class _TripPage extends React.Component {

    state = {
        isUpcoming: false,
        isPast: false,
        isOrders: false

    }
    componentDidMount() {
        const filter = {
            type: 'user',
            _id: this.props.user._id
        }
        this.onLoadOrders(filter)
    }

    onLoadOrders = async (filter) => {
        const orders = await this.props.onLoadOrders(filter)
        if (orders.length) {
            this.setState({ isOrders: true })
        }
    }
    onSetOrder = (order) => {
        this.props.onSetOrder(order)
    }
    toggleTripStatus = (diff) => {
        if (diff === 'upcoming') {
            this.setState({ isUpcoming: true, isPast: false })
        } else {
            this.setState({ isPast: true, isUpcoming: false })
        }

        // diff === 'upcoming' ? this.setState({ isUpcoming: true }) : this.setState({})
    }

    render() {
        const { isUpcoming, isOrders, isPast } = this.state
        const { orders } = this.props
        if (!orders) return <div>loading</div>
        return (
            <section className="trip-container" >
                <h1 className="txt-trip bold fs32 clr2">Trips</h1>
                <div className="trip-btn flex column">
                    <div className="btn-menu flex ">
                        <button onClick={() => { this.toggleTripStatus('upcoming') }} className="btn-trip fs16 pointer medium clr5">Upcoming</button>
                        <button onClick={() => { this.toggleTripStatus('past') }} className="btn-trip fs16 pointer past medium clr5">Past</button>
                    </div>
                    <div className="trip-hero">
                        {!orders.length || isPast && < TripHero className="trip-hero" />}
                    </div>
                    {orders.length && !isPast && < TripList orders={orders} onSetOrder={this.onSetOrder} />}

                </div>
            </section>
        )
    }
}
function mapStateToProps(state) {
    return {
        orders: state.orderReducer.orders,
        user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    onLoadOrders,
    onSetOrder
}

export const TripPage = connect(mapStateToProps, mapDispatchToProps)(_TripPage)


