import { connect } from "react-redux"
import { Link } from "react-router-dom"

const _UserMsg = ({ msg }) => {
    console.log('msg',msg);
    const msgForDispaly = <div className={`user-msg ${msg?.type} pointer`}>
        <h3>{msg?.txt}</h3>
    </div>
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


