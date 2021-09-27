import React from "react";
import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { loadStays } from '../store/stay.action'
import HeroLogo from '../assets/img/hero.png';
import imgTelAviv from '../assets/img/img-home/tel-aviv-yafo.jpg'
import imgLondon from '../assets/img/img-home/london.jpg'
import imgParis from '../assets/img/img-home/paris.jpg'
import imgAmsterdam from '../assets/img/img-home/amsterdam.jpg'
import imgDubai from '../assets/img/img-home/dubai.jpg'
import imgNewYork from '../assets/img/img-home/new york.jpg'
import imgHongKong from '../assets/img/img-home/hong kong.jpg'
import imgBangkok from '../assets/img/img-home/bangkok.jpg'
import imgOutdoor from '../assets/img/img-home/outdoor.jpg'
import imgPets from '../assets/img/img-home/pets.jpg'
import imgUnique from '../assets/img/img-home/unique.jpg'
import imgHome from '../assets/img/img-home/home.jpg'
import imgHost from '../assets/img/img-home/host.jpg'
import { PopularImgList } from "../cmps/home-page/PopularImgList";
import { LabelsImgList } from "../cmps/home-page/LabelsImgList"

class _HomePage extends React.Component {
    state = {}

    componentDidMount() {
        console.log('params?', this.props.match.params);
        console.log('window', window.location);
    }
    onSetPopularDestinations = () => {
        return [
            { city: 'tel-aviv', country: 'Israel', img: imgTelAviv, },
            { city: 'london', country: 'England', img: imgLondon },
            { city: 'bangkok', country: 'Thailand', img: imgBangkok },
            { city: 'paris', country: 'France', img: imgParis },
            { city: 'dubai', country: 'United Arab Emirates', img: imgDubai },
            { city: 'new-york', country: 'United States of America', img: imgNewYork },
            { city: 'amsterdam', country: 'Netherlands', img: imgAmsterdam },
            { city: 'hong-kong', country: 'China', img: imgHongKong }
        ]
    }
    onSetLabelsDestinations = () => {
        return [
            { value: 'outdoor', label: 'Outdoor getaways', img: imgOutdoor },
            { value: 'unique', label: 'Unique Stays', img: imgUnique },
            { value: 'home', label: 'Entires homes', img: imgHome },
            { value: 'pet', label: 'Pets Allowd', img: imgPets }
        ]
    }

    render() {

        return <>
            <div className="hero-logo full">
                {/* <img className="img-logo" src={HeroLogo} alt="" /> */}
            </div>
            <section className="home-page">
                <h1 className="title-popular">Popular Destinations</h1>
                <PopularImgList links={this.onSetPopularDestinations()} />
                <h1 className="title-labels">Live Anywhere</h1>
                <LabelsImgList links={this.onSetLabelsDestinations()} />
                <Link to='/host'>
                    <div className="host-container ">
                        <img className="round-edge" src={imgHost} />
                        <div className="host-info flex column justify-center align-center  ">
                            <h1 className="info-first wide">Try Hosting</h1>
                            <span className="info-seconde">Earn extra income and unlock new opportunities by sharing your space.</span>
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