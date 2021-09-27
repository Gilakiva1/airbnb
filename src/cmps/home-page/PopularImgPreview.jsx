import { Link } from "react-router-dom"
export function PopularImgPreview({ link, idx }) {
    return (
        <Link className="labels-img flex" to={`/stay/${link.city}`}><img className={`popular-img round-edge link-${idx}`} src={link.img} alt="" />
            <div className="popular-txt">
                <h3 className="city">{link.city}</h3>
                <h4 className="country">{link.country}</h4>
            </div>
        </Link>
    )

}
