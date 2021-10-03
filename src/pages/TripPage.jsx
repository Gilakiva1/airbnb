import React from "react"
import { connect } from 'react-redux'
import { TripHero } from "../cmps/svgs/TripHero.jsx"

class _TripPage extends React.Component {

    componentDidMount() {
        // this.loadOrders()
    }

    onloadOrders = () => {

    }

    render() {
        const { orders } = this.props
        if (!orders) return <div>loading</div>
        return (

            <section className="trip-container" >
                <h1>Trips</h1>
                <div className="trip-btn flex">
                    <h2>Past</h2>
                    <h2>Upcoming</h2>
                    <div className="trip-hero">
                        <TripHero className="trip-hero" />

                    </div>
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

export const TripPage = connect(mapStateToProps)(_TripPage)


