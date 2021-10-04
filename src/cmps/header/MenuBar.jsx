import { Link } from "react-router-dom"
export function MenuBar() {

    return (
        <div onClick={(ev) => { ev.stopPropagation() }} className="menu-dropdown white round-edge flex column ">
            <Link to="/trip"><h1 className="link medium light txt-trip" >My trips</h1></Link>
            <h1 className="link Notifcations">Notifcations</h1>
            <h1 className="link Messeges">Messeges</h1>
            <h1 className="link Log Out">Log In</h1>
        </div>
    )

}