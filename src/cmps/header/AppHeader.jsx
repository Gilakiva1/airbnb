import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { LogoSvg } from "../svgs/LogoSvg"
import imgUser from '../../assets/img/home-page/user.jpg'
import { SearchBar } from "./SearchBar";
import { MiniSearchBar } from './MiniSearchBar';
import { MenuBar } from './MenuBar'


class _AppHeader extends React.Component {

    state = {
        scrollLoc: 0,
        isEnter: false,
        isShowMenu: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onToggleHeader)
        window.addEventListener('click', this.onCloseMenu)
    }

    componentDidUpdate() {
        if (this.props.history.location.pathname !== '/') {
            window.removeEventListener('scroll', this.onToggleHeader)
        } else {
            window.addEventListener('scroll', this.onToggleHeader)
        }
    }

    onToggleHeader = (ev) => {
        const { pathname } = this.props.history.location
        const scrollLocaion = ev.path[1].pageYOffset
        if (scrollLocaion < 40 && pathname === '/') {
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
    onToggoleMenu = (ev) => {
        ev.stopPropagation()
        const { isShowMenu } = this.state
        this.setState({ isShowMenu: !isShowMenu })
    }
    onCloseMenu = () => {
        this.setState({ isShowMenu: false })

    }

    render() {
        const { scrollLoc, isEnter, isShowMenu } = this.state
        const { pathname } = this.props.history.location

        return (
            <header className={`${scrollLoc > 40 ? 'white' : ''} ${pathname === '/' ? 'fixed home main-container-home' : 'sticky-color main-container'} header-container`}>
                <div className="header-func flex">
                    <div className="logo-container flex align-center pointer" onClick={this.backToHome}>
                        <button className="btn-logo border-none"><LogoSvg className={`${(pathname === '/' && scrollLoc > 40) || pathname !== '/' ? 'logo-pink' : 'logo-white'} `} /></button>
                        <h3 className={`logo-txt ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-pink'}`}>Home Away</h3>
                    </div>
                    {scrollLoc > 40 && pathname === '/' && <MiniSearchBar />}
                    {pathname !== '/' && <MiniSearchBar />}
                    <nav className="nav-header">
                        <div className="nav-header flex align-center">
                            <NavLink className={`link-host border-round fs14 ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-black hover-bcg'}`} to={`/stay`} >Explore</NavLink>
                            <NavLink className={`link-host border-round fs14 ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-black hover-bcg'}`} to={`/ `} >Become a host</NavLink>
                            <div className="menu-container border-round">
                                <div className="menu-container">
                                    <button onClick={this.onToggoleMenu} className="menu-btn border-round flex align-center">
                                        <div className="menu-details flex align-center">
                                            <FontAwesomeIcon className="hamburger-menu" icon={faBars} />
                                            <img src={imgUser} alt="" className="user-img border-round" />
                                        </div>
                                    </button>

                                </div>
                            </div>
                        </div>
                        {isShowMenu && <MenuBar onCloseMenu={this.onCloseMenu} />}
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