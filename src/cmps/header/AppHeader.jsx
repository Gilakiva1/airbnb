// import React from 'react'
// import { connect } from 'react-redux';
import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { LogoSvg } from "../../assets/img/home-page/LogoSvg"
import imgUser from '../../assets/img/home-page/user.jpg'
import { SearchBar } from "./SearchBar";

export class AppHeader extends React.Component {

    state = {}

    render() {
        return (
            <header className="header-container main-container">
                <div className="header-func flex">
                    <div className="logo-container flex align-center">
                        <LogoSvg />
                        <h3>Airbnb</h3>
                    </div>
                    <div className="nav-header">
                        <div className="nav-header flex align-center">
                            <NavLink className="link-host fs14" to={`/`} >switch to hosting</NavLink>
                            <Link to="/host">
                                <div className="menu-container flex align-center">
                                    <FontAwesomeIcon className="hamburger-menu" icon={faBars} />
                                    <img src={imgUser} alt="" className="user-img" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div><SearchBar /></div>
            </header>

        )
    }
}
// const mapStateToProps = state => {
//     return {
//         user: state.userReducer.user
//     }


// }

// export const AppHeader = connect(mapStateToProps)(_AppHeader)