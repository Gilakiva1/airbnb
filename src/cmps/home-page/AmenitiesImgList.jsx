import { AmenitiesImgPreview } from "./AmenitiesImgPreview"

export function AmenitiesImgList({ links }) {
    return (
        <ul className="amenities-img-list">
            {links.map((link, idx) => <AmenitiesImgPreview key={idx} link={link} idx={idx} />)}
        </ul>
    )

}