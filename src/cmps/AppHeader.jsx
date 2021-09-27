// import React from 'react'

import { NavLink } from "react-router-dom";

import { LogoSvg } from "../assets/img/home-page/LogoSvg";
import { SearchBar } from "./SearchBar";



export function AppHeader() {

    // const showHomePage = () => {
    //     // this.props.
    // }

    return (
        <>
            <header className="header-container main-container">
                <div className="header-func flex">
                    <div className="logo-container flex align-center">

                      <LogoSvg/>
                        <h3>Airbnb</h3>
                    </div>
                    <div className="nav-header">
                        <div className="nav-header flex align-center">
                            <NavLink className="link-host" to={`/`} >switch to hosting</NavLink>
                            <button>=</button>
                        </div>
                    </div>
                </div>
                <div><SearchBar /></div>
            </header>

        </>
    )
}