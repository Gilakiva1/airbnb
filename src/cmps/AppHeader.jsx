// import React from 'react'

import { NavLink } from "react-router-dom";

import { ReactComponent as AirbnbLogo } from '../assets/img/airbnb_logo.svg';
import { SearchBar } from "./SearchBar";



export function AppHeader() {
    return (
        <>
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
                {/* <SearchBar /> */}
            </header>
        </>
    )
}