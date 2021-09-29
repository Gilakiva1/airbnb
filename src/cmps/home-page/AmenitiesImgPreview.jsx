import { Link } from "react-router-dom"
export function AmenitiesImgPreview({ link, idx }) {
    return (
        <Link className="link-amenities" to={`/stay?amenities=${link.value}`}>
            <li className="amenitie-img">
                <img className={`amenities-img round-edge link-${idx}`} src={link.img} alt="" />
                <h3 className="amenitie-txt">{link.amenities}</h3>
            </li>
        </Link>
    )

}
