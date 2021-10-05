import { Component } from 'react';
import { connect } from 'react-redux'
import { onLoadOrders } from '../../store/order.action'
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

    async componentDidMount() {
        await this.props.onLoadOrders({ idHost: '51392291' })
    }

    milisecToDate = (property, order) => {
        console.log(order.buyer, property);
        let temp = new Date(order[property] ).toLocaleString('en-IL', { year: "numeric", month: 'short', day: 'numeric' }) || ''
       
        console.log( new Date(temp).toUTCString());
        return temp
    }

    render() {
        const { isOnPrice } = this.state.sortPrice
        const { isOnType } = this.state.sortType
        const { orders } = this.props
        console.log('orders', orders);
        if (!orders.length) return <div>Loading</div>
        return (
            <table className='host-list'>
                <thead>
                    <tr>
                        <th>Guest Name</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map(order => (

                            // <img src={order.imgUrls[0]} />
                            <tr key={order._id}>
                                <td className='bold flex'>{order.buyer.fullname}</td>
                                <td>{this.milisecToDate('checkIn', order)}</td>
                                <td>{this.milisecToDate('checkOut', order)}</td>
                                <td>{order.status}</td>
                                <td>${order.price}</td>
                                <td>Actions</td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(state) {
    return {
        orders: state.orderReducer.orders,
    }
}
const mapDispatchToProps = {
    onLoadOrders
}
export const HostOrder = connect(mapStateToProps, mapDispatchToProps)(_HostOrder)
