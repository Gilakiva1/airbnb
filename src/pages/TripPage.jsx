import React from "react"
import { connect } from 'react-redux'
import { orderService } from '../services/order.service'
import { TripHero } from "../cmps/svgs/TripHero.jsx"
import { onLoadOrders, onSetOrder } from "../store/order.action"
import { TripList } from "../cmps/trip/TripList"

class _TripPage extends React.Component {

    state = {
        // isUpcoming: true,
        isOrders: false

    }
    componentDidMount() {
        //getLoggedInuser !!
        const userId = 'userId'
        this.onLoadOrders(userId)
    }

    onLoadOrders = async userId => {
        const orders = await this.props.onLoadOrders(userId)
        if (orders.length) {
            this.setState({ isOrders: true })
        }
    }
    onSetOrder = (order) => {
        this.props.onSetOrder(order)

    }

    render() {
        const { isUpcoming, isOrders } = this.state
        const { orders } = this.props
        if (!orders) return <div>loading</div>
        return (
            <section className="trip-container" >
                <h1 className="txt-trip bold fs32 clr2">Trips</h1>
                <div className="trip-btn flex column">
                    <div className="btn-menu flex ">
                        <h2 className="fs16 txt pointer meduim clr5">Upcoming</h2>
                        <h2 className="fs16 txt pointer past meduim clr5">Past</h2>
                    </div>
                    <div className="trip-hero">
                        {!isOrders && <TripHero className="trip-hero" />}
                    </div>
                    {isOrders && <TripList orders={orders} onSetOrder={this.onSetOrder} />}
                </div>
            </section>
        )
    }
}
function mapStateToProps(state) {
    return {
        orders: state.orderReducer.orders
    }
}
const mapDispatchToProps = {
    onLoadOrders,
    onSetOrder
}

export const TripPage = connect(mapStateToProps, mapDispatchToProps)(_TripPage)


