
import { Link } from "react-router-dom"
import { utilService } from "../../services/util.service"
export function TripPreview({ order }) {
    // const queryString = utilService.makeQueryParams(order)


    return (
       
            <li className={`trip-preview ${order._id}`}>
                 <Link to={`/stay/${order.stay._id}`}><div className="trip-img"><img src={order.img} /></div> </Link>
                <div className="trip-details fh32 ">
                    <div className="dates flex gap5">
                        <h2 className="trip-checkIn fs12 book clr1 fw-unset">{new Date(order.startDate).toLocaleString('en-IL', { year: "numeric", month: 'short', day: 'numeric' }) || ''}</h2><span> - </span>
                        <h2 className="trip-checkOut fs12 book clr1 fw-unset">{new Date(order.endDate).toLocaleString('en-IL', { year: "numeric", month: 'short', day: 'numeric' }) || ''}</h2>
                    </div>
                    <h1 className="trip-address medium fs22 fw-unset">{order.stay.address}</h1>
                    <h3 className="trip-price">Total Price: {order.price}</h3>
                </div>
            </li>

       
    )

}