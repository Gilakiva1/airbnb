import { Component } from "react";
import { connect } from 'react-redux'
import { HostList } from "../cmps/host-page/HostList";
import { HostOrder } from "../cmps/host-page/HostOrder";
import { SideNav } from '../cmps/host-page/SideNav'
import { loadAssets } from '../store/host.action.js'
import { AddStay } from '../cmps/host-page/AddStay'

class _HostPage extends Component {
    state = {
        asset: [],
        component: {
            isAddasset: false,
            isMyAsset: true,
            isOrders: false,
            isRates: false
        },
        currAsset:''
    }

    async componentDidMount() {
        await this.props.loadAssets(this.props.user._id) // for develop right now user has assets
    }


    toggleComponent = (property,currAsset='') => {
        this.setState({ component: property,currAsset },()=>{
            console.log(this.state);
        })
    }
    render() {
        const { user } = this.props
        const { assets } = this.props
        console.log(assets,'assets');
        const { isAddAsset, isMyAsset, isOrders, isRates } = this.state.component
        const {currAsset} = this.state
        if (!assets.length) return <AddStay host={user} />
        return (
            <div className="host-page">
                <div className="host-container">
                    <div className="nav-bar">
                        <SideNav toggleComponent={this.toggleComponent} />
                    </div>
                    <div className="stay-details">
                        {isAddAsset && <AddStay host={user} currAsset={currAsset} />}
                        {isMyAsset && <HostList toggleComponent={this.toggleComponent}  assets={assets} />}
                        {isOrders && <HostOrder />}
                        {isRates && <div>Rates</div>}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        assets: state.hostReducer.assets,
        user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    loadAssets
}
export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)