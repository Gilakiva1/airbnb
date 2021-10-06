


export function HostOrderPreview(props) {

    return (
        // <img src={order.imgUrls[0]} />
        <tr key={props.order._id}>
            <td className='bold flex'>{props.order.buyer.fullname}</td>
            <td>{props.milisecToDate('checkIn', props.order)}</td>
            <td>{props.milisecToDate('checkOut', props.order)}</td>
            <td>{props.order.status}</td>
            <td>${props.order.price}</td>
            <td>
                {props.order.status === 'pending' && <button onClick={() => { props.updateStatusOrder(props.order, 'Approved') }}>✓ Approve</button>}
                {props.order.status === 'Approved' && <button onClick={() => { props.updateStatusOrder(props.order, 'Declined') }}>🗙 Decline</button>}
                {props.order.status === 'Declined' && <button onClick={() => { props.updateStatusOrder(props.order, 'Approved') }}>✓ Re-Approve</button>}

            </td>
        </tr>


    )
}