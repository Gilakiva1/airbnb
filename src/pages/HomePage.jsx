import { Link } from "react-router-dom";
import React from "react";
import imgHost from '../assets/img/home-page/host.jpg'
import imgHero from '../assets/img/hero-cut.jpg'
import { PopularImgList } from "../cmps/home-page/PopularImgList";
import { LabelsImgList } from "../cmps/home-page/LabelsImgList"
import { utilService } from "../services/util.service";



export function HomePage() {

    return <>
        <div className="hero-logo full">
            <img src={imgHero} />
        </div >
        <section className="home-page">
            <h1 className="title-popular fs30">Popular Destinations</h1>
            <PopularImgList links={utilService.HomePageImgPopular()} />
            <h1 className="title-label">Live Anywhere</h1>
            <LabelsImgList links={utilService.HomePageImgLabels()} />
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



