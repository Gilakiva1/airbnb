import { Link } from "react-router-dom"
export function MenuBar({ onCloseMenu, toggleLogIn }) {

    return (
        <div onClick={(ev) => { ev.stopPropagation() }} className="menu-dropdown white round-edge flex column ">
            <h1 onClick={toggleLogIn} className="link Log Out">Log In</h1>
            <Link onClick={onCloseMenu} to="/trip"><h1 className="link medium light txt-trip" >My trips</h1></Link>
            <h1 onClick={onCloseMenu} className="link Notifcations">Notifcations</h1>
            <h1 onClick={onCloseMenu} className="link Messeges">Messeges</h1>
        </div>
    )

}