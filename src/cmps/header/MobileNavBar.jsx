import { SearchMini } from "../svgs/SearchMini"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlane } from '@fortawesome/free-solid-svg-icons';
import { HeartSvg } from "../../assets/img/stay-details/HeartSvg";
export function MobileNavBar({ onChanegPage, isLogin }) {

    return <section className="mobile-main-nav main-container">
        <nav className="nav-bar wide high flex align-center space-between">
            <div onClick={() => onChanegPage('home')} className="home flex align-center column fh26">
                <FontAwesomeIcon className="home clr3" icon={faHome} />
                <h1>Home</h1>
            </div>
            <div onClick={() => onChanegPage('explore')} className="explore flex align-center column fh26">
                <SearchMini className="icon" />
                <h1>Explore</h1>
            </div>
            <div className="wish-list flex align-center column fh26">
                <HeartSvg className="icon heart" />
                <h1>Wish-list</h1>
            </div>
            <div onClick={() => onChanegPage('trip')} className="my-trips flex align-center column fh26">
                <FontAwesomeIcon className="icon user clr3" icon={faPlane} />
                <h1>My trips</h1>
            </div>
            <div onClick={() => onChanegPage('user')} className="user-menu flex align-center column fh26">
                <FontAwesomeIcon className="icon user clr3" icon={faUser} />
                <h1>{isLogin ? 'logout' : 'login'}</h1>
            </div>
        </nav>
    </section>

}