


export function HostOrderPreview({ order, milisecToDate, updateStatusOrder }) {

    return (
        // <img src={order.imgUrls[0]} />
        <tr key={order._id}>
            <td className='bold flex'>{order.buyer.fullname}</td>
            <td>{milisecToDate('checkIn', order)}</td>
            <td>{milisecToDate('checkOut', order)}</td>
            <td>{order.status}</td>
            <td>${order.price}</td>
            <td>
                {order.status === 'Pending' && <button onClick={() => { updateStatusOrder(order, 'Approved') }}>✓ Approve</button>}
                {order.status === 'Approved' && <button onClick={() => { updateStatusOrder(order, 'Declined') }}>🗙 Decline</button>}
                {order.status === 'Declined' && <button onClick={() => { updateStatusOrder(order, 'Approved') }}>✓ Re-Approve</button>}
            </td>
        </tr>


    )
}