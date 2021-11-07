import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const _UserMsg = ({ msg, isHostPage }) => {
    const msgForDispaly =
        <div className={`user-msg ${msg?.type || ''} ${isHostPage ? 'host-msg' : ''}`}>
            <div className="user-info wide flex space-between align-center">
                <div className="icon-border">
                    <FontAwesomeIcon className="icon-order-sent fs20" icon={faCheck} />
                </div>
                <h3>{msg?.txt}</h3>
            </div>
        </div>
    return (
        <>
            {msg?.type === "new-order" && <Link to="/trip" >{msgForDispaly}</Link>}
            {msg?.type === 'error-login' && msgForDispaly}
        </>
    )
}

function mapStateToProps(state) {
    return {
        msg: state.userReducer.msg
    }
}


export const UserMsg = connect(mapStateToProps, {})(_UserMsg)


