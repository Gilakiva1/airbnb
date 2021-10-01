import { Kitchen } from "../svgs/Kitchen"


export function Amenities({ amenity}) {
    switch (amenity) {
        case 'kitchen':
            return <div className="amenity-container flex">
                <Kitchen />
                <div className="flex column">
                    <p>  <span className="amenity-header">{`Entire ${type}`}</span> <br />
                        <span className="fade-font"> {`You'll have the entire ${type} to yourself.`}</span></p>
                </div>
            </div>
        case 'enhanced clean':
            return <div className="amenity-container flex">
                <EnhancedClean />
                <div className="amenity-santences flex column">
                    <p>  <span className="amenity-header">Enhanced Clean</span> <br />
                        <span className="fade-font">The host committed to Homeaway's 5-step enhanced cleaning process.</span> </p>
                </div>
            </div>
        case 'self check-in':
            return <div className="amenity-container flex">
                <SelfCheckIn />
                <div className="flex column">
                    <p> <span className="amenity-header">Self Check-in</span> <br />
                        <span className="fade-font"> Check yourself in with the key safe.</span></p>
                </div>
            </div>
        case 'free cancellation':
            return <div className="amenity-container flex">
                <FreeCancel />
                <div className="flex column">
                    <span className="amenity-header">Free cancellation up to 48 hours before the check-in.</span>
                </div>
            </div>
        case 'great check-in':
            return <div className="amenity-container flex">
                <GreatCheckin />
                <div className="flex column">
                    <p> <span className="amenity-header">Great Check-in experience</span> <br />
                        <span className="fade-font">95% of recent guests gave the check-in process a 5-star rating.</span></p>
                </div>
            </div>
        case 'wifi':
            return <div className="amenity-container flex">
                <WiFi />
                <div className="flex column">
                    <p> <span className="amenity-header">Wi-Fi</span> <br />
                        <span className="fade-font">Guests often search for this popular amenity.</span></p>
                </div>
            </div>
    }
}