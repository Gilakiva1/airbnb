import { LabelsImgPreview } from "./LabelsImgPreview"

export function LabelsImgList({ onSubmit, links }) {
    return (
        <ul className="labels-img-list">
            {links.map((link, idx) => <LabelsImgPreview key={idx} link={link} idx={idx} onSubmit={onSubmit} />)}
        </ul>
    )

}