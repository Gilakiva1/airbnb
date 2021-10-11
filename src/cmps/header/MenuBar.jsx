import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { withRouter } from 'react-router';
import { onClearNotification } from '../../store/user.action'

function _MenuBar({ onCloseMenu, onToggleLogin, onLogout, user, onClearNotification }) {

    const onNotificationsClick = () => {
        onClearNotification()
        onCloseMenu()
    }

    return (
        <div onClick={(ev) => { ev.stopPropagation() }} className="menu-dropdown white round-edge flex column ">
            {!user && <h1 onClick={onToggleLogin} className="link Log Out">Log In</h1>}
            {user && <h1 onClick={onLogout} className="link Log Out">Log Out</h1>}
            <Link onClick={onCloseMenu} to="/trip"><h1 className="link medium light txt-trip" >My trips</h1></Link>
            <Link onClick={() => onNotificationsClick()} to="/host"> <div className="flex space-between align-center">
                <h1 className="link Notifications">Notifications</h1>
                {user && user.notifications!==0 && <div className="menu-notification fs13 flex justify-center align-center">{user.notifications}</div>}
            </div></Link>
            <h1 onClick={onCloseMenu} className="link Messeges">Messeges</h1>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        state
    }

}

const mapDispatchToProps = {
    onClearNotification
}

export const MenuBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_MenuBar))