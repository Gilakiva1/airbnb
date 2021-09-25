// import React from 'react'

import { NavLink } from "react-router-dom";
import ReactLogo from '../assets/img/logo.svg';
import HeroLogo from '../assets/img/hero.png';
import { SearchBar } from "./SearchBar";



export function AppHeader() {
   
    return (
        <>
            <img className="hero-logo full" src={HeroLogo} />
            <header className="header-container main-container">
                <div className="header-func">
                    <div className="logo-container">
                        <img className="logo-img" src={ReactLogo} alt="" />
                        <h3>Airbnb</h3>
                    </div>
                    <div><SearchBar /></div>
                    <div className="nav-header">

                        <NavLink to={`/`} >Become a host</NavLink>
                        <button>=</button>
                    </div>
                </div>
            </header>
            <div className="main-container">

            </div>

        </>
    )
}