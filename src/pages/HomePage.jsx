import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
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

class _HomePage extends React.Component {
    state = {}

    render() {

        return <>
            <section className="hero-logo full">
                <img className="img-logo" src={HeroLogo} alt="" />
            </section>
            <section className="home-page">
                <h1 className="title-popular">popular destinations</h1>
                <div className="popular-img">


                    <Link className="link flex" to='/stay/tel-aviv'><img className="popular link-1" src={imgTelAviv} alt="" />
                        <div className="popular-txt  ">
                            <h3 className="city">tel Aviv</h3>
                            <h4 className="country">israel</h4>
                        </div>
                    </Link>
                    <Link className="link flex" to='/stay/london'><img className="popular link-1" src={imgLondon} alt="" />
                        <div className="popular-txt">
                            <h3 className="city">london</h3>
                            <h4 className="country">England</h4>
                        </div></Link>
                    <Link className="link flex" to='/stay/bangkok'><img className="popular link-1" src={imgBangkok} alt="" />
                        <div className="popular-txt">
                            <h3 className="city">Bangkok</h3>
                            <h4 className="country">Thailan</h4>
                        </div>
                    </Link>
                    <Link className="link flex" to='/stay/paris'><img className="popular link-1" src={imgParis} alt="" />
                        <div className="popular-txt">
                            <h3 className="city">New-York</h3>
                            <h4 className="country">United States of America</h4>
                        </div></Link>
                    <Link className="link flex" to='/stay/dubai'><img className="popular link-1" src={imgDubai} alt="" />
                        <div className="popular-txt">
                            <h3 className="city">Dubai</h3>
                            <h4 className="country">United Arab Emirates</h4>
                        </div></Link>
                    <Link className="link flex" to='/stay/new-york'><img className="popular link-1" src={imgNewYork} alt="" />
                        <div className="popular-txt">
                            <h3 className="city">New-York</h3>
                            <h4 className="country">United States of America</h4>
                        </div></Link>
                    <Link className="link flex" to='/stay/amsterdam'><img className="popular link-1" src={imgAmsterdam} alt="" />
                        <div className="popular-txt">
                            <h3 className="city">Amsterdam</h3>
                            <h4 className="country">Netherlands</h4>
                        </div></Link>
                    <Link className="link flex" to='/stay/hong-kong'><img className="popular link-1" src={imgHongKong} alt="" />
                        <div className="popular-txt">
                            <h3 className="city">HongKong</h3>
                            <h4 className="country">China</h4>
                        </div></Link>
                </div>
                <div className="extra-img"></div>
                <h1 className="title-popular">explore anywhere!</h1>
                <div className="destinations-img ">
                    <Link to='/stay/outdoor'><img className="destination link-1" src={imgOutdoor} alt="" />
                        <h3 className="txt-link">Outdoor getaways</h3>
                    </Link>
                    <Link to='/stay/unique'> <img className="destination link-2" src={imgUnique} alt="" />
                        <h3 className="txt-link">Unique Stays</h3>
                    </Link>
                    <Link to='/stay/home'><img className="destination link-3" src={imgHome} alt="" />
                        <h3 className="txt-link">Entires homes</h3>

                    </Link>
                    <Link to='/stay/pets'><img className="destination link-4" src={imgPets} alt="" />
                        <h3 className="txt-link">Pets Allowd</h3></Link>
                </div>
                <Link to='/host'><img className="host-img" alt="" src={imgHost} /></Link>
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
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withRouter(_HomePage))