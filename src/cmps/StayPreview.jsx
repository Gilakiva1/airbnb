
export function StayPreview({ stay }) {
   
        return (
            <li className="stay-container ">
                <div className="primary-image">
                    <img src={stay.imgUrls[0]} />
                </div>
                <div>
                    <h2>Entire residentail {stay.type} in {stay.loc.address}</h2>
                    <h1>{stay.name}</h1>
                    <h2>capacity {stay.capacity}</h2>
                    <h2>{stay.loc.address}</h2>
                    <div className="flex">
                        {stay.amenities.map(amenitie => {
                            return <h2>*{amenitie}</h2>
                        })}
                    </div>
                    <h2>Reviews {stay.reviews.length}</h2>
                </div>
            </li>
        )
    
}


