import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { loadStays } from '../store/stay.action'
import { StayListHome } from "../cmps/StayListHome";
import HeroLogo from '../assets/img/hero.png';
import imgLisbon from '../assets/img/img-home/lisbon.jpg'
import imgTelAviv from '../assets/img/img-home/tel-aviv.jpg'
import imgMadrid from '../assets/img/img-home/madrid.jpg'
import imgLondon from '../assets/img/img-home/london.jpg'
class _HomePage extends React.Component {
    state = {

    }

    componentDidMount() {
        this.props.loadStays()
        // in backend get 8 only for popular!
    }

    render() {
        const { stays, location } = this.props
        if (!stays) return <h1>loading</h1>

        return <>
            <section className="hero-logo full">
                <img className="img-logo" src={HeroLogo} alt="" />
            </section>
            <section className="home-page">
                <h1 className="title-popular">popular destinations</h1>
                <div className="destinations">
                    <StayListHome stays={stays} location={location} />
                </div>
                <div className="destinations-extra"></div>
                <h1 className="title-popular">explore anywhere!</h1>
                <div className="destinations-img ">
                    <Link to='/stay/tel-aviv'><img className="destination link-1" src={imgTelAviv} alt="" /></Link>
                    <Link to='/stay/lisbon'> <img className="destination link-2" src={imgLisbon} alt="" /></Link>
                    <Link to='/stay/madrid'><img className="destination link-3" src={imgMadrid} alt="" /></Link>
                    <Link to='/stay/london'><img className="destination link-4" src={imgLondon} alt="" /></Link>
                </div>
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