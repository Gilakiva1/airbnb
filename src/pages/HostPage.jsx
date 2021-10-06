import { Component } from "react";
import { connect } from 'react-redux'
import { HostList } from "../cmps/host-page/HostList";
import { HostOrder } from "../cmps/host-page/HostOrder";
import { SideNav } from '../cmps/host-page/SideNav'
import { loadAssets } from '../store/host.action.js'

class _HostPage extends Component {
    state = {
        asset: [],
        component: {
            isAddasset: false,
            isMyAsset: true,
            isOrders: false,
            isRates: false
        }
    }

    async componentDidMount() {
        await this.props.loadAssets(this.props.user._id) // for develop right now user has assets
    }


    toggleComponent = (property) => {
        this.setState({ component: property })
    }
    render() {
        const { assets } = this.props
        const { isAddAsset, isMyAsset, isOrders, isRates } = this.state.component
        console.log('assets', assets);
        if (!assets.length) return <div>loading...</div>
        return (
            <div className="host-page">
                <div className="host-container">
                    <div className="nav-bar">
                        <SideNav toggleComponent={this.toggleComponent} />
                    </div>
                    <div className="stay-details">
                        {isAddAsset && <div>add asset</div>}
                        {isMyAsset && <HostList assets={assets} />}
                        {isOrders && <HostOrder />}
                        {isRates && <div>Rates</div>}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    return {
        assets: state.hostReducer.assets,
        user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    loadAssets
}
export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)