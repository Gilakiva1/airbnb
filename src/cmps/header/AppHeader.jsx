import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { LogoSvg } from "../svgs/LogoSvg"
import { SearchBar } from "./SearchBar";
import { MiniSearchBar } from './MiniSearchBar';
import { MenuBar } from './MenuBar'
import { LogIn } from '../LogIn';
import { userService } from '../../services/user.service';
import user1 from '../../assets/img/profiles/user1.png'
import { socketService } from '../../services/socket.service';
import { onSetMsg, onLogout } from '../../store/user.action'
import { MobileSearchBar } from './MobileSearchBar';
import { HamburgerMenu } from '../svgs/HamburgerMenu';
import { onAddNotification } from '../../store/user.action'
import { MobileNavBar } from '../../cmps/header/MobileNavBar'
import { onSetOrder } from '../../store/order.action';
import { utilService } from '../../services/util.service';

class _AppHeader extends React.Component {

    state = {
        scrollLoc: window.scrollY,
        isEnter: false,
        isShowMenu: false,
        isNewRoute: false,
        isLogin: false,
        closeSearchBarInputs: false,
        isClearSearchBar: false,
        isHosting: false,
        screenWidth: window.innerWidth
    }

    componentDidMount() {
        const { pathname } = this.props.history.location

        window.addEventListener('scroll', this.onToggleHeader)
        window.addEventListener('click', this.onCloseMenu)
        window.addEventListener('resize', this.onResizeScreen)
        socketService.setup()
        socketService.on('on-new-order', () => {
            this.props.onAddNotification('orders')
        })
        socketService.on('on-approved-trip', () => {
            this.props.onAddNotification('trips')
        })
        if (pathname === '/' && this.state.scrollLoc < 40) this.setState({ isEnter: true })
        if (pathname === '/trip') this.setState({ isEnter: false })
    }

    componentDidUpdate(prevProps) {
        const { pathname } = this.props.history.location
        if (prevProps.location.pathname !== pathname) {
            this.setState({ isEnter: false })
            if (pathname === '/') this.setState({ isEnter: true })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onToggleHeader)
        window.removeEventListener('click', this.onCloseMenu)
        window.removeEventListener('resize', this.onResizeScreen)
    }
    onResizeScreen = ({ target }) => {
        this.setState(prevState => ({ ...prevState, screenWidth: target.innerWidth }))
    }

    onToggleLogin = async () => {
        this.onCloseMenu()
        this.setState({ isLogin: !this.state.isLogin })
    }
    onLogout = async () => {
        this.onCloseMenu()
        this.props.onLogout()
    }

    onCloseLogin = () => {
        this.setState({ isLogin: false })
    }


    onToggleHeader = (ev) => {
        
        console.log('active');
        const { pathname } = this.props.history.location
        const scrollLoc = window.scrollY
        if (this.state.isShowMenu) this.onCloseMenu()
        if (scrollLoc < 40 && pathname === '/') {
            this.setState({ isEnter: true, scrollLoc })
        } else {
            this.setState({ isEnter: false, scrollLoc })
        }
    }

