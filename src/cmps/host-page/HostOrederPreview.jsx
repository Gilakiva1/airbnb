


export function HostOrderPreview({ order, milisecToDate, updateStatusOrder, }) {
    return (
        <tr key={order._id}>
            <td className='buyer bold flex'>{window.innerWidth > 460 && <img src={order.buyer.imgUrl} alt="" />} {order.buyer.fullname}</td>
            <td>{order.stay.name}</td>
            <td>{milisecToDate('checkIn', order)}</td>
            <td>{milisecToDate('checkOut', order)}</td>
            <td>{order.status}</td>
            <td>${order.price}</td>
            <td className='action'>
                {order.status === 'Pending' && <button className="bold" onClick={() => { updateStatusOrder(order, 'Approved') }}>Approve</button>}
                {order.status === 'Approved' && <button className="bold" onClick={() => { updateStatusOrder(order, 'Declined') }}>Decline</button>}
                {order.status === 'Declined' && <button className="bold" onClick={() => { updateStatusOrder(order, 'Approved') }}>Re-Approve</button>}
            </td>
        </tr>


    )
}