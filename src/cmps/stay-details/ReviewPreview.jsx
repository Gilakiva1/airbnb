export function ReviewPreview({ review }) {
    return (
        <div className="review-container">
            <div className="flex gap5">
                <img className="user-profile-img" src={imgUser} alt="" />
                <div className="flex column">
                    <p>  <span className="user-name">{review.by.fullname}</span> <br />
                        <span className="fade-font">{review.date}</span> </p>
                </div>
            </div>
<p>{review.txt}</p>
        </div >
    )
}