    backToHome = () => {
        if (this.props.history.location.pathname !== '/') {
            this.setState({ isClearSearchBar: true }, () => {
                this.props.history.push('/')
            })
        } else {
            document.documentElement.scrollTop = 0
        }
    }
    onChanegPage = (diff) => {
        switch (diff) {
            case 'home': this.backToHome()
                break;
            case 'explore': this.onExplore()
                break;
            case 'wish-list': this.onWishList()
                break;
            case 'trip': this.onTrip()
                break;
            case 'user': this.onProfile()
                break;
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

    toggleSearchBar = () => {
        let { scrollLoc } = this.state
        this.setState({ scrollLoc, isEnter: true })
    }

    setClearSearchBar = () => {
        this.setState({ isClearSearchBar: false })
    }
    onToggleUser = () => {
        this.setState({ isHosting: !this.state.isHosting })
    }
    hideHost = () => {
        this.setState({ isHosting: false })
    }

    checkForNotifications = () => {
        const { user } = this.props
        if (!user) return false
        if (!user.notifications.trips && !user.notifications.orders) return false
        return true
    }

    getNotificationSum = () => {
        const { notifications } = this.props.user
        return +notifications.orders + +notifications.trips
    }
    onSetCurrHeaderClass = () => {
        let className = 'header-container shadow white';
        const { pathname } = this.props.history.location;
        const { scrollLoc, isEnter } = this.state
        if (scrollLoc < 40 && pathname === '/') className += ' no-color'
        if (isEnter) className += ' header-height '
        if (pathname === '/host') className += ' relative padding'
        if (pathname === '/' || pathname === '/stay' || pathname === '/host' || pathname === '/trip') {
            className += ' fixed home main-container-home '
        } else {
            className += ' sticky-color main-container'
        }
        return className
    }
    onExplore = async () => {
        const order = utilService.makeEmptyOrder()
        const queryString = utilService.makeQueryParams(order)
        await this.props.onSetOrder(order)
        this.props.history.push(`/stay?${queryString}`)
    }
    onTrip = () => {
        this.props.history.push('/trip')
    }
    onProfile = () => {
        this.onToggleLogin()
    }
    handleUserLogin = () => {
        this.props.user ? this.onLogout() : this.onChanegPage('user')
    }

    render() {
        const { scrollLoc, isEnter, isShowMenu, isLogin, isClearSearchBar, isHosting, screenWidth } = this.state
        const { pathname } = this.props.history.location
        const { user } = this.props
        if (screenWidth > 500) {
            return (
                <header className={this.onSetCurrHeaderClass()}>
                    <div className={`${isEnter ? 'mrg-header' : ''} header-func flex`}>
                        <div className="logo-container flex align-center pointer" onClick={this.backToHome}>
                            <button className="btn-logo border-none"><LogoSvg className={`${(pathname === '/' && scrollLoc >= 40) || pathname !== '/' ? 'logo-pink' : 'logo-white'} `} /></button>
                            <h3 className={`logo-txt fs22 medium ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-pink'}`}>Home Away</h3>
                        </div>
                        <nav className="nav-header">
                            <div className="nav-header flex gap5 align-center">
                                <NavLink onClick={this.hideHost} className={`link-host border-round fs14 medium  ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-black hover-bcg'}`} to={`/stay`} >Explore</NavLink>
                                {pathname !== '/host' && <NavLink onClick={this.onToggleUser} className={`link-host border-round fs14 medium  ${pathname === '/' && scrollLoc < 40 ? 'txt-white' : 'txt-black hover-bcg'}`} to={isHosting ? '/' : '/host'} >Become a host</NavLink>}
                                <div className="menu-container border-round">
                                    <div className="menu-container">
                                        <button onClick={this.onToggoleMenu} className="menu-btn border-round flex align-center">
                                            {this.checkForNotifications() && <div className="notification flex justify-center align-center">{this.getNotificationSum()}</div>}
                                            <div className="menu-details flex align-center">
                                                <HamburgerMenu />
                                                <img src={this.getUserImg() || user1} alt="" className="user-img border-round" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {isShowMenu && <MenuBar onLogout={this.onLogout} user={user} isLogin={isLogin} onToggleLogin={this.onToggleLogin} onCloseMenu={this.onCloseMenu} />}
                            {isLogin && <LogIn onToggleLogin={this.onToggleLogin} onCloseLogin={this.onCloseLogin} />}
                        </nav>
                    </div>
                    {pathname !== '/host' && < MiniSearchBar toggleSearchBar={this.toggleSearchBar} animateClassName={isEnter ? '' : 'scale-up-top-mini-search-bar'} />}
                    <SearchBar isEnter={isEnter} setClearSearchBar={this.setClearSearchBar} isClearSearchBar={isClearSearchBar} closeSearchBarInputs={this.closeSearchBarInputs} toggleSearchBar={this.toggleSearchBar} animateClassName={isEnter ? 'scale-up-top-search-bar' : ''} />
                </header >
            )
        } else {
            return (
                <>
                    {pathname === '/' && <MobileSearchBar screenWidth={screenWidth} />}
                    <MobileNavBar onChanegPage={this.onChanegPage} user={user} handleUserLogin={this.handleUserLogin} />
                    {isLogin && <LogIn onToggleLogin={this.onToggleLogin} onCloseLogin={this.onCloseLogin} />}
                </>
            )
        }
    }

}



const mapStateToProps = ({ userReducer }) => {
    return {
        user: userReducer.loggedInUser
    }

}
const mapDispatchToProps = {

    onSetMsg,
    onLogout,
    onAddNotification,
    onSetOrder
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader))