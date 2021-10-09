import { Link } from "react-router-dom"
export function MenuBar({ onCloseMenu, onToggleLogin, onLogout, user }) {

    console.log(user);
    return (
        <div onClick={(ev) => { ev.stopPropagation() }} className="menu-dropdown white round-edge flex column ">
            {!user && <h1 onClick={onToggleLogin} className="link Log Out">Log In</h1>}
            {user && <h1 onClick={onLogout} className="link Log Out">Log Out</h1>}
            <Link onClick={onCloseMenu} to="/trip"><h1 className="link medium light txt-trip" >My trips</h1></Link>
            <h1 onClick={onCloseMenu} className="link Notifcations">Notifcations</h1>
            <h1 onClick={onCloseMenu} className="link Messeges">Messeges</h1>
        </div>
    )

}