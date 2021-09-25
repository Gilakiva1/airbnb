import { StayPreview } from "./StayPreview";

export function StayListHome({ stays, location }) {
    return (
        <ul className="stay-list home">
            {stays.map(stay => <StayPreview key={stay._id} stay={stay} location={location} />)}
        </ul>
    )

}