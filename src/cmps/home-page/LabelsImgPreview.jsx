import { Link } from "react-router-dom"
export function LabelsImgPreview({ link, idx }) {
    return (
        <Link className="link-labels" to={`/stay?labels=${link.value}`}>
            <li className="label-img">
                <img className={`labels-img round-edge link-${idx}`} src={link.img} alt="" />
                <h3 className="label-txt">{link.labels}</h3>
            </li>
        </Link>
    )

}
