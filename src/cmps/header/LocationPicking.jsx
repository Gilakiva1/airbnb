import React from 'react'
import imgTelAviv from '../assets/img/home-page/tel-aviv-yafo.jpg'
import imgLondon from '../assets/img/home-page/london.jpg'
import imgParis from '../assets/img/home-page/paris.jpg'
import imgAmsterdam from '../assets/img/home-page/amsterdam.jpg'
import imgDubai from '../assets/img/home-page/dubai.jpg'
import imgNewYork from '../assets/img/home-page/new york.jpg'
import imgHongKong from '../assets/img/home-page/hong kong.jpg'
import imgBangkok from '../assets/img/home-page/bangkok.jpg'
import { PopularImgPreview } from '../home-page/PopularImgPreview'

export class LocationPicking extends React.Component {
    


    PopularDestinations = [
        { city: 'Tel aviv', country: 'Israel', img: imgTelAviv, },
        { city: 'London', country: 'England', img: imgLondon },
        { city: 'Bangkok', country: 'Thailand', img: imgBangkok },
        { city: 'Paris', country: 'France', img: imgParis },
        { city: 'Dubai', country: 'United Arab Emirates', img: imgDubai },
        { city: 'new york', country: 'United States of America', img: imgNewYork },
        { city: 'Amsterdam', country: 'Netherlands', img: imgAmsterdam },
        { city: 'Hong-kong', country: 'China', img: imgHongKong }
    ]




    render() {

        return (
            <div>
                 <ul className="popular-img-list">
                {PopularDestinations.map((location, idx) => <PopularImgPreview key={idx} link={location} idx={idx} />)}
            </ul>

            </div>
        )
    }
}