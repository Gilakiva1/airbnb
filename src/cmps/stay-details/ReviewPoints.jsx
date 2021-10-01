export function ReviewPoints() {
  return (<>
  <div className="flex space-between">
<p>Cleanliness</p>
<div><div className="review-point-bar"><div style={{width:`${4/5*100}%`}} className="review-point-inner-bar"></div></div>4</div>
  </div>
  <div className="flex space-between">
<p>Communication</p>
<div><div className="review-point-bar"><div style={{width:`${3.3/5*100}%`}} className="review-point-inner-bar"></div></div>3.3</div>
  </div>
  <div className="flex space-between">
<p>Check-in</p>
<div><div className="review-point-bar"><div style={{width:`${4.5/5*100}%`}} className="review-point-inner-bar"></div></div>4.5</div>
  </div>
  <div className="flex space-between">
<p>Accuracy</p>
<div><div className="review-point-bar"><div style={{width:`${3/5*100}%`}} className="review-point-inner-bar"></div></div>3</div>
  </div>
  <div className="flex space-between">
<p>Location</p>
<div><div className="review-point-bar"><div style={{width:`${4/5*100}%`}} className="review-point-inner-bar"></div></div>4</div>
  </div>
  <div className="flex space-between">
<p>Value</p>
<div><div className="review-point-bar"><div style={{width:`${4.7/5*100}%`}} className="review-point-inner-bar"></div></div>4.7</div>
  </div>
  </>
  )
}