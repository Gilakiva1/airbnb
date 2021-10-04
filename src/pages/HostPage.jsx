import { Component } from "react";
import { connect } from 'react-redux'

import { HostList } from "../cmps/host-page/HostList";
import { SideNav } from '../cmps/host-page/SideNav'
import { loadStays } from '../store/stay.action.js'

class _HostPage extends Component {
    state = {
        stays: [],
        component: {
            isAddStays: false,
            isMyStays: true,
            isOrders: false,
            isRates: false
        }
    }

    async componentDidMount() {
        await this.props.loadStays({ hostId: '51392291' })
    }


    toggleComponent = (property) => {
        this.setState({ component: property }, () => {
        })

    }
    render() {
        const { stays } = this.props
        const { isAddStays, isMyStays, isOrders, isRates } = this.state.component
        return (
            <div className="host-page">

                <div className="host-container">
                    <div className="nav-bar">
                        <SideNav toggleComponent={this.toggleComponent} />
                    </div>
                    <div className="stay-details">
                        {isAddStays && <div>add stay</div>}
                        {isMyStays && <HostList stays={stays} />}
                        {isOrders && <div>Orders</div>}
                        {isRates && <div>Rates</div>}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
    }
}
const mapDispatchToProps = {
    loadStays

}
export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)