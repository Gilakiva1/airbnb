import { Link } from "react-router-dom"
export function MenuBar() {

    return (
        <div className="menu-dropdown white round-edge flex column ">
            <Link to="/trip"><h1 >My trips</h1></Link>
            <h1 >Notifcations</h1> 
            <h1 >Messeges</h1>
            <h1 >Log Out</h1>
        </div>
    )

}