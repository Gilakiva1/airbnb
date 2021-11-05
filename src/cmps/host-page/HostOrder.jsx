import { Component } from 'react';
import { connect } from 'react-redux'
import { onLoadOrders, onUpdateStatusOrder } from '../../store/order.action'
import { HostOrderPreview } from './HostOrederPreview'
import Loader from "react-loader-spinner";
import { socketService } from '../../services/socket.service';

class _HostOrder extends Component {

    state = {
        sortPrice: {
            isOnPrice: false,
            sortByPrice: 'up'
        },
        sortType: {
            isOnType: false,
            sortByType: 'up'
        }
    }


    componentDidMount() {
        const filter = {
            type: 'host',
            _id: this.props.user._id
        }
        this.props.onLoadOrders(filter)
    }

    milisecToDate = (property, order) => {
        return new Date(order[property]).toLocaleString('en-IL', { year: "numeric", month: 'short', day: 'numeric' }) || ''

    }

    updateStatusOrder = async (order, value) => {
        order.status = value;
        await this.props.onUpdateStatusOrder(order)
        this.props.onCalcDetails()
        if (value === 'Approved') socketService.emit('on-approve-order', order.buyer._id)
    }

    render() {
        const { isOnPrice } = this.state.sortPrice
        const { isOnType } = this.state.sortType
        const { orders } = this.props
        if (!orders.length) return (
            <div className="orders-blank flex align-center justify-center">
                <h1>There are no incoming orders</h1>
            </div>

        )
        return (
            <table className='host-list'>
                <thead>
                    <tr>
                        <th>Guest Name</th>
                        <th>Property Name</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.reverse().map((order, idx) => <HostOrderPreview key={idx} updateStatusOrder={this.updateStatusOrder} milisecToDate={this.milisecToDate} order={order} />)
                    }
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(state) {
    return {
        orders: state.orderReducer.orders,
        user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    onLoadOrders,
    onUpdateStatusOrder
}
export const HostOrder = connect(mapStateToProps, mapDispatchToProps)(_HostOrder)
