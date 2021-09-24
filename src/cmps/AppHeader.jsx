// import React from 'react'

import { NavLink } from "react-router-dom";
import HeroLogo from '../assets/img/hero.png';
import { ReactComponent as AirbnbLogo } from '../assets/img/airbnb_logo.svg';
import { SearchBar } from "./SearchBar";



export function AppHeader() {
    return (
        <>
            <section className="hero-logo ">
                <img src={HeroLogo} alt="" />
            </section>
            <header className="header-container main-container">
                <div className="header-func flex">
                    <div className="logo-container flex align-center">
                            <AirbnbLogo className="logo-img" fill='white' />
                        <h3>Airbnb</h3>
                    </div>
                    <input className='header-search' type="search" />
                    <div className="nav-header flex align-center">

                        <NavLink className="link-host" to={`/`} >switch to hosting</NavLink>
                        <button>=</button>
                    </div>
            </div>
        </header>
        <div><SearchBar/></div>
        <div className="main-container">

            </div>

        </>
    )
}