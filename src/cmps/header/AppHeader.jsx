// import React from 'react'
// import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { LogoSvg } from "../../assets/img/home-page/LogoSvg"
import imgUser from '../../assets/img/home-page/user.jpg'
import { SearchBar } from "./SearchBar";

class _AppHeader extends React.Component {

    state = {}

    render() {
        const { pathname } = this.props.history.location
        return (
            <header className={`${pathname === '/' ? 'fixed' : 'sticky'} header-container main-container`}>
                <div className="header-func flex">
                    <div className="logo-container flex align-center">
                        <LogoSvg />
                        <h3>Home<span style={{ color: "rgb(255, 56, 92)" }}>away</span></h3>
                    </div>
                    <nav className="nav-header">
                        <div className="nav-header flex align-center">
                            <NavLink className="link-host fs14" to={`/`} >switch to hosting</NavLink>
                            <NavLink className="link-host fs14" to={`/`} >explore</NavLink>
                            <div className="menu-container ">
                                    <button className="menu-btn flex align-center">
                                        <div className="menu-details flex align-center">
                                            <FontAwesomeIcon className="hamburger-menu" icon={faBars} />
                                            <img src={imgUser} alt="" className="user-img" />
                                        </div>
                                    </button>
                            </div>

                        </div>
                    </nav>
                </div>
                <div><SearchBar /></div>
            </header>

        )
    }
}
const mapStateToProps = state => {
    return {
        state
    }
}

export const AppHeader = connect(mapStateToProps)(withRouter(_AppHeader))