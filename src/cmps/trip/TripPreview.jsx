
import { Link } from "react-router-dom"
import { utilService } from "../../services/util.service"
export function TripPreview({ order, onSetOrder }) {
    console.log(order);
    let totalGuests = 0

    for (const key in order.guests) {
        totalGuests += order.guests[key]
    }

    const stayId = order.stay._id
    const queryString = utilService.makeQueryParams(order)

    return (

        <li className={`trip-preview ${order._id}`}>
            <Link onClick={() => onSetOrder(order)} to={`/stay/${stayId}?${queryString}`}><div className="trip-img"><img src={order.img} /></div> </Link>
            <div className="trip-details fh32 ">
                <div className="dates flex gap5">
                    <h2 className="trip-checkIn fs12 book clr1 fw-unset">{new Date(order.checkIn).toLocaleString('en-IL', { year: "numeric", month: 'short', day: 'numeric' }) || ''}</h2><span> - </span>
                    <h2 className="trip-checkOut fs12 book clr1 fw-unset">{new Date(order.checkOut).toLocaleString('en-IL', { year: "numeric", month: 'short', day: 'numeric' }) || ''}</h2>
                </div>
                <h1 className="trip-address medium fs22 fw-unset">{order.stay.address}</h1>
                <h3 className="trip-guests">Guests:{totalGuests}</h3>
                <h3 className="trip-price">Total Price: {order.price}</h3>
                <div className="update-trip">
                    <button className="btn-cancel-trip">cancel</button>
                    <button className="btn-cancel-trip">edit</button>
                </div>
            </div>
        </li>


    )

}