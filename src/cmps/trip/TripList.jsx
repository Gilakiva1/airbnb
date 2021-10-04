import { TripPreview } from "./TripPreview"

export function TripList({ orders }) {
    console.log('orders',orders);

    return (
        <ul className="trip-list">
            {orders.map((order, idx) => <TripPreview order={order} key={idx}  />)}
        </ul>
    )

}