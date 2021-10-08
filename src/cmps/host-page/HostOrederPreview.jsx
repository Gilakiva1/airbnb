


export function HostOrderPreview({ order, milisecToDate, updateStatusOrder }) {

    return (
        // <img src={order.imgUrls[0]} />
        <tr key={order._id}>
            <td className='buyer bold flex'><img src={order.buyer.imgUrl} /> {order.buyer.fullname}</td>
            <td>{order.stay.name}</td>
            <td>{milisecToDate('checkIn', order)}</td>
            <td>{milisecToDate('checkOut', order)}</td>
            <td>{order.status}</td>
            <td>${order.price}</td>
            <td className='action'>
                {order.status === 'Pending' && <button onClick={() => { updateStatusOrder(order, 'Approved') }}>Approve</button>}
                {order.status === 'Approved' && <button onClick={() => { updateStatusOrder(order, 'Declined') }}>Decline</button>}
                {order.status === 'Declined' && <button onClick={() => { updateStatusOrder(order, 'Approved') }}>Re-Approve</button>}
            </td>
        </tr>


    )
}