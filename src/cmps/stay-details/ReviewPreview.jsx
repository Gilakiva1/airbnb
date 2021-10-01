export function ReviewPreview({ review }) {

    return (
        <li className="review-preview">
            <div className="review-img"><img src={review.img} className="img" /></div>
            <h2 className="review-name">{review.by.fullname}</h2>
            <h2 className="review-date">{review.date}</h2>
            <h2 className="review-desc">{review.by.desc}</h2>
        </li>


    )

}
