import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { LogoSvg } from "../svgs/LogoSvg"
import { SearchBar } from "./SearchBar";
import { MiniSearchBar } from './MiniSearchBar';
import { MenuBar } from './MenuBar'
import { LogIn } from '../LogIn';
import { userService } from '../../services/user.service';
import user1 from '../../assets/img/profiles/user1.png'

class _AppHeader extends React.Component {

    state = {
        scrollLoc: 0,
        isEnter: false,
        isShowMenu: false,
        isLogIn: false,
        isMiniSearchClicked: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onToggleHeader)
        window.addEventListener('click', this.onCloseMenu)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onToggleHeader)
        window.removeEventListener('click', this.onCloseMenu)
    }


    componentDidUpdate() {
        // if (this.props.history.location.pathname !== '/') {
        //     window.removeEventListener('scroll', this.onToggleHeader)
        // } else {
        //     window.addEventListener('scroll', this.onToggleHeader)
        // }
    }

    toggleLogIn = () => {
        this.onCloseMenu()
        let { isLogIn } = this.state
        this.setState({ isLogIn: !isLogIn })
    }

    onToggleHeader = (ev) => {
        const { pathname } = this.props.history.location
        const scrollLocaion = ev.path[1].pageYOffset

        if (scrollLocaion < 40 && pathname === '/') {
            this.setState({ isEnter: true })
        }
        this.setState({ scrollLoc: scrollLocaion, isMiniSearchClicked: false })
    }

    backToHome = () => {
        if (this.props.history.location.pathname !== '/') {
            this.props.history.push('/')
            this.setState({ isMiniSearchClicked: false })
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

    getUserImg = () => {
        const user = userService.getLoggedinUser()
        if (user) {
            return user.imgUrl
        } else return null
    }

    toggleSearchBar = (action) => {
        let { scrollLoc } = this.state
        scrollLoc = 39
        if (action === 'on') {
            this.setState({ isMiniSearchClicked: true, scrollLoc })
        }
        else this.setState({ isMiniSearchClicked: false })
    }

    toggleSearchBarHome = () => {
        let { scrollLoc } = this.state
        scrollLoc = 39
        this.setState({ scrollLoc })
    }

    render() {
        const { scrollLoc, isEnter, isShowMenu, isLogIn, isMiniSearchClicked } = this.state
        const { pathname } = this.props.history.location

        return (
            <header className={`${scrollLoc > 40 ? 'white' : ''} ${pathname === '/' || pathname == '/stay' || pathname === '/host' ? 'fixed home main-container-home' : 'sticky-color main-container'} header-container`}>
                <div className="header-func flex">
                    <div className="logo-container flex align-center pointer" onClick={this.backToHome}>
                        <button className="btn-logo border-none"><LogoSvg className={`${(pathname === '/' && scrollLoc > 40) || pathname !== '/' ? 'logo-pink' : 'logo-white'} `} /></button>
                        <h3 className={`logo-txt ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-pink'}`}>Home Away</h3>
                    </div>
                    {scrollLoc > 40 && pathname === '/' && <MiniSearchBar toggleSearchBar={this.toggleSearchBarHome} />}
                    {pathname !== '/' && !isMiniSearchClicked && <MiniSearchBar toggleSearchBar={this.toggleSearchBar} />}
                    <nav className="nav-header">
                        <div className="nav-header flex align-center">
                            <NavLink className={`link-host border-round fs14 medium  ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-black hover-bcg'}`} to={`/stay`} >Explore</NavLink>
                            <NavLink className={`link-host border-round fs14 medium  ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-black hover-bcg'}`} to={`/ `} >Become a host</NavLink>
                            <div className="menu-container border-round">
                                <div className="menu-container">
                                    <button onClick={this.onToggoleMenu} className="menu-btn border-round flex align-center">
                                        <div className="menu-details flex align-center">
                                            <FontAwesomeIcon className="hamburger-menu" icon={faBars} />
                                            <img src={this.getUserImg() || user1} alt="" className="user-img border-round" />
                                        </div>
                                    </button>

                                </div>
                            </div>
                        </div>
                        {isShowMenu && <MenuBar toggleLogIn={this.toggleLogIn} onCloseMenu={this.onCloseMenu} />}
                        {isLogIn && <LogIn toggleLogIn={this.toggleLogIn} />}
                    </nav>
                </div>
                {scrollLoc < 40 && pathname === '/' && <SearchBar toggleSearchBar={this.toggleSearchBar} animateClassName={isEnter ? 'scale-up-top' : ''} />}
                {pathname !== '/' && isMiniSearchClicked && <SearchBar toggleSearchBar={this.toggleSearchBar} animateClassName={isEnter ? 'scale-up-top' : ''} />}
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