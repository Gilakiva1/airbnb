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
        currAsset: '',
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

        const PriceMonth = this.props.orders.reduce((acc, order) => {
            acc += order.price
            return Math.floor(acc / 30)
        }, 0)
        console.log('price', PriceMonth);
        const topRated = this.props.assets.reduce((acc, asset) => {
            acc += asset.rate?.summery
            return acc / asset.length
        }, 0)
        const types = [
            { property: 'Total rate', info: topRated },
            { property: 'monthly earning', info: PriceMonth }
        ]
        this.setState({ types })
    }


    toggleComponent = (property, currAsset = '') => {
        this.setState({ component: property, currAsset }, () => {
            console.log(this.state);
        })
    }
    render() {
        const { user } = this.props
        const { assets } = this.props
        console.log(assets, 'assets');
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
                                {isAddAsset && <AddStay host={user} currAsset={currAsset} />}
                                {isMyAsset && <HostList toggleComponent={this.toggleComponent} assets={assets} />}
                                {isOrders && <HostOrder />}
                                {isRates && <div>Rates</div>}
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