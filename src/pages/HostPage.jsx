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
import Loader from "react-loader-spinner";

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
            activeGuests: []
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
        let hostDetails = {
            price: 0,
            rate: 0,
            status: {
                Approved: 0,
                Pending: 0,
                Declined: 0
            },
            activeGuests: []
        }

        if (!orders.length) return

        orders.reduce((hostDetails, order) => {
            hostDetails.price += order.price
            hostDetails.status[order.status] += 1
            if (order.status === 'Approved') {
                hostDetails.activeGuests.push(order.buyer.imgUrl)
            }
            return hostDetails
        }, hostDetails)


        let rate = assets.reduce((acc, asset) => {
            return acc += asset.rating
        }, 0)

        hostDetails.price = Math.floor(hostDetails.price / 30)
        hostDetails.rate = (rate / assets.length).toFixed(1)


        this.setState({ hostDetails })
    }
    onCalcStatus = () => {

    }


    toggleComponent = (property, currAsset = '') => {
        this.setState({ component: property, currAsset }, () => {
            console.log(this.state);
        })
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
                        <SideNav isAddAsset={isAddAsset} isMyAsset={isMyAsset} isOrders={isOrders} isRates={isRates} toggleComponent={this.toggleComponent} />
                    </nav>
                    <HostStatus price={price} rate={rate} status={status} activeGuests={activeGuests} />
                    {assets.length &&
                        <div className="stay-details-container">
                            <div className="stay-details">
                                {isAddAsset && <AddStay host={user} currAsset={this.state.currAsset} />}
                                {isMyAsset && <HostList toggleComponent={this.toggleComponent} assets={assets} />}
                                {isOrders && <HostOrder onCalcDetails={this.onCalcDetails} />}
                                {isRates && <div>Rates</div>}
                            </div>
                        </div>}
                    {!assets.length &&
                        <div className="create-asset">
                           
                        </div>
                    }

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