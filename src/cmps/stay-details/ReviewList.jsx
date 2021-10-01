import { ReviewPreview } from "./ReviewPreview"

export function ReviewList({ reviews }) {
    return (
        <ul className="review-list">
            {reviews.map((review, idx) => <ReviewPreview key={idx} review={review} />)}
        </ul>
    )

}
