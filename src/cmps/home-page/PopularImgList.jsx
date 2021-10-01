import { PopularImgPreview } from './PopularImgPreview'
export function PopularImgList({links, onSubmit }) {
    return (
        <ul className="popular-img-list">
            {links.map((link, idx) => <PopularImgPreview key={idx} link={link} idx={idx} onSubmit={onSubmit} />)}
        </ul>

    )


}