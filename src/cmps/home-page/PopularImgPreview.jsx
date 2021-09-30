import { Link } from "react-router-dom"
import { utilService } from "../../services/util.service"

export function PopularImgPreview({ link, idx }) {
    // const queryString = utilService.makeQueryParams(criteria)
    return ( 

        <Link  className="popular-list flex" to={`/stay?address=${link.city}`}><img className={`popular-img round-edge link-${idx}`} src={link.img} alt="" />
            <div className="popular-txt fs16  flex column justify-center wide ">
                <h3 className="city">{link.city}</h3>
                <h4 className="country">{link.country}</h4>
            </div>
        </Link>
    )
 
}
