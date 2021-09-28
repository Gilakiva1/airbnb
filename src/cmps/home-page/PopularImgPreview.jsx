import { Link } from "react-router-dom"
export function PopularImgPreview({ link, idx }) {

  
    return (
        <Link className="popular-list flex" to={`/stay?city=${link.city}`}><img className={`popular-img round-edge link-${idx}`} src={link.img} alt="" />
            <div className="popular-txt fs16  flex column justify-center wide ">
                <h3 className="city">{link.city}</h3>
                <h4 className="country">{link.country}</h4>
            </div>
        </Link>
    )

}
