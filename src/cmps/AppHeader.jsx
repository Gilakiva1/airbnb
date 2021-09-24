// import React from 'react'

import { NavLink } from "react-router-dom";
import ReactLogo from '../assets/img/logo.svg';
import HeroLogo from '../assets/img/hero.png';



export function AppHeader() {
    return (
        <>

            <header className="header-container">
                <div className="logo-container">
                    <img className="logo" src={ReactLogo} alt="" />
                    <h3>Airbnb</h3>
                </div>
                <input className='header-search' type="search" />
                <div className="nav-header">
                    <NavLink to={`/stay`} >Become a host</NavLink>
                    <button>=</button>
                </div>
            </header>
            <div className="main-container">
                <img className="hero-logo full" src={HeroLogo} />
            </div>
        </>
    )
}