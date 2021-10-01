export function ReviewPreview({ review }) {

    return (
        <div className="review-preview">
            <div className="flex gap5">
                <img className="user-profile-img" src={review.imgUrl} alt="" />
                <div className="flex column">
                    <p>  <span className="user-name">{review.by.fullname}</span> <br />
                        <span className="fade-font">{review.date}</span> </p>
                </div>
            </div>
            <p>{review.by.desc}</p>
        </div >
    )
}
