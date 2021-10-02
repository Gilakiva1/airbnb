import { Link } from "react-router-dom";
import { SimpleSlider } from "./SliderImg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from "../services/util.service";
    
    
export function StayPreview({ stay, orderParams }) {
    const queryString = utilService.makeQueryParams(orderParams)

    return (
        <Link className="link-detail" to={`/stay/${stay._id}?${queryString}`}>
            <div className="stay-container">
                <SimpleSlider stay={stay} />
                <div className="flex column">
                    <h2 className="fs14 fh18 clr2 airbnb-book fw-unset"> {<FontAwesomeIcon className='star-icon' icon={faStar} />} {utilService.getRandomIntInclusive(3, 5)} <span className="clr1">({utilService.getRandomIntInclusive(30, 500)})</span></h2>
                    <h2 className="fs16 fh20 clr2 airbnb-book fw-unset">{stay.type} • {stay.loc.address}</h2>
                    <h2 className=" clr2 fs16 fh20  airbnb-book fw-unset">{stay.name}</h2>
                    <h2 className="fs16 fh20 clr2 airbnb-book fw-unset"><span className="airbnb-bold ">${stay.price}</span> / night</h2>
                </div>
            </div>
        </Link >
    )
}


