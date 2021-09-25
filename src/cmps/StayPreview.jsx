
export function StayPreview({ stay, location }) {
    if (location.pathname === '/') {
        return (
            < li className="stay-container" >
                <div className="primary-image">
                    <img className="popular-img" src={stay.imgUrls[0]} />
                </div>
                <h1 className="title-location">{stay.loc.address.split(',')[0]}</h1>
                <h1 className="title-location">{stay.loc.country}</h1>
            </li>

        )

    } else {
        return (
            <li className="stay-container">
                <div className="primary-image">
                    <img src={stay.imgUrls[0]} />
                </div>
                <div>
                    <h1>Entire residentail {stay.type} in {stay.loc.address}</h1>
                    <h1>{stay.name}</h1>
                    <h2>capacity {stay.capacity}</h2>
                    <h1>{stay.loc.address}</h1>
                    <h1>Reviews {stay.reviews.length}</h1>
                </div>
            </li>
        )
    }
}


