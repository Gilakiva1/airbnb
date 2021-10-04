
import { Component } from "react";

export class SideNav extends Component {



    render() {

        return (
            <div className="side-nav">
                <button onClick={() => {
                    this.props.toggleComponent({
                        isAddStays: true,
                        isMyStays: false,
                        isOrders: false,
                        isRates: false
                    })
                }}>Add Stays</button>
                <button onClick={() => {
                    this.props.toggleComponent({
                        isAddStays: false,
                        isMyStays: true,
                        isOrders: false,
                        isRates: false
                    })
                }}>My Stays</button>
                <button onClick={() => {
                    this.props.toggleComponent({
                        isAddStays: false,
                        isMyStays: false,
                        isOrders: true,
                        isRates: false
                    })
                }}>Orders</button>
                <button onClick={() => {
                    this.props.toggleComponent({
                        isAddStays: false,
                        isMyStays: false,
                        isOrders: false,
                        isRates: true
                    })
                }}>Rates</button>
            </div>
        )
    }
}