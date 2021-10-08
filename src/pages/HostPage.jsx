import { Component } from "react";
import { connect } from 'react-redux'
import { HostList } from "../cmps/host-page/HostList";
import { HostOrder } from "../cmps/host-page/HostOrder";
import { SideNav } from '../cmps/host-page/SideNav';
import { loadAssets } from '../store/host.action.js';
import { AddStay } from '../cmps/host-page/AddStay';
import { CardList } from '../cmps/host-page/CardList'
import { onLoadOrders } from "../store/order.action";
class _HostPage extends Component {
    state = {
        asset: [],
        component: {
            isAddasset: false,
            isMyAsset: true,
            isOrders: false,
            isRates: false
        },
        types: []
    }

    async componentDidMount() {
        await this.props.loadAssets(this.props.user._id) // for develop right now user has assets
        const filter = {
            type: 'host',
            _id: this.props.user._id
        }
        await this.props.onLoadOrders(filter)
        this.onCalcDetails()
    }

    onCalcDetails = () => {
        const { orders, assets } = this.props
        let ordersDetails = {
            Pending: 0,
            Declined: 0,
            Approved: 0
        }
        const PriceMonth = orders.reduce((acc, order) => {
            acc += order.price
            return Math.floor(acc / 30)
        }, 0)
        const topRated = assets.reduce((acc, asset) => {
            acc += asset.rate?.summery
            return acc / asset.length
        }, 0)
        orders.map(order => {
            return ordersDetails[order.status] += 1
        })
        const types = [
            { property: 'Total rate', info: topRated },
            { property: 'Monthly earning', price: PriceMonth },
            { property: 'Orders Status', status: ordersDetails },
        ]
        this.setState({ types })
    }


    toggleComponent = (property) => {
        this.setState({ component: property })
    }
    render() {
        const { user } = this.props
        const { assets } = this.props
        const { isAddAsset, isMyAsset, isOrders, isRates } = this.state.component
        if (!assets.length) return <div>loading...</div>

        return (
            <div className="host-page">
                <div className="host-container">

                    <nav className="nav-bar flex justify-center">
                        <SideNav isAddAsset={isAddAsset} isMyAsset={isMyAsset} isOrders={isOrders} isRates={isRates} toggleComponent={this.toggleComponent} />
                    </nav>
                    <div className="stay-details-container">
                        <div>
                            <div className="card-container">
                                <CardList types={this.state.types} />

                            </div>
                            <div className="stay-details">
                                {isMyAsset && <HostList assets={assets} />}
                                {isOrders && <HostOrder onCalcDetails={this.onCalcDetails} />}
                                {isRates && <div>Rates</div>}
                                {isAddAsset && <AddStay host={user} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        assets: state.hostReducer.assets,
        user: state.userReducer.loggedInUser,
        orders: state.orderReducer.orders,
    }
}
const mapDispatchToProps = {
    loadAssets,
    onLoadOrders
}
export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)