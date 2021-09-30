import { Link } from "react-router-dom";
import { SimpleSlider } from "./SliderImg";



export function StayPreview({ stay }) {


    return (
        <Link className="link-detail" to={`/stay/${stay._id}`}>
            <div className="stay-container">
                <SimpleSlider stay={stay} />
            <h2>Entire residentail {stay.type} in {stay.loc.address}</h2>
            </div>
        </Link>
    )
}


