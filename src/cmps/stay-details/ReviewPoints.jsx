export function ReviewPoints({ reviews }) {

  let ratePonits = {
    cleanliness: 0,
    communication: 0,
    checkin: 0,
    accuracy: 0,
    value: 0,
    location: 0,
  }
  return (<div className="reviews-points-container">
      {reviews.map(review => {
        const { rate } = review
        for (const [key, value] of Object.entries(rate)) {
          ratePonits[key] += value
        }
      })}

      <div className="flex space-between">
        <p>Cleanliness</p>
        <div className="flex full-bar align-center">
          <div className="review-point-bar">
            <div style={{ width: `${ratePonits.cleanliness / reviews.length / 5 * 100}%` }} className="review-point-inner-bar"></div>
          </div>{ratePonits.cleanliness / reviews.length}
        </div>
      </div>
      <div className="flex space-between">
        <p>Communication</p>
        <div className="flex full-bar align-center">
          <div className="review-point-bar">
            <div style={{ width: `${ratePonits.communication / reviews.length / 5 * 100}%` }} className="review-point-inner-bar"></div>
          </div>{ratePonits.communication / reviews.length}
        </div>
      </div>
      <div className="flex space-between">
        <p>Check-in</p>
        <div className="flex full-bar align-center">
          <div className="review-point-bar">
            <div style={{ width: `${ratePonits.checkin / reviews.length / 5 * 100}%` }} className="review-point-inner-bar"></div>
          </div>{ratePonits.checkin / reviews.length}
        </div>
      </div>
      <div className="flex space-between">
        <p>Accuracy</p>
        <div className="flex full-bar align-center">
          <div className="review-point-bar">
            <div style={{ width: `${ratePonits.accuracy / reviews.lengt / 5 * 100} % ` }} className="review-point-inner-bar"></div>
          </div>{ratePonits.accuracy / reviews.length}
        </div>
      </div>
      <div className="flex space-between">
        <p>Location</p>
        <div className="flex full-bar align-center">
          <div className="review-point-bar">
            <div style={{ width: `${ratePonits.location / reviews.length / 5 * 100}%` }} className="review-point-inner-bar"></div>
          </div>{ratePonits.location / reviews.length}</div>
      </div>
      <div className="flex space-between">
        <p>Value</p>
        <div className="flex full-bar align-center"><div className="review-point-bar">
          <div style={{ width: `${ratePonits.location / reviews.length / 5 * 100}%` }} className="review-point-inner-bar"></div>
        </div>{ratePonits.value / reviews.length}
        </div>
      </div>
  </div>
  )
}