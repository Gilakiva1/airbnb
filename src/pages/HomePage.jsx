import React from "react";
import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { loadStays } from '../store/stay.action'
import imgTelAviv from '../assets/img/home-page/tel-aviv-yafo.jpg'
import imgLondon from '../assets/img/home-page/london.jpg'
import imgParis from '../assets/img/home-page/paris.jpg'
import imgAmsterdam from '../assets/img/home-page/amsterdam.jpg'
import imgDubai from '../assets/img/home-page/dubai.jpg'
import imgNewYork from '../assets/img/home-page/new york.jpg'
import imgHongKong from '../assets/img/home-page/hong kong.jpg'
import imgBangkok from '../assets/img/home-page/bangkok.jpg'
import imgOutdoor from '../assets/img/home-page/outdoor.jpg'
import imgPets from '../assets/img/home-page/pets.jpg'
import imgUnique from '../assets/img/home-page/unique.jpg'
import imgHome from '../assets/img/home-page/home.jpg'
import imgHost from '../assets/img/home-page/host.jpg'
import imgHero from '../assets/img/hero-cut.jpg'
import { PopularImgList } from "../cmps/home-page/PopularImgList";
import { AmenitiesImgList } from "../cmps/home-page/AmenitiesImgList"

class _HomePage extends React.Component {
    state = {}

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
    amenities = [
        { value: 'outdoor', label: 'Outdoor getaways', img: imgOutdoor },
        { value: 'unique', label: 'Unique Stays', img: imgUnique },
        { value: 'home', label: 'Entires homes', img: imgHome },
        { value: 'pets', label: 'Pets Allowd', img: imgPets }
    ] 
    render() {

        return <>
            <div className="hero-logo full">
                <img src={imgHero} />
            </div>
            <section className="home-page">
                <h1 className="title-popular fs30">Popular Destinations</h1>
                <PopularImgList links={this.PopularDestinations} />
                <h1 className="title-labels ">Live Anywhere</h1>
                <AmenitiesImgList links={this.amenities} />
                <Link to='/host'>
                    <div className="host-container ">
                        <img className="round-edge" src={imgHost} />
                        <div className="host-info flex column justify-center align-center">
                            <h1 className="info-first wide">Try hosting</h1>
                            <p className="info-seconde">Earn extra income and unlock new opportunities by sharing your space.</p>
                            <button className="host-btn flex round-edge">Learn more</button>
                        </div>
                    </div>
                </Link>

            </section>
        </>
    }
}

const mapStateToProps = state => {
    return {
        stays: state.stayReducer.stays
    }
}

const mapDispatchToProps = {
    loadStays

}
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)