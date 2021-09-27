import { Link } from "react-router-dom";
import SimpleSlider from "./SliderImg.jsx";

export function StayPreview({ stay }) {
        const url = `/stay/${stay._id}`
        return (
            <Link className="link-detail" to={url}>
            <div className="stay-container ">
                <div className="primary-image">
                    {/* <img src={stay.imgUrls[0]} /> */}
                    <SimpleSlider stay={stay}/>
                </div>
                <div>
                    <h2>Entire residentail {stay.type} in {stay.loc.address}</h2>
                    <h1>{stay.name}</h1>
                    <h2>capacity {stay.capacity}</h2>
                    <h2>{stay.loc.address}</h2>
                    <div className="flex">
                        {stay.amenities.map(amenitie => {
                            return <h2>*{amenitie}</h2>
                        })}
                    </div>
                    <h2>Reviews {stay.reviews.length}</h2>
                </div>
            </div>
            </Link>
        )
    
}


