import { TripPreview } from "./TripPreview"

export function TripList({ orders, onSetOrder }) {

    return (
        <ul className="trip-list">
            {orders.map((order, idx) => <TripPreview order={order} onSetOrder={onSetOrder} key={idx} />)}
        </ul>
    )

}