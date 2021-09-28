import { Link } from "react-router-dom"
export function LabelsImgPreview({ link, idx }) {
    return (
        <Link className="link-label" to={`/stay/?label=${link.value}`}>
            <li className="popular-txt">
                <img className={`label-img round-edge link-${idx}`} src={link.img} alt="" />
                <h3 className="txt-label">{link.label}</h3>
            </li>
        </Link>
    )

}
