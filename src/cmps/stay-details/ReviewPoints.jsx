export function ReviewPoints() {
    return (<>
        <div className="flex space-between align-center">
            <p>Cleanliness</p>
            <div className="flex align-center gap10"><div className="review-point-bar"><div style={{ width: `${4.1 / 5 * 100}%` }} className="review-point-inner-bar"></div></div><span className="medium">4.1</span></div>
        </div>

        <div className="flex space-between align-center">
            <p>Communication</p>
            <div className="flex align-center gap10"><div className="review-point-bar"><div style={{ width: `${3.3 / 5 * 100}%` }} className="review-point-inner-bar"></div></div><span className="medium">3.3</span></div>
        </div>

        <div className="flex space-between align-center">
            <p>Check-in</p>
            <div className="flex align-center gap10"><div className="review-point-bar"><div style={{ width: `${4.5 / 5 * 100}%` }} className="review-point-inner-bar"></div></div><span className="medium">4.5</span></div>
        </div>

        <div className="flex space-between align-center">
            <p>Accuracy</p>
            <div className="flex align-center gap10"><div className="review-point-bar"><div style={{ width: `${3.2 / 5 * 100}%` }} className="review-point-inner-bar"></div></div><span className="medium">3.2</span></div>
        </div>

        <div className="flex space-between align-center">
            <p>Location</p>
            <div className="flex align-center gap10"><div className="review-point-bar"><div style={{ width: `${4.2 / 5 * 100}%` }} className="review-point-inner-bar"></div></div><span className="medium">4.2</span></div>
        </div>
        
        <div className="flex space-between align-center">
            <p>Value</p>
            <div className="flex align-center gap10"><div className="review-point-bar"><div style={{ width: `${4.7 / 5 * 100}%` }} className="review-point-inner-bar"></div></div><span className="medium"> 4.7</span></div>
        </div>
    </>
    )
}