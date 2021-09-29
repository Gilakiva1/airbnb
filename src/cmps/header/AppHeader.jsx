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

    state = {
        scrollLoc: 0,

    }
    componentDidMount() {
        window.addEventListener('scroll', this.onToggleHeader)
    }

    componentDidUpdate() {
        this.props.history.location.pathname !== '/' ?
            window.removeEventListener('scroll', this.onToggleHeader) :
            window.addEventListener('scroll', this.onToggleHeader)

    }
    onToggleHeader = (ev) => {
        const scrollLocaion = ev.path[1].pageYOffset
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
        const { scrollLoc } = this.state
        const { pathname } = this.props.history.location

        return (
            <header className={`${scrollLoc > 40 ? 'white' : ''} ${pathname === '/' ? 'fixed ' : 'sticky-color'} header-container main-container`}>
                <div className="header-func flex">
                    <div className="logo-container flex align-center">
                        <button className="btn-logo" onClick={this.backToHome}><LogoSvg /></button>
                        <h3>Home<span style={{ color: "rgb(255, 56, 92)" }}>away</span></h3>
                    </div>
                    {scrollLoc > 30 && <SearchBar />}
                    <nav className="nav-header">
                        <div className="nav-header flex align-center">
                            <NavLink className="link-host border-round fs14" to={`/`} >switch to hosting</NavLink>
                            <NavLink className="link-host border-round fs14" to={`/`} >explore</NavLink>
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
                {scrollLoc < 30 &&  <SearchBar />}
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