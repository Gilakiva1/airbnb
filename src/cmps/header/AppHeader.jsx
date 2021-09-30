// import React from 'react'
// import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { LogoSvg } from "../svgs/LogoSvg"
import imgUser from '../../assets/img/home-page/user.jpg'
import { SearchBar } from "./SearchBar";
import { MiniSearchBar } from './MiniSearchBar';

class _AppHeader extends React.Component {

    state = {
        scrollLoc: 0,
        isEnter: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onToggleHeader)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.history.location.pathname !== '/') {
            window.removeEventListener('scroll', this.onToggleHeader)
        } else {
            window.addEventListener('scroll', this.onToggleHeader)
        }
    }

    onToggleHeader = (ev) => {
        const { pathname } = this.props.history.location
        const scrollLocaion = ev.path[1].pageYOffset
        if (scrollLocaion < 40 && pathname === '/' ) {
            this.setState({ isEnter: true })
        }
        this.setState({ scrollLoc: scrollLocaion })
    }

    backToHome = () => {
        if (this.props.history.location.pathname !== '/') {
            this.props.history.push('/')
        } else {
            document.documentElement.scrollTop = 0
        }
    }

    render() {
        const { scrollLoc, isEnter } = this.state
        const { pathname } = this.props.history.location

        return (
            <header className={`${scrollLoc > 40 ? 'white' : ''} ${pathname === '/' ? 'fixed ' : 'sticky-color'} header-container main-container`}>
                <div className="header-func flex">
                    <div className="logo-container flex align-center" onClick={this.backToHome}>
                        <button className="btn-logo"><LogoSvg className={`${(pathname === '/' && scrollLoc > 40) || pathname !== '/' ? 'logo-pink' : 'logo-white'} `} /></button>
                        <h3 className={`logo-txt ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-pink'}`}>Home Away</h3>
                    </div>
                    {scrollLoc > 40 && pathname === '/' && <MiniSearchBar />}

                    {pathname !== '/' && <MiniSearchBar />}
                    <nav className="nav-header">
                        <div className="nav-header flex align-center">
                            <NavLink className={`link-host border-round fs14 ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-black hover-bcg'}`} to={`/ `} >Explore</NavLink>
                            <NavLink className={`link-host border-round fs14 ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-black hover-bcg'}`} to={`/ `} >Become a host</NavLink>
                            <div className="menu-container border-round">
                                <button className="menu-btn border-round flex align-center">
                                    <div className="menu-details flex align-center">
                                        <FontAwesomeIcon className="hamburger-menu" icon={faBars} />
                                        <img src={imgUser} alt="" className="user-img border-round" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
                {scrollLoc < 40 && pathname === '/' && <SearchBar animateClassName={isEnter ? 'scale-up-top' : ''} />}
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