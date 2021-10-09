import { Component } from "react";
import { connect } from 'react-redux'
import { HostList } from "../cmps/host-page/HostList";
import { HostOrder } from "../cmps/host-page/HostOrder";
import { SideNav } from '../cmps/host-page/SideNav';
import { loadAssets } from '../store/host.action.js';
import { AddStay } from '../cmps/host-page/AddStay';
import { CardList } from '../cmps/host-page/CardList'
import { onLoadOrders } from "../store/order.action";
import { HostStatus } from "../cmps/host-page/HostStatus";

class _HostPage extends Component {
    state = {
        asset: [],
        component: {
            isAddasset: false,
            isMyAsset: true,
            isOrders: false,
            isRates: false
        },
        currAsset: '',
        hostDetails: {
            price: 0,
            rate: 0,
            status: {
                Approved: 0,
                Pending: 0,
                Declined: 0
            },
            guests: 0
        }
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
        let { price, rate, guests } = this.state.hostDetails

        if (!orders.length) return

        const status = { Approved: 0, Pending: 0, Declined: 0 }
        price = orders.reduce((acc, order) => {
            acc += order.price
            status[order.status] += 1
            console.log(acc);
            return Math.floor(acc / 30)
        }, 0)
        rate = assets.reduce((acc, asset) => {
            acc += asset.rate?.summery
            return acc / asset.length
        }, 0)

        this.setState({ hostDetails: { price, rate, status, guests } })
    }
    toggleComponent = (property, currAsset = '') => {
        this.setState({ component: property, currAsset }, () => {
            console.log(this.state);
        })
    }
    render() {
        const { user, assets } = this.props
        const { price, rate, status, guests } = this.state.hostDetails
        const { isAddAsset, isMyAsset, isOrders, isRates } = this.state.component
        if (!assets) return <div>loading...</div>

        return (
            <div className="host-page">
                <div className="host-container">

                    <nav className="nav-bar flex justify-center">
                        <SideNav isAddAsset={isAddAsset} isMyAsset={isMyAsset} isOrders={isOrders} isRates={isRates} toggleComponent={this.toggleComponent} />
                    </nav>
                    <HostStatus price={price} rate={rate} status={status} guests={guests} />
                    <div className="stay-details-container">
                        <div className="stay-details">
                            {isAddAsset && <AddStay host={user} currAsset={this.state.currAsset} />}
                            {isMyAsset && <HostList toggleComponent={this.toggleComponent} assets={assets} />}
                            {isOrders && <HostOrder onCalcDetails={this.onCalcDetails} />}
                            {isRates && <div>Rates</div>}
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