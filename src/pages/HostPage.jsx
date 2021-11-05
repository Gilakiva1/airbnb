import { Component } from "react";
import { connect } from 'react-redux'
import { HostList } from "../cmps/host-page/HostList";
import { HostOrder } from "../cmps/host-page/HostOrder";
import { TopNav } from '../cmps/host-page/TopNav';
import { loadAssets } from '../store/host.action.js';
import { AddStay } from '../cmps/host-page/AddStay';
import { onLoadOrders } from "../store/order.action";
import { HostStatus } from "../cmps/host-page/HostStatus";
import { RateHost } from "../cmps/host-page/rateHost";
import Loader from "react-loader-spinner";
import { userService } from "../services/user.service";

class _HostPage extends Component {
    state = {
        asset: [],
        component: {
            isAddAsset: false,
            isMyAsset: false,
            isOrders: true,
            isRates: false
        },
        currAsset: '',
        hostDetails: {
            price: 0,
            rate: 0,
            activeGuests: 0,
            status: {
                Approved: 0,
                Pending: 0,
                Declined: 0
            },
        }

    }

    async componentDidMount() {
        if (!userService.getLoggedinUser()) {
            return this.props.history.push('/')
        } 
        await this.props.loadAssets(this.props.user._id) 
        const filter = {
            type: 'host',
            _id: this.props.user._id
        }
        await this.props.onLoadOrders(filter)
        this.onCalcDetails()
    }

    onCalcDetails = () => {
        const { orders, assets } = this.props
        let hostDetails = {
            price: 0,
            rate: 0,
            status: {
                Approved: 0,
                Pending: 0,
                Declined: 0
            },
            activeGuests: 0
        }

        let rate = assets.reduce((acc, asset) => {
            return acc += asset.rating
        }, 0)
        hostDetails.rate = (rate / assets.length).toFixed(1)

        if (!orders.length) return this.setState({ hostDetails })

        orders.reduce((hostDetails, order) => {
            hostDetails.price += order.price
            hostDetails.status[order.status]++
            if (order.status === 'Approved') {
                hostDetails.activeGuests++
            }
            return hostDetails
        }, hostDetails)

        this.setState({ hostDetails })
    }
    toggleComponent = (property, currAsset = '') => {
        this.setState({ component: property, currAsset })
    }
    render() {

        const { user, assets } = this.props
        const { price, rate, status, activeGuests } = this.state.hostDetails
        const { isAddAsset, isMyAsset, isOrders, isRates } = this.state.component
        if (!assets) return (<div className="flex align-center justify-center full">
            <Loader
                type="ThreeDots"
                color='#FF385C'
                height={100}
                width={100}
            />
        </div>)

        return (
            <div className="host-page">
                <div className="host-container">

                    <nav className="nav-bar flex justify-center">
                        <TopNav isAddAsset={isAddAsset} isMyAsset={isMyAsset} isOrders={isOrders} isRates={isRates} toggleComponent={this.toggleComponent} />
                    </nav>
                    <HostStatus price={price} rate={rate} status={status} activeGuests={activeGuests} />
                    {assets.length &&
                        <div className="stay-details-container">
                            <div className="stay-details">
                                {isAddAsset && <AddStay host={user} currAsset={this.state.currAsset} />}
                                {isMyAsset && <HostList toggleComponent={this.toggleComponent} assets={assets} />}
                                {isOrders && <HostOrder onCalcDetails={this.onCalcDetails} />}
                                {isRates && <RateHost assets={assets} />}
                            </div>
                        </div>}
                    {!assets.length &&
                        <div className="create-asset">
                            <h1>need to add func !</h1>
                        </div>
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
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