import { connect } from "react-redux"
import { Link } from "react-router-dom"

const _UserMsg = ({ msg }) => {
    const msgForDispaly = <div className={`user-msg ${msg?.type}`}>
        <h3>{msg?.txt}</h3>
    </div>
    if (!msg) return null
    return (
        msg && msg.type === 'new-order' ? <Link to="/host">{msgForDispaly}</Link> : msgForDispaly
    )
}

function mapStateToProps(state) {
    return {
        msg: state.userReducer.msg
    }
}


export const UserMsg = connect(mapStateToProps, {})(_UserMsg)


