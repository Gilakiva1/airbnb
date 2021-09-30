import { Link } from "react-router-dom";
import React from "react";
import { connect } from 'react-redux';
import imgHost from '../assets/img/home-page/host.jpg'
import imgHero from '../assets/img/hero-cut.jpg'
import { PopularImgList } from "../cmps/home-page/PopularImgList";
import { LabelsImgList } from "../cmps/home-page/LabelsImgList"
import { utilService } from "../services/util.service";
import { onSetOrder } from "../store/order.action";



class _HomePage extends React.Component {

    onSubmit = (order) => {
        this.props.onSetOrder(order)
    }

    render() {

        return <>
            <div className="hero-logo full">
                <img src={imgHero} />
            </div >
            <section className="home-page">
                <h1 className="title-popular fs30">Popular Destinations</h1>
                <PopularImgList onSubmit={this.onSubmit} links={utilService.HomePageImgPopular()} />
                <h1 className="title-label">Live Anywhere</h1>
                <LabelsImgList onSubmit={this.onSubmit} links={utilService.HomePageImgLabels()} />
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
    return state
}
const mapDispatchToProps = {
    onSetOrder
}
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)